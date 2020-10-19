# app-carousel

## Inputs

### Required

- `items: any[]` An array of data
- `itemTpl: TemplateRef<any>` A template reference capable of displaying one element of the `items` array

### Optional

- `first: number = 0` The index of the first item to show
- `loop: boolean = true` Indicate if the carousel can have a loop behavior
- `autoPlay: boolean = false` Indicate if the carousel can have an auto play behavior
- `pagination: boolean = true` Indicate if the carousel should use a pagination template
- `paginationInside: boolean = true` Indicate if the pagination template covers the carousel area
- `navigation: boolean = true` Indicate if the carousel should use navigation templates
- `navigationInside: boolean = true` Indicate if the navigation templates covers the carousel area
- `animate: boolean = true` Indicate if the carousel is animated
- `autoPlayDuration: number = 5000` (ms) Time between two step of the autoPlay animation
- `autoPlayDirection: 'previous' | 'next' = 'next'` Direction of the autoplay animation
- `paginatorTpl: TemplateRef<any>` A template reference capable of displaying the paginator
- `leftNavigatorTpl: TemplateRef<any>` A template reference capable of displaying the navigator
- `rightNavigatorTpl: TemplateRef<any>` A template reference capable of displaying the navigator
- `transition: { delay?: string, duration?: string, timingFunction?: string }` CSS details of the animation

## Output
