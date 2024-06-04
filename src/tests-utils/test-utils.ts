import { vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

const mockMatchMedia = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })
}

export { mockMatchMedia }

const stubVueRouter = () => {
  return {
    global: {
      stubs: {
        RouterLink: { template: '<div/>' },
        RouterView: { template: '<div/>' }
      }
    }
  }
}

export { stubVueRouter }

export const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: {}
    },
    {
      path: '/all-trucks',
      name: 'allTrucks',
      component: {}
    }
  ]
})
