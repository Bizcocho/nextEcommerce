import { test, expect } from '@playwright/test';

test('filters by shoes correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('listitem', { name: 'Shoes' }).click();

  await page.waitForSelector('[data-testid="product-list"]');

  const items = await page.locator('[data-testid="product"]').allTextContents();

  expect(items).toHaveLength(16);
  expect(items[0]).toMatch("ItStyle Savvy$450.29");
  expect(items[5]).toMatch("BitchipFlying Dutchman$501.99");
  expect(items[15]).toMatch("GembucketStyle Savvy$915.87");
});

test('product gets added to cart', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.waitForSelector('[data-testid="product-list"]');

  const item = page.locator('[data-testid="product"]').first();

  item.click();

  const productText = await item.textContent();

  await page.getByTestId("add-to-cart").click();

  await page.getByTestId("close-product-details").click();

  const cartItemsTotal = await page.getByTestId("total-cart-products").textContent();

  expect(cartItemsTotal).toBe("1");

  await page.getByTestId("cart").click();

  await page.waitForSelector('[data-testid="cart-product-list"]');

  const productsInCart = await page.getByTestId("cart-product").allTextContents();

  expect(productsInCart.length).toBe(1);

  const brand = await page.getByTestId("cart-product-brand").textContent();
  const name = await page.getByTestId("cart-product-name").textContent();
  const price = await page.getByTestId("cart-product-price").textContent();

  expect(productsInCart[0]).toMatch(`${brand}${name}${price}`);
  expect(productText?.replaceAll(" ", "")).toMatch(`${name}${brand}${price}`.replaceAll(" ", ""));
})

