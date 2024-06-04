export const enum TRUCK_STATUSES {
  OUT_OF_SERVICE = 'OUT_OF_SERVICE',
  LOADING = 'LOADING',
  TO_JOB = 'TO_JOB',
  AT_JOB = 'AT_JOB',
  RETURNING = 'RETURNING'
}

export type Truck = {
  id?: number
  code: string
  name: string
  status: TRUCK_STATUSES
  description?: string
}

export type TrucksData = {
  trucks: Truck[]
  total: number
}
