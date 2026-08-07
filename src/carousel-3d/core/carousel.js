export function getVisibleSlideCount (display, total) {
  return display > total ? total : display
}

export function getSideIndices ({ currentIndex, total, visible, bias, dir, side }) {
  let count = (visible - 1) / 2
  const isLeft = side === 'left'
  const prefersExtraSlide = bias.toLowerCase() === side

  count = prefersExtraSlide ? Math.ceil(count) : Math.floor(count)

  const indices = []
  for (let position = 1; position <= count; position++) {
    const movesForward = (isLeft && dir === 'ltr') || (!isLeft && dir !== 'ltr')
    indices.push(movesForward
      ? (currentIndex + position) % total
      : (currentIndex - position) % total)
  }

  return indices
}

export function getOutIndex ({ currentIndex, total, visible, bias, dir, side }) {
  const isLeft = side === 'left'
  let offset = (visible - 1) / 2
  const prefersExtraSlide = bias.toLowerCase() === side

  offset = (prefersExtraSlide ? Math.ceil(offset) : Math.floor(offset)) + 1

  if ((isLeft && dir === 'ltr') || (!isLeft && dir !== 'ltr')) {
    return (total - currentIndex - offset) <= 0
      ? -parseInt(total - currentIndex - offset, 10)
      : currentIndex + offset
  }

  return currentIndex - offset
}

export function getSafeIndex (index, total) {
  const targetIndex = parseInt(index, 10)

  return !Number.isFinite(targetIndex) || targetIndex < 0 || targetIndex >= total
    ? 0
    : targetIndex
}

export function getStartIndex (index, total) {
  if (total === 0) return 0

  const startIndex = Math.max(0, parseInt(index, 10) || 0)
  return startIndex > total - 1 ? total - 1 : startIndex
}
