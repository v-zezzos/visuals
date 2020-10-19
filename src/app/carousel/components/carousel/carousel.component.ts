import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Carousel } from '../../models/carousel';
import { CarouselMoveEvent } from '../../models/carousel-move-event';
import { asap } from '../../utils/asap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() pagination: boolean = true;
  @Input() paginationInside: boolean = true;
  @Input() navigation: boolean = true;
  @Input() navigationInside: boolean = true;
  @Input() animate: boolean = true;
  @Input() autoPlay: boolean = false;
  @Input() autoPlayDuration: number = 5000;
  @Input() autoPlayDirection: 'previous' | 'next' = 'next';

  private _loop: boolean = true;
  @Input()
    set loop(loop: boolean) {
      this._loop = loop;
      this.resetAllStates();
    }
    get loop(): boolean {
      return this._loop;
    }

  private _items: any[] = [];
  @Input()
    set items(items: any[]) {
      this._items = items || [];
      this.resetAllStates();
    }
    get items(): any[] {
      return this._items;
    }

  private _first: number;
  @Input()
    set first(first: number) {
      this._first = first;
      this.resetAllStates();
    }
    get first(): number {
      return this._first;
    }


  @Input() itemTpl: TemplateRef<any>;
  @Input() paginatorTpl: TemplateRef<any>;
  @Input() leftNavigatorTpl: TemplateRef<any>;
  @Input() rightNavigatorTpl: TemplateRef<any>;

  @Input() transition: { delay?: string, duration?: string, timingFunction?: string };

  @Output() ref: EventEmitter<Carousel> = new EventEmitter();
  @Output() nextEvent: EventEmitter<CarouselMoveEvent> = new EventEmitter();
  @Output() previousEvent: EventEmitter<CarouselMoveEvent> = new EventEmitter();
  @Output() gotoEvent: EventEmitter<CarouselMoveEvent> = new EventEmitter();
  @Output() playEvent: EventEmitter<{}> = new EventEmitter();
  @Output() stopEvent: EventEmitter<{}> = new EventEmitter();
  @Output() restartEvent: EventEmitter<{}> = new EventEmitter();

  @ViewChild('carouselOuterScene') carouselOuterSceneRef: ElementRef<HTMLDivElement>;
  @ViewChild('carouselScene') carouselSceneRef: ElementRef<HTMLDivElement>;

  loopLength: number = 0;
  loopItems: any[] = [];

  length: number = 0;
  activeIndex: number = 0;
  activeItem: any;

  canNext: boolean = false;
  canPrevious: boolean = false;

  private carouselIsLooping: boolean = false;
  private autoPlaySubscription: Subscription;

  private itemWidth: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.computeInitialState();
  }

  ngAfterViewInit() {
    asap(() => {
      this.computeSizes();
      if (this.length > 0) {
        this.computeStateForIndex(this.activeIndex, false);
      }
      this.setupAutoPlay();
      this.ref.emit(this);
    });
  }

  ngOnDestroy() {
    this.stop();
  }

  private resetAllStates() {
    this.stop();
    this.computeInitialState();
    if (this.length > 0 && this.carouselSceneRef) {
      this.computeSizes();
      this.computeStateForIndex(this.activeIndex, false);
    }
  }

  private computeInitialState() {
    this.length = this.items.length;
    this.activeIndex = this.first !== undefined ? this.first % this.length : 0;
    this.setupLoop();
    this.setupAutoPlay();
    this.transition = {
      delay: '0s',
      duration: '400ms',
      timingFunction: 'ease-in-out',
      ...(this.transition || {})
    };
  }

  private computeSizes() {
    const rect = this.carouselOuterSceneRef.nativeElement.getBoundingClientRect();
    this.carouselSceneRef.nativeElement.style.width = `${rect.width * this.loopLength}px`;
    this.itemWidth = rect.width;
  }

  private getTransitionDuration(transitionDurationProp: string) {
    const unit: 'ms' | 's' = transitionDurationProp.includes('ms') ? 'ms' : 's';
    const duration = parseInt(transitionDurationProp.replace(unit, ''), 10);
    return { duration, unit };
  }
  private setTransitionDuration(duration: number | string, unit: 'ms' | 's' = 'ms') {
    this.carouselSceneRef.nativeElement.style.transitionDuration = typeof(duration) === 'string' ? duration : `${duration}${unit}`;
  }

  private setLeft(left: number, unit: 'px' | '%' = 'px') {
    this.carouselSceneRef.nativeElement.style.left = `${left}${unit}`;
  }

  private resetLoopingPosition(left: number) {
    this.setTransitionDuration(0);
    this.setLeft(left);
    this.carouselIsLooping = false;
  }

  private looping(looping: 'previous' | 'next', left: number, animate: boolean = this.animate) {
    const { duration, unit } = this.getTransitionDuration(this.transition.duration);
    this.carouselIsLooping = true;
    this.setTransitionDuration(animate ? this.transition.duration : 0);
    this.setLeft(left);
    setTimeout(
      () => this.resetLoopingPosition((looping === 'previous' ? this.length : 1) * -this.itemWidth),
      duration * (unit === 'ms' ? 1 : 1000)
    );
  }

  private computeStateForIndex(idx: number, animate: boolean = this.animate, looping: 'previous' | 'next' | 'none' = 'none') {
    const currentLeft = this.activeIndex * -this.itemWidth + (this.loop ? -this.itemWidth : 0);
    if (looping === 'none') {
      const deltaIndex = this.activeIndex - idx;
      const { duration, unit } = this.getTransitionDuration(this.transition.duration);
      this.setTransitionDuration(animate ? ((Math.abs(deltaIndex) * duration) || duration) : 0, unit);
      this.setLeft(currentLeft + deltaIndex * this.itemWidth);
    } else {
      this.looping(looping, currentLeft + (looping === 'previous' ? 1 : -1) * this.itemWidth, animate);
    }
    this.activeIndex = idx;
    this.activeItem = this.items[this.activeIndex];
    this.canNext = this.activeIndex < (this.length - 1) || (this.loop && this.length > 0);
    this.canPrevious = this.activeIndex > 0 || (this.loop && this.length > 0);
  }

  private setupAutoPlay() {
    if (this.autoPlay) {
      this.play();
    }
  }
  private setupLoop() {
    if (this.loop && this.length > 0) {
      this.loopItems = [this.items[this.length - 1], ...this.items, this.items[0]];
    } else {
      this.loopItems = [...this.items];
    }
    this.loopLength = this.loopItems.length;
  }

  @HostListener('window:resize', ['$event'])
  private resizeEvent() {
    if (this.length > 0) {
      this.computeSizes();
      this.computeStateForIndex(this.activeIndex, false);
    }
  }

  track(evt: any) {
    if (this.carouselIsLooping) {
      return ;
    }
    if (evt.isFinal) {
      if ((evt.additionalEvent && evt.additionalEvent === 'panleft') || !evt.additionalEvent && evt.deltaX < 0) {
        this.next();
      } else {
        this.previous();
      }
      return ;
    }
    if (!this.loop) {
      if (this.activeIndex === 0 && evt.deltaX > 0) {
        this.setTransitionDuration(0);
        this.setLeft(0);
        return ;
      } else if (this.activeIndex === (this.length - 1) && evt.deltaX < 0) {
        this.setTransitionDuration(0);
        this.setLeft((this.length - 1) * -this.itemWidth);
        return ;
      }
    }
    if (this.autoPlay) {
      this.restart();
    }
    const currentLeft = this.activeIndex * -this.itemWidth + (this.loop ? -this.itemWidth : 0);
    this.setTransitionDuration(0);
    this.setLeft(currentLeft + evt.deltaX);
  }

  computeLoopIdx(idx: number) {
    if (!this.loop) {
      return idx;
    }
    if (idx === 0) {
      return this.length - 1;
    } else if (idx === this.length + 1) {
      return 0;
    }
    return idx - 1;
  }

  play(animate: boolean = this.animate, shouldEmit: boolean = true) {
    if (this.autoPlaySubscription) {
      this.stop();
    }
    this.autoPlaySubscription = interval(this.autoPlayDuration || 5000).subscribe(() => {
      if (!this.loop) {
        if (this.autoPlayDirection === 'next' && this.activeIndex === (this.length - 1)) {
          this.autoPlayDirection = 'previous';
        } else if (this.autoPlayDirection === 'previous' && this.activeIndex === 0) {
          this.autoPlayDirection = 'next';
        }
      }
      this[this.autoPlayDirection](animate, false);
    });
    if (shouldEmit) {
      this.playEvent.emit({});
    }
  }

  stop(shouldEmit: boolean = true) {
    if (this.autoPlaySubscription) {
      this.autoPlaySubscription.unsubscribe();
    }
    if (shouldEmit) {
      this.stopEvent.emit({});
    }
  }

  restart(animate: boolean = this.animate, shouldEmit: boolean = true) {
    this.stop();
    this.play(animate);
    if (shouldEmit) {
      this.restartEvent.emit({});
    }
  }

  getTemplateContext(context: any = {}) {
    const fullContext = {
      items: this.items,
      ref: this,
      activeIndex: this.activeIndex,
      activeItem: this.activeItem,
      canPrevious: this.canPrevious,
      canNext: this.canNext,
      ...context,
      context: null,
    };
    fullContext.context = fullContext;
    return fullContext;
  }

  goto(idx: number, animate: boolean = this.animate, resetAutoPlay: boolean = true, shouldEmit: boolean = true) {
    if (this.carouselIsLooping || idx === this.activeIndex || (!this.loop && (idx < 0 || idx > (this.length - 1)))) {
      return ;
    }
    let looping: 'none' | 'previous' | 'next' = 'none';
    if (this.loop && (idx < 0)) {
      idx = this.length - 1;
      looping = 'previous';
    } else if (this.loop && (idx > (this.length - 1))) {
      idx = 0;
      looping = 'next';
    }
    if (resetAutoPlay && this.autoPlay) {
      this.restart();
    }
    const fromIndex = this.activeIndex;
    this.computeStateForIndex(idx, animate, looping);
    if (shouldEmit) {
      this.gotoEvent.emit({ animate, resetAutoPlay, fromIndex, toIndex: idx });
    }
  }

  next(animate: boolean = this.animate, resetAutoPlay: boolean = true, shouldEmit: boolean = true) {
    const fromIndex = this.activeIndex;
    this.goto(this.activeIndex + 1, animate, resetAutoPlay, false);
    const toIndex = this.activeIndex;
    if (shouldEmit) {
      this.nextEvent.emit({ animate, resetAutoPlay, fromIndex, toIndex });
      this.gotoEvent.emit({ animate, resetAutoPlay, fromIndex, toIndex });
    }
  }

  previous(animate: boolean = this.animate, resetAutoPlay: boolean = true, shouldEmit: boolean = true) {
    const fromIndex = this.activeIndex;
    this.goto(this.activeIndex - 1, animate, resetAutoPlay, false);
    const toIndex = this.activeIndex;
    if (shouldEmit) {
      this.previousEvent.emit({ animate, resetAutoPlay, fromIndex, toIndex });
      this.gotoEvent.emit({ animate, resetAutoPlay, fromIndex, toIndex });
    }
  }

}
