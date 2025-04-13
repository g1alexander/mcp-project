import { defineStore } from 'pinia'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[],
    nextId: 1,
  }),

  actions: {
    addTodo(text: string) {
      this.todos.push({
        id: this.nextId++,
        text,
        completed: false,
      })
    },

    toggleTodo(id: number) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },

    deleteTodo(id: number) {
      const index = this.todos.findIndex((t) => t.id === id)
      if (index > -1) {
        this.todos.splice(index, 1)
      }
    },
  },

  getters: {
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),
    pendingTodos: (state) => state.todos.filter((todo) => !todo.completed),
  },
})
