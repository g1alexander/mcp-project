import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodosStore } from '../todos'

describe('Todos Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should create a store', () => {
    const store = useTodosStore()
    expect(store).toBeDefined()
  })

  it('should add a todo', () => {
    const store = useTodosStore()
    store.addTodo('Test todo')
    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].text).toBe('Test todo')
    expect(store.todos[0].completed).toBe(false)
  })

  it('should toggle todo completion', () => {
    const store = useTodosStore()
    store.addTodo('Test todo')
    const id = store.todos[0].id

    store.toggleTodo(id)
    expect(store.todos[0].completed).toBe(true)

    store.toggleTodo(id)
    expect(store.todos[0].completed).toBe(false)
  })

  it('should delete a todo', () => {
    const store = useTodosStore()
    store.addTodo('Test todo')
    const id = store.todos[0].id

    store.deleteTodo(id)
    expect(store.todos).toHaveLength(0)
  })

  it('should track completed and pending todos', () => {
    const store = useTodosStore()
    store.addTodo('Task 1')
    store.addTodo('Task 2')
    store.addTodo('Task 3')

    store.toggleTodo(store.todos[0].id)
    store.toggleTodo(store.todos[1].id)

    expect(store.completedTodos).toHaveLength(2)
    expect(store.pendingTodos).toHaveLength(1)
  })
})
