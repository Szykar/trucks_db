import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppNavigation from '../AppNavigation.vue'
import { stubVueRouter } from '../../../tests-utils/test-utils'

describe('AppNavigation', () => {
  it('renders links', () => {
    const wrapper = mount(AppNavigation, { ...stubVueRouter() })
    expect(wrapper.text()).toContain('TRUCKS DB')
  })
})
