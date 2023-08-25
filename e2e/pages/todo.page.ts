import { Locator, Page, expect } from '@playwright/test';

export class TodoPage {
    url: string;
    readonly title                :Locator;
    readonly page                 :Page;
    readonly newTaskField         :Locator;
    readonly addButton            :Locator;
    readonly taskListText         :Locator;
    readonly saveButton           :Locator;
    readonly deleteButton         :Locator;
    readonly taskCompleteCheckbox :Locator;
    readonly taskListItem         :Locator;

    constructor(page :Page, baseURL :string) {
        this.page                 = page;
        this.url                  = baseURL;
        this.newTaskField         = page.getByPlaceholder('What needs to be done?');
        this.title                = page.locator('h1');
        this.addButton            = page.locator('button:text("Add")');
        this.taskListText         = page.locator('main > div').nth(5).locator('input').nth(1);
        this.saveButton           = page.locator('main > div').nth(5).locator('button:text("Save")');
        this.taskCompleteCheckbox = page.locator('main > div').nth(5).locator('input').nth(0);
        this.deleteButton         = page.locator('main > div').nth(5).locator('button:text("Delete")');
        this.taskListItem         = page.locator('main > div').nth(5);
    }  

    async goto() {
       await this.page.goto(this.url);
    }

    async verifyPageHasTodoTitle() {
        await expect(this.title).toHaveText('todos');
    }

    async addTask(taskName :string) {
        await this.newTaskField.fill(taskName);
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async verifyTheTodoListIncludes(taskName :string) {
        await expect(this.taskListText).toHaveValue(taskName);
    }

    async editTodoListItem(newTaskName :string) {
        await this.taskListText.click();
        await this.taskListText.fill(newTaskName);
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async markTaskComplete() {
        await this.taskCompleteCheckbox.check();
    }

    async verifyTaskIsChecked() {
        await expect(this.taskCompleteCheckbox).toBeChecked();
    }

    async verifyTaskIsNotChecked() {
        expect(await this.taskCompleteCheckbox.isChecked()).toBeFalsy();
    }

    async verifyCompletedTaskIsStruckThrough() {
        await expect(this.taskListText).toHaveCSS('text-decoration', /line-through/);
    }
    
    async clickDeleteButton() {
        await this.deleteButton.click();
    }

    async verifyTaskDoesNotExist() {
        await expect(this.taskListItem).not.toBeVisible()
    } 

    async reloadThePage() {
        await this.page.reload();
    }
}