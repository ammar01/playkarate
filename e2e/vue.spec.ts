import { test } from '@playwright/test';
import { TodoPage } from './pages/todo.page';


test.describe('to do tests', () => {

  let todoPage :TodoPage;

  //test.beforeAll(async ({ page, baseURL}) => {
  //});

  test.beforeEach(async ({page, baseURL}) => {
    todoPage = new TodoPage(page, baseURL as string)
    await todoPage.goto();
  })
  
  // See here how to get started:
  // https://playwright.dev/docs/intro
  test('Add a new todo on the page @mock @int', async ({ page, baseURL }) => {
    await todoPage.addTask('Phone friend');
    await todoPage.clickAddButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend');
  });
  
  test('Edit a todo on the page without saving @int', async ({ page }) => {
    await todoPage.editTodoListItem('Phone friend edited!');
    await todoPage.reloadThePage();
    await todoPage.verifyTheTodoListIncludes('Phone friend');
  });
 
  test('Edit a todo on the page and save @mock', async ({ page }) => {
    await todoPage.addTask('Phone friend');
    await todoPage.clickAddButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend');
    await todoPage.editTodoListItem('Phone friend edited!');
    await todoPage.clickSaveButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend edited!');
  });
   
  test('Edit a todo on the page and save @int', async ({ page }) => {
    await todoPage.editTodoListItem('Phone friend edited!');
    await todoPage.clickSaveButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend edited!');
  });
  
  test('Mark a todo as done without saving @int', async ({ page }) => {
    await todoPage.markTaskComplete();
    await todoPage.reloadThePage();
    await todoPage.verifyTaskIsNotChecked();
  });
  
  test('Mark a todo as done and save @mock', async ({ page }) => {
    await todoPage.addTask('Phone friend');
    await todoPage.clickAddButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend');
    await todoPage.markTaskComplete();
    await todoPage.clickSaveButton();
    await todoPage.verifyTaskIsChecked();
    await todoPage.verifyCompletedTaskIsStruckThrough();
  });

  test('Mark a todo as done and save @int', async ({ page }) => {
    await todoPage.markTaskComplete();
    await todoPage.clickSaveButton();
    await todoPage.verifyTaskIsChecked();
    await todoPage.verifyCompletedTaskIsStruckThrough();
  });
  
  test('Delete a todo @mock @int', async ({ page }) => {
    await todoPage.addTask('Phone friend');
    await todoPage.clickAddButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend');
    await todoPage.clickDeleteButton();
    await todoPage.verifyTaskDoesNotExist();
  });
  
  /*test('End to end test that works in both modes @mock @int', async ({ page, baseURL }) => {
    //await page.goto('/');
    //await page.goto(baseURL as string);
    const todoPage = new todoPage(page, baseURL as string)
    await todoPage.goto();
  
    await todoPage.verifyPageHasTodoTitle();
    await todoPage.addTask('Phone friend');
    await todoPage.clickAddButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend');
  
    await todoPage.editTodoListItem('Phone friend edited!');
    await todoPage.clickSaveButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend edited!');
  
    await todoPage.markTaskComplete();
    await todoPage.clickSaveButton();
    await todoPage.verifyTaskIsChecked();
    await todoPage.verifyCompletedTaskIsStruckThrough();
  
    await todoPage.clickDeleteButton();
    await todoPage.verifyTaskDoesNotExist();
  
  
  
  
    /*await page.goto('/');
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
    await expect(page.locator('main > div').nth(5)).not.toBeVisible();*/
  //});
});