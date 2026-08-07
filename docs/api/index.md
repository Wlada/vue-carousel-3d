# API reference

<div class="api-table">

## Carousel props

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `ariaLabel` | `String` | `3D carousel` | Accessible name for the carousel region. |
| `autoplay` | `Boolean` | `false` | Advance slides automatically. |
| `autoplayTimeout` | `Number` | `2000` | Delay between autoplay steps in ms. |
| `autoplayHoverPause` | `Boolean` | `true` | Pause autoplay while hovered. |
| `count` | `Number \| String` | `0` | Signals dynamic slide-count changes. |
| `perspective` | `Number \| String` | `35` | Side-card rotation in degrees. |
| `display` | `Number \| String` | `5` | Maximum visible slide count. |
| `bias` | `String` | `left` | Larger side when `display` is even. |
| `loop` | `Boolean` | `true` | Wrap at the first and last slide. |
| `animationSpeed` | `Number \| String` | `500` | Transition duration in ms. |
| `dir` | `String` | `rtl` | Navigation direction (`rtl` or `ltr`). |
| `width` | `Number \| String` | `360` | Main slide width. |
| `height` | `Number \| String` | `270` | Main slide height. |
| `border` | `Number \| String` | `1` | Slide border width. |
| `space` | `Number \| String` | `auto` | Horizontal distance between slides. |
| `startIndex` | `Number \| String` | `0` | Initial zero-based index. |
| `clickable` | `Boolean` | `true` | Navigate by clicking side slides. |
| `disable3d` | `Boolean` | `false` | Disable perspective transforms. |
| `minSwipeDistance` | `Number` | `10` | Swipe threshold in pixels. |
| `inverseScaling` | `Number \| String` | `300` | Depth difference between cards. |
| `controlsVisible` | `Boolean` | `false` | Show previous and next controls. |
| `controlsPrevHtml` | `String` | `&lsaquo;` | Previous-control markup. |
| `controlsNextHtml` | `String` | `&rsaquo;` | Next-control markup. |
| `controlsWidth` | `Number \| String` | `50` | Control hit-area width. |
| `controlsHeight` | `Number \| String` | `50` | Control hit-area height. |
| `dots` | `Boolean` | `false` | Show navigation dots. |
| `dotsPosition` | `String` | `bottom` | Dots position (`bottom` or `top`). |
| `horizonOffset` | `Number \| String` | `0` | Vertical arch applied to side slides. |
| `lazy` | `Boolean` | `false` | Render slide content only near the current slide. |
| `beforeSlideChange` | `Function` | — | Called with `(index, fromIndex)`; return `false` to cancel navigation. |
| `oneDirectional` | `Boolean` | `false` | Constrain side-slide calculation. |

## Slide props

| Prop | Type | Required | Purpose |
| --- | --- | --- | --- |
| `index` | `Number` | Yes | Stable, zero-based slide position. |

## Events

| Event | Payload | Timing |
| --- | --- | --- |
| `before-slide-change` | Current index | Immediately after navigation starts. |
| `after-slide-change` | Current index | After `animationSpeed` elapses. |
| `last-slide` | Last index | When navigation reaches the last slide. |

## Control slots

| Slot | Scope | Purpose |
| --- | --- | --- |
| `prev` | `{ goPrev, disabled }` | Custom previous-control content inside the native button. |
| `next` | `{ goNext, disabled }` | Custom next-control content inside the native button. |

## Public methods

| Method | Argument | Behavior |
| --- | --- | --- |
| `goNext()` | — | Advance when navigation is possible. |
| `goPrev()` | — | Move backward when navigation is possible. |
| `goSlide(index)` | zero-based index | Navigate directly; invalid values normalize to zero. |
| `goFar(index)` | zero-based index | Animate through intermediate slides. |

</div>
