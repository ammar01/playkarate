import { Locator, Page, expect } from '@playwright/test';

export class TodoPage {
    url: string;
    readonly title: Locator;
    readonly page: Page;
    readonly newTaskField: Locator;
    readonly addButton: Locator;
    readonly taskListText: Locator;
    readonly saveButton: Locator;
    readonly deleteButton: Locator;
    readonly taskCompleteCheckbox: Locator;
    readonly taskListItem: Locator;

    constructor(page: Page, baseURL: string) {
        this.page = page;
        this.url = baseURL;
        this.newTaskField = page.getByPlaceholder('What needs to be done?');
        this.title = page.locator('h1');
        this.addButton = page.locator('button:text("Add")');
        this.taskListText = page.locator('main > div').nth(5).locator('input').nth(1);
        this.saveButton = page.locator('main > div').nth(5).locator('button:text("Save")');
        this.taskCompleteCheckbox = page.locator('main > div').nth(5).locator('input').nth(0);
        this.deleteButton = page.locator('main > div').nth(5).locator('button:text("Delete")');
        this.taskListItem = page.locator('main > div').nth(5);
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async verifyPageHasTodoTitle() {
        await expect(this.title).toHaveText('todos');
    }

    async addTask(taskName: string) {
        await this.newTaskField.fill(taskName);
    }

    async clickAddButton() {
        await this.addButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
    }

    async verifyTheTodoListIncludes(taskName: string) {
        let taskNamesList: string[] = [];
        for (let task of (await this.page.locator('main > div > input:nth-child(2)').all()).values()) {
            taskNamesList.push(await task.inputValue());
        }
        expect(taskNamesList).toContain(taskName);
    }

    async editTodoListItem(oldTaskName: string, newTaskName: string) {
        for (let task of (await this.page.locator('main > div > input:nth-child(2)').all()).values()) {
            if (await task.inputValue() == oldTaskName) {
                await task.click();
                await task.fill(newTaskName);
                return;
            }
        }
        throw new Error('Task ' + oldTaskName + ' could not be found in the list');
    }

    async clickSaveButton() {
        await this.saveButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async markTaskComplete(taskName: string) {
        //await this.taskCompleteCheckbox.check();
        for (let task of (await this.page.locator('main > div').all()).values()) {
            if (await task.locator('input:nth-child(2)').inputValue() == taskName) {
                await task.locator('input:nth-child(1)').check();
                return;
            }
        }
        throw new Error('Unable to check task ' + taskName + ' as it is not in the list');
    }

    async verifyTaskIsChecked(taskName: string) {
        // await expect(this.taskCompleteCheckbox).toBeChecked();
        for (let task of (await this.page.locator('main > div').all()).values()) {
            if (await task.locator('input:nth-child(2)').inputValue() == taskName) {
                await expect(task.locator('input:nth-child(1)')).toBeChecked();
                return;
            }
        }
        throw new Error('Veridy checked: unable to find task ' + taskName + ' as it is not in the list');
    }

    async verifyTaskIsNotChecked(taskName: string) {
        //expect(await this.taskCompleteCheckbox.isChecked()).toBeFalsy();
        for (let task of (await this.page.locator('main > div').all()).values()) {
            if (await task.locator('input:nth-child(2)').inputValue() == taskName) {
                expect(await task.locator('input:nth-child(1)').isChecked()).toBeFalsy();
                return;
            }
        }
        throw new Error('Verify unchecked: unable to find task ' + taskName + ' as it is not in the list');
    }

    async verifyCompletedTaskIsStruckThrough() {
        await expect(this.taskListText).toHaveCSS('text-decoration', /line-through/);
    }

    async clickDeleteButton(taskName: string) {
        // await this.deleteButton.click();
        for (let task of (await this.page.locator('main > div').all()).values()) {
            if (await task.locator('input:nth-child(2)').inputValue() == taskName) {
                await task.locator('button:text("Delete")').click();
                await this.page.waitForLoadState('domcontentloaded');
                await expect(task.locator('button:text("Delete")')).not.toBeVisible();
                return;
            }
        }
        throw new Error('Task ' + taskName + ' could not be found in the list');
    }

    async verifyTaskDoesNotExist(taskName: string) {
        //await expect(this.taskListItem).not.toBeVisible();
        for (let task of (await this.page.locator('main > div').all()).values()) {
            if (await task.locator('input:nth-child(2)').inputValue() == taskName) {
                throw new Error('Task ' + taskName + ' could not be found in the list');
            }
        }
    }

    async reloadThePage() {
        await this.page.reload();
    }

    async addMockTask() {
        await this.newTaskField.fill('.');
        await this.addButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.taskListText).toHaveValue('Phone friend');
    }
}