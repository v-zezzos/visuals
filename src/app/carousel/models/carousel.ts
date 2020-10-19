export interface Carousel {
    pagination: boolean;
    paginationInside: boolean;
    navigation: boolean;
    navigationInside: boolean;
    animate: boolean;
    autoPlay: boolean;
    autoPlayDuration: number;
    length: number;
    first: number;
    items: any[];
    activeIndex: number;
    activeItem: any;
    canNext: boolean;
    canPrevious: boolean;
    autoPlayDirection: 'previous' | 'next';
    goto(idx: number, animate?: boolean, resetAutoPlay?: boolean, shouldEmit?: boolean): void;
    next(animate?: boolean, resetAutoPlay?: boolean, shouldEmit?: boolean): void;
    previous(animate?: boolean, resetAutoPlay?: boolean, shouldEmit?: boolean): void;
    play(animate?: boolean, shouldEmit?: boolean): void;
    stop(shouldEmit?: boolean): void;
    restart(animate?: boolean, shouldEmit?: boolean): void;
}
