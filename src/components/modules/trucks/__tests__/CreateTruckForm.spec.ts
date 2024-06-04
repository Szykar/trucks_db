import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockRouter } from '../../../../tests-utils/test-utils'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import CreateTruckForm from '../CreateTruckForm.vue'

describe('CreateTruckModal', () => {
  const mountComponent = () => {
    return mount(CreateTruckForm, {
      global: {
        plugins: [mockRouter, PrimeVue, ToastService]
      }
    })
  }

  it('displays form', async () => {
    const wrapper = mountComponent()
    expect(wrapper.get('label[for="name"]').text()).toContain('Name')
    expect(wrapper.get('label[for="code"]').text()).toContain('Code')
    expect(wrapper.get('label[for="status"]').text()).toContain('Status')
    expect(wrapper.get('label[for="description"]').text()).toContain('Description')

    expect(wrapper.get('button[aria-label="Cancel"]').text()).toContain('Cancel')
    expect(wrapper.get('button[aria-label="Save"]').text()).toContain('Save')
  })
})
