import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { API_URL } from '@/services/trucksService'

const trucks = [
  {
    id: 1,
    name: 'Big Truck',
    code: 'BT001',
    status: 'OUT_OF_SERVICE',
    description: 'I am speed'
  }
]

export const restHandlers = [
  http.get(`${API_URL}/trucks`, () => {
    return HttpResponse.json(trucks)
  }),
  http.get(`${API_URL}/trucks/1`, () => {
    return HttpResponse.json(trucks[0])
  }),
  http.put(`${API_URL}/trucks/1`, () => {
    return HttpResponse.json({
      ...trucks[0],
      status: 'AT_JOB'
    })
  })
]

export const server = setupServer(...restHandlers)
