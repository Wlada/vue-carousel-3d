# API 参考

<div class="version-strip">Vue 2 版本线 · 软件包 v1.x</div>

Vue 2 版本线暴露的轮播组件表面与 Vue 3 版本线保持一致：`<carousel-3d>`、`<slide>`、导航方法与已记录在案的事件。

## 轮播组件属性

| 属性 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `ariaLabel` | `String` | `3D carousel` | 轮播组件区域的可访问名称。 |
| `autoplay` | `Boolean` | `false` | 自动前进幻灯片。 |
| `autoplayTimeout` | `Number` | `2000` | 自动播放步骤之间的延迟（毫秒）。 |
| `autoplayHoverPause` | `Boolean` | `true` | 悬停时暂停自动播放。 |
| `count` | `Number \| String` | `0` | 通知动态幻灯片数量的变化。 |
| `perspective` | `Number \| String` | `35` | 侧边卡片旋转角度（度）。 |
| `display` | `Number \| String` | `5` | 最大可见幻灯片数量。 |
| `bias` | `String` | `left` | 当 `display` 为偶数时，较大的那一侧。 |
| `loop` | `Boolean` | `true` | 在第一张与最后一张幻灯片处循环。 |
| `animationSpeed` | `Number \| String` | `500` | 过渡时长（毫秒）。 |
| `dir` | `String` | `rtl` | 导航方向（`rtl` 或 `ltr`）。 |
| `width` | `Number \| String` | `360` | 主幻灯片宽度。 |
| `height` | `Number \| String` | `270` | 主幻灯片高度。 |
| `border` | `Number \| String` | `1` | 幻灯片边框宽度。 |
| `space` | `Number \| String` | `auto` | 幻灯片之间的水平间距。 |
| `startIndex` | `Number \| String` | `0` | 初始从零开始的索引。 |
| `clickable` | `Boolean` | `true` | 点击侧边幻灯片进行导航。 |
| `disable3d` | `Boolean` | `false` | 禁用透视变换。 |
| `minSwipeDistance` | `Number` | `10` | 滑动阈值（像素）。 |
| `inverseScaling` | `Number \| String` | `300` | 卡片之间的纵深差异。 |
| `controlsVisible` | `Boolean` | `false` | 显示上一个与下一个控件。 |
| `controlsPrevHtml` | `String` | `&lsaquo;` | 上一个控件的标记。 |
| `controlsNextHtml` | `String` | `&rsaquo;` | 下一个控件的标记。 |
| `controlsWidth` | `Number \| String` | `50` | 控件命中区域宽度。 |
| `controlsHeight` | `Number \| String` | `50` | 控件命中区域高度。 |
| `oneDirectional` | `Boolean` | `false` | 约束侧边幻灯片计算。 |

## 幻灯片属性

| 属性 | 类型 | 必填 | 用途 |
| --- | --- | --- | --- |
| `index` | `Number` | 是 | 稳定的、从零开始的幻灯片位置。 |

## 事件

| 事件 | 载荷 | 时机 |
| --- | --- | --- |
| `before-slide-change` | 当前索引 | 导航开始时触发。 |
| `after-slide-change` | 当前索引 | 过渡完成后触发。 |
| `last-slide` | 最后索引 | 到达最后一张幻灯片时触发。 |

## 公共方法

| 方法 | 行为 |
| --- | --- |
| `goNext()` | 在导航可行时前进。 |
| `goPrev()` | 在导航可行时后退。 |
| `goSlide(index)` | 直接导航到从零开始的索引。 |
| `goFar(index)` | 逐步动画经过中间幻灯片。 |

如需完整的源码时代参考，请查看 GitHub 上的 `1.x` 软件包及其变更日志。
