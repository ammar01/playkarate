// src/App.vue

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { remult } from "remult";
import { Task } from "./shared/Task";

const taskRepo = remult.repo(Task);
const tasks = ref<Task[]>([]);
onMounted(() => taskRepo.find({
  limit: 20,
  orderBy: { createdAt: "asc" },
  //where: { completed: true }
}).then((items) => (tasks.value = items)));

const newTaskTitle = ref("")
async function addTask() {
  try {
    const newTask = await taskRepo.insert({ title: newTaskTitle.value })
    tasks.value.push(newTask)
    newTaskTitle.value = ""
  } catch (error) {
    alert((error as { message: string }).message)
  }
}

async function saveTask(task: Task) {
  try {
    await taskRepo.save(task)
  } catch (error) {
    alert((error as { message: string }).message)
  }
}

async function deleteTask(task: Task) {
  try {
    await taskRepo.delete(task)
    tasks.value = tasks.value.filter(t => task !== t)
  } catch (error) {
    alert((error as { message: string }).message)
  }
}
</script>
<template>
  <div>
    <h1>todos</h1>
    <main>
      <form @submit.prevent="addTask()">
        <input v-model="newTaskTitle" placeholder="What needs to be done?" />
        <button>Add</button>
      </form>
      <div v-for="task in tasks">
        <!--<input type="checkbox" v-model="task.completed" @change="saveTask(task)" />-->
        <input type="checkbox" v-model="task.completed" />
        <input v-model="task.title" />
        <button @click="saveTask(task)">Save</button>
        <button @click="deleteTask(task)">Delete</button>
      </div>
    </main>
  </div>
</template>