import { test } from '@playwright/test';
import { TodoPage } from './pages/todo.page';

test.describe('Todo app tests', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page, baseURL }) => {
    todoPage = new TodoPage(page, baseURL as string)
    await todoPage.goto();
  })

  test('Add a new todo on the page @mock @int', async () => {
    await todoPage.verifyPageHasTodoTitle(); 
    await todoPage.addTask('Phone friend');
    await todoPage.clickAddButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend');
  });

  test('Edit a todo on the page without saving @int', async () => {
    await todoPage.editTodoListItem('Phone friend edited!');
    await todoPage.reloadThePage();
    await todoPage.verifyTheTodoListIncludes('Phone friend');
  });

  test('Edit a todo on the page and save @mock', async () => {
    await todoPage.addMockTask();
    await todoPage.editTodoListItem('Phone friend edited!');
    await todoPage.clickSaveButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend edited!');
  });

  test('Edit a todo on the page and save @int', async () => {
    await todoPage.editTodoListItem('Phone friend edited!');
    await todoPage.clickSaveButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend edited!');
  });

  test('Mark a todo as done without saving @int', async () => {
    await todoPage.markTaskComplete();
    await todoPage.reloadThePage();
    await todoPage.verifyTaskIsNotChecked();
  });

  test('Mark a todo as done and save @mock', async () => {
    await todoPage.addMockTask();
    await todoPage.markTaskComplete();
    await todoPage.clickSaveButton();
    await todoPage.verifyTaskIsChecked();
    await todoPage.verifyCompletedTaskIsStruckThrough();
  });

  test('Mark a todo as done and save @int', async () => {
    await todoPage.markTaskComplete();
    await todoPage.clickSaveButton();
    await todoPage.verifyTaskIsChecked();
    await todoPage.verifyCompletedTaskIsStruckThrough();
  });

  test('Delete a todo @mock', async () => {
    await todoPage.addMockTask();
    await todoPage.clickDeleteButton();
    await todoPage.verifyTaskDoesNotExist();
  });

  test('Delete a todo @int', async () => {
    await todoPage.clickDeleteButton();
    await todoPage.verifyTaskDoesNotExist();
  });
});