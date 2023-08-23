import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
/*test('Add a new todo on the page @mock @int', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('todos');
  await page.getByPlaceholder('What needs to be done?').fill('Phone friend');
  await page.locator('button:text("Add")').click();
  await expect(page.locator('main > div').nth(5).locator('input').nth(1)).toHaveValue('Phone friend');
});

test('Edit a todo on the page without saving @int', async ({ page }) => {
  await page.goto('/');
  await page.locator('main > div').nth(5).locator('input').nth(1).click();
  await page.locator('main > div').nth(5).locator('input').nth(1).fill('Phone friend edited!');
  await page.reload();
  await expect(page.locator('main > div').nth(5).locator('input').nth(1)).toHaveValue('Phone friend');
});

test('Edit a todo on the page and save @mock @int', async ({ page }) => {
  await page.goto('/');
  await page.locator('main > div').nth(5).locator('input').nth(1).click();
  await page.locator('main > div').nth(5).locator('input').nth(1).fill('Phone friend edited!');
  await page.locator('main > div').nth(5).locator('button:text("Save")').click();
  await expect(page.locator('main > div').nth(5).locator('input').nth(1)).toHaveValue('Phone friend edited!');
});

test('Mark a todo as done without saving @int', async ({ page }) => {
  await page.goto('/');
  await page.locator('main > div').nth(5).locator('input').nth(0).check();
  await page.reload();
  expect(await page.locator('main > div').nth(5).locator('input').nth(0).isChecked()).toBeFalsy();
});

test('Mark a todo as done and save @mock @int', async ({ page }) => {
  await page.goto('/');
  await page.locator('main > div').nth(5).locator('input').nth(0).check();
  await page.locator('main > div').nth(5).locator('button:text("Save")').click();
  await expect(page.locator('main > div').nth(5).locator('input').nth(0)).toBeChecked();
  await expect(page.locator('main > div').nth(5).locator('input').nth(1)).toHaveCSS('text-decoration', /line-through/);
});

test('Delete a todo @mock @int', async ({ page }) => {
  await page.goto('/');
  await page.locator('main > div').nth(5).locator('button:text("Delete")').click();
  await expect(page.locator('main > div').nth(5)).not.toBeVisible();
});*/

test('Edit a todo on the page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('todos');
  await page.getByPlaceholder('What needs to be done?').fill('Phone friend');
  await page.locator('button:text("Add")').click();
  await expect(page.locator('main > div').nth(5).locator('input').nth(1)).toHaveValue('Phone friend');

  //await page.locator('main > div').nth(5).locator('input').nth(1).click();
  //await page.locator('main > div').nth(5).locator('input').nth(1).fill('Phone friend edited!');
  //await page.reload();
  //await expect(page.locator('main > div').nth(5).locator('input').nth(1)).toHaveValue('Phone friend');

  await page.locator('main > div').nth(5).locator('input').nth(1).click();
  await page.locator('main > div').nth(5).locator('input').nth(1).fill('Phone friend edited!');
  await page.locator('main > div').nth(5).locator('button:text("Save")').click();
  //await page.reload();
  await expect(page.locator('main > div').nth(5).locator('input').nth(1)).toHaveValue('Phone friend edited!');

  //await page.locator('main > div').nth(5).locator('input').nth(0).check();
  //await page.reload();
  //expect(await page.locator('main > div').nth(5).locator('input').nth(0).isChecked()).toBeFalsy();

  await page.locator('main > div').nth(5).locator('input').nth(0).check();
  await expect(page.locator('main > div').nth(5).locator('input').nth(1)).toHaveCSS('text-decoration', /line-through/);
  await page.locator('main > div').nth(5).locator('button:text("Save")').click();
  //await page.reload();
  await expect(page.locator('main > div').nth(5).locator('input').nth(0)).toBeChecked();
  
  await page.locator('main > div').nth(5).locator('button:text("Delete")').click();
  await expect(page.locator('main > div').nth(5)).not.toBeVisible();
});