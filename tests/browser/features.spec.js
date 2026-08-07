import { expect, test } from '@playwright/test'

function collectErrors (page) {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  return errors
}

function demoBox (page, heading) {
  return page.locator('.box', { has: page.getByRole('heading', { name: heading }) })
}

test('navigation dots render and navigate the carousel', async ({ page }) => {
  const errors = collectErrors(page)
  await page.goto('/')

  const box = demoBox(page, 'Navigation dots')
  const dots = box.locator('.carousel-3d-dot')
  await expect(dots).toHaveCount(10)
  await expect(dots.nth(0)).toHaveAttribute('aria-current', 'true')

  await dots.nth(4).click()
  await expect(box.getByRole('group', { name: '5 of 10' })).toBeVisible()
  await expect(dots.nth(4)).toHaveAttribute('aria-current', 'true')

  expect(errors).toEqual([])
})

test('custom control slots render inside the buttons and navigate', async ({ page }) => {
  const errors = collectErrors(page)
  await page.goto('/')

  const box = demoBox(page, 'Custom control slots')
  const next = box.getByRole('button', { name: 'Next slide' })
  await expect(next.locator('span').first()).toHaveText('→')

  await next.click()
  await expect(box.getByRole('group', { name: '2 of 10' })).toBeVisible()

  expect(errors).toEqual([])
})

test('lazy carousel renders only slide content near the current slide', async ({ page }) => {
  const errors = collectErrors(page)
  await page.goto('/')

  const box = demoBox(page, 'Lazy slide content')
  const carousel = box.locator('.carousel-3d-container')
  await expect(carousel.locator('.carousel-3d-slide')).toHaveCount(20)
  await expect(carousel.locator('.carousel-3d-slide img')).toHaveCount(9)

  const next = box.getByRole('button', { name: 'Next slide' })
  for (let i = 0; i < 10; i += 1) {
    await next.click()
  }

  await expect(carousel.locator('.carousel-3d-slide').nth(0).locator('img')).toHaveCount(0)
  await expect(carousel.locator('.carousel-3d-slide').nth(6).locator('img')).toHaveCount(1)
  await expect(carousel.locator('.carousel-3d-slide').nth(19).locator('img')).toHaveCount(0)

  expect(errors).toEqual([])
})
