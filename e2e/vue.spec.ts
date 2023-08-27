import { test } from '@playwright/test';
import { TodoPage } from './pages/todo.page';
const fs = require('fs');

test.describe('Todo app tests', () => {
  let todoPage: TodoPage;

  test.beforeAll(async () => {
    fs.copyFile('./db/tasksBackup.json', './db/tasks.json', (err :Error) => {
      if (err) throw err;
    });
  })

  test.beforeEach(async ({ page, baseURL }) => {
    todoPage = new TodoPage(page, baseURL as string)
    await todoPage.goto();
  });

  test('Page has a title @mock @int', async () => {
    await todoPage.verifyPageHasTodoTitle(); 
  });

  test('Add a new todo on the page @mock @int', async () => {
    await todoPage.addTask('Phone friend');
    await todoPage.clickAddButton();
    await todoPage.verifyTheTodoListIncludes('Phone friend');
  });

  test('Edit a todo on the page without saving @int', async () => {
    await todoPage.editTodoListItem('Do laundry', 'Say hello');
    await todoPage.reloadThePage();
    await todoPage.verifyTheTodoListIncludes('Do laundry');

  });

  test('Edit a todo on the page and save @mock @int', async () => {
    await todoPage.editTodoListItem('Do laundry', 'Say hello');
    await todoPage.clickSaveButton('Say hello');
    await todoPage.verifyTheTodoListIncludes('Say hello');
  });

  test('Mark a todo as done without saving @int', async () => {
    await todoPage.markTaskComplete('Pay bills');
    await todoPage.reloadThePage();
    await todoPage.verifyTaskIsNotChecked('Pay bills');
  });

  test('Mark a todo as done and save @mock @int', async () => {
    await todoPage.markTaskComplete('Pay bills');
    await todoPage.clickSaveButton('Pay bills');
    await todoPage.verifyTaskIsChecked('Pay bills');
    await todoPage.verifyCompletedTaskIsStruckThrough('Pay bills');
  });

  test('Delete a todo @mock @int', async () => {
    await todoPage.clickDeleteButton('Clean car');
    await todoPage.verifyTaskDoesNotExist('Clean car');
  });
});