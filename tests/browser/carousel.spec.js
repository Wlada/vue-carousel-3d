import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Default' })).toBeVisible()
  expect(errors).toEqual([])
})

test('supports controls and keyboard navigation', async ({ page }) => {
  const carousels = page.getByRole('region', { name: '3D carousel' })
  const defaultCarousel = carousels.first()
  const controlledCarousel = carousels.nth(7)

  await defaultCarousel.focus()
  await defaultCarousel.press('ArrowRight')
  await expect(defaultCarousel.getByRole('group', { name: '2 of 10' })).toBeVisible()

  await controlledCarousel.getByRole('button', { name: 'Next slide' }).click()
  await expect(controlledCarousel.getByRole('group', { name: '2 of 10' })).toBeVisible()
})

test('loads local placeholder images', async ({ page }) => {
  const imageCarousel = page.getByRole('region', { name: '3D carousel' }).nth(1)
  const images = imageCarousel.locator('img')

  await expect(images).toHaveCount(10)
  await expect.poll(() => images.evaluateAll((nodes) => nodes.every((image) => image.complete && image.naturalWidth > 0))).toBe(true)
})

test('keeps the slider inside its container on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  const carousel = page.getByRole('region', { name: '3D carousel' }).first()
  const dimensions = await carousel.evaluate((element) => ({
    container: element.getBoundingClientRect().width,
    slider: element.querySelector('.carousel-3d-slider').getBoundingClientRect().width
  }))

  expect(dimensions.slider).toBeLessThanOrEqual(dimensions.container)
})
