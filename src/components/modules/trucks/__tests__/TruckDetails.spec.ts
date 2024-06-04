import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockRouter } from '../../../../tests-utils/test-utils'
import TruckDetails from '../TruckDetails.vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

describe('TruckDetails', () => {
  const mountComponent = () => {
    mockRouter.currentRoute.value.params = { id: '1' }
    return mount(TruckDetails, {
      global: {
        plugins: [mockRouter, PrimeVue, ToastService]
      }
    })
  }

  it('renders details', async () => {
    const wrapper = mountComponent()

    await vi.waitFor(() => {
      expect(wrapper.get('.p-panel'))
    })
    expect(wrapper.text()).toContain('BT001')
    expect(wrapper.text()).toContain('Big Truck')
    expect(wrapper.text()).toContain('I am speed')
    expect(wrapper.text()).toContain('Truck Out of service')
  })

  it('allows to change the status', async () => {
    const wrapper = mountComponent()

    await vi.waitFor(() => {
      wrapper.get('.p-dropdown').trigger('click')
      wrapper.get('li[aria-label="At Job"]').trigger('click')
    })
    await vi.waitFor(() => {
      expect(wrapper.get('li[aria-current="step"]').text()).toContain('At Job')
    })
  })
})
