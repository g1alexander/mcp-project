import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TodoList from '../TodoList.vue'
import { useTodosStore } from '../../stores/todos'

describe('TodoList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(TodoList)
    expect(wrapper.find('.todo-list').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('adds a new todo when submitting the form', async () => {
    const wrapper = mount(TodoList)
    const store = useTodosStore()

    const input = wrapper.find('input[type="text"]')
    await input.setValue('New test todo')
    await wrapper.find('form').trigger('submit')

    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].text).toBe('New test todo')
    expect(input.element.value).toBe('')
  })

  it('displays todos from the store', async () => {
    const wrapper = mount(TodoList)
    const store = useTodosStore()

    store.addTodo('Test todo 1')
    store.addTodo('Test todo 2')

    await wrapper.vm.$nextTick()

    const todoItems = wrapper.findAll('.todo-item')
    expect(todoItems).toHaveLength(2)
    expect(todoItems[0].text()).toContain('Test todo 1')
    expect(todoItems[1].text()).toContain('Test todo 2')
  })

  it('toggles todo completion status', async () => {
    const wrapper = mount(TodoList)
    const store = useTodosStore()

    store.addTodo('Test todo')
    await wrapper.vm.$nextTick()

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)

    expect(store.todos[0].completed).toBe(true)
    expect(wrapper.find('.completed').exists()).toBe(true)
  })

  it('deletes a todo', async () => {
    const wrapper = mount(TodoList)
    const store = useTodosStore()

    store.addTodo('Test todo')
    await wrapper.vm.$nextTick()

    await wrapper.find('.delete-button').trigger('click')
    expect(store.todos).toHaveLength(0)
  })

  it('shows correct stats', async () => {
    const wrapper = mount(TodoList)
    const store = useTodosStore()

    store.addTodo('Task 1')
    store.addTodo('Task 2')
    store.toggleTodo(store.todos[0].id)

    await wrapper.vm.$nextTick()

    const stats = wrapper.find('.todo-stats')
    expect(stats.text()).toContain('Tareas pendientes: 1')
    expect(stats.text()).toContain('Tareas completadas: 1')
  })
})
