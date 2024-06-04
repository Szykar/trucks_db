import { afterAll, beforeAll, afterEach } from 'vitest'
import { defaultOptions } from 'primevue/config'
import { mockMatchMedia } from '@/tests-utils/test-utils'
import { config } from '@vue/test-utils'
import { server } from '@/tests-utils/msw'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import Toast from 'primevue/toast'

beforeAll(() => {
  mockMatchMedia()

  const originalConsoleError = console.error
  const jsDomCssError = 'Error: Could not parse CSS stylesheet'
  console.error = (...params) => {
    if (!params.find((p) => p.toString().includes(jsDomCssError))) {
      originalConsoleError(...params)
    }
  }

  config.global.mocks['$primevue'] = {
    config: defaultOptions
  }

  config.global.components = {
    Button: Button,
    Dropdown: Dropdown,
    Message: Message,
    InputText: InputText,
    Card: Card,
    Panel: Panel,
    Toast: Toast
  }

  server.listen({
    onUnhandledRequest: 'error'
  })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
