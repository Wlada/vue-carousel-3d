import {
  getOutIndex,
  getSafeIndex,
  getSideIndices,
  getStartIndex,
  getVisibleSlideCount
} from '@/carousel-3d/core/carousel.js'

describe('carousel core', () => {
  it('keeps the visible slide count within the total', () => {
    expect(getVisibleSlideCount(5, 7)).toBe(5)
    expect(getVisibleSlideCount(5, 3)).toBe(3)
  })

  it('keeps the existing RTL and bias index ordering', () => {
    const state = {
      currentIndex: 0,
      total: 7,
      visible: 5,
      bias: 'left',
      dir: 'rtl'
    }

    expect(getSideIndices({ ...state, side: 'left' })).toEqual([-1, -2])
    expect(getSideIndices({ ...state, side: 'right' })).toEqual([1, 2])
    expect(getOutIndex({ ...state, side: 'left' })).toBe(-3)
    expect(getOutIndex({ ...state, side: 'right' })).toBe(3)
  })

  it('keeps the existing LTR and bias index ordering', () => {
    const state = {
      currentIndex: 5,
      total: 7,
      visible: 4,
      bias: 'right',
      dir: 'ltr'
    }

    expect(getSideIndices({ ...state, side: 'left' })).toEqual([6])
    expect(getSideIndices({ ...state, side: 'right' })).toEqual([4, 3])
    expect(getOutIndex({ ...state, side: 'left' })).toBe(-0)
    expect(getOutIndex({ ...state, side: 'right' })).toBe(2)
  })

  it('keeps public navigation indices safe', () => {
    expect(getSafeIndex('2', 3)).toBe(2)
    expect(getSafeIndex('none', 3)).toBe(0)
    expect(getSafeIndex(4, 3)).toBe(0)
    expect(getStartIndex(8, 3)).toBe(2)
    expect(getStartIndex(-1, 3)).toBe(0)
  })
})
