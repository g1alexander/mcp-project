<script setup lang="ts">
import { ref } from 'vue'
import { useTodosStore } from '../stores/todos'

const todosStore = useTodosStore()
const newTodoText = ref('')

const addTodo = () => {
  if (newTodoText.value.trim()) {
    todosStore.addTodo(newTodoText.value.trim())
    newTodoText.value = ''
  }
}
</script>

<template>
  <div class="todo-list">
    <h2>Lista de Tareas</h2>

    <form @submit.prevent="addTodo" class="todo-form">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="Agregar nueva tarea..."
        class="todo-input"
      />
      <button type="submit" class="add-button">Agregar</button>
    </form>

    <ul class="todos">
      <li v-for="todo in todosStore.todos" :key="todo.id" class="todo-item">
        <input type="checkbox" :checked="todo.completed" @change="todosStore.toggleTodo(todo.id)" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="todosStore.deleteTodo(todo.id)" class="delete-button">Eliminar</button>
      </li>
    </ul>

    <div class="todo-stats">
      <p>Tareas pendientes: {{ todosStore.pendingTodos.length }}</p>
      <p>Tareas completadas: {{ todosStore.completedTodos.length }}</p>
    </div>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-button {
  padding: 8px 16px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todos {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-button {
  margin-left: auto;
  padding: 4px 8px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-stats {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
</style>
