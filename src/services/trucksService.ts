import { type Truck, type TrucksData } from '@/types/trucks'

export const API_URL = 'http://qa-api-mock-3.eu-central-1.elasticbeanstalk.com'

export const ERROR_CODES = Object.freeze({
  NOT_UNIQUE: 'NOT_UNIQUE'
})

export const fetchTrucks = async (
  { page, name }: { page?: number; name?: string } = { page: 1, name: '' }
): Promise<TrucksData> => {
  const response = await fetch(`${API_URL}/trucks?page=${page}${name ? '&name=' + name : ''}`)
  if (!response.ok) {
    throw new Error('Failed to fetch trucks')
  }
  const data = await response.json()
  return {
    trucks: data,
    total: Number(response.headers.get('X-Total-Count'))
  }
}

export const fetchTruckById = async (id: string): Promise<Truck> => {
  const response = await fetch(`${API_URL}/trucks/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch truck')
  }
  return await response.json()
}

export const createTruck = async (truck: Truck): Promise<Truck> => {
  const response = await fetch(`${API_URL}/trucks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(truck)
  })
  const data = await response.json()
  if (!response.ok) {
    //@ts-ignore TODO improve passing error details
    throw new Error('Failed to create truck', { cause: data })
  }
  return data
}

export const updateTruck = async (id: number, truck: Partial<Truck>): Promise<Truck> => {
  const response = await fetch(`${API_URL}/trucks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(truck)
  })
  if (!response.ok) {
    throw new Error('Failed to update truck')
  }
  return await response.json()
}

export const deleteTruck = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/trucks/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Failed to delete truck')
  }
}
