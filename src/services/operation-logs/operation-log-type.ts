import { z } from 'zod'

import type { operationLogSchema } from './operation-log-schema'

export type OperationLogForm = z.infer<typeof operationLogSchema>

export type OperationLogResponse = {
  id: string
  args: string
  browser: string
  city: string
  code: string
  cost_time: number
  country: string
  created_time: string
  device: string
  ip: string
  method: string
  msg: string
  opera_time: string
  os: string
  path: string
  region: string
  status: number
  title: string
  trace_id: string
  user_agent: string
  user_email: string
  user_phone: string
}

export type OperationLogFiltersPayload = {
  page?: number
  q?: string
  status?: number
  dates?: [Date, Date]
  start_date?: string
  end_date?: string
  trace_id?: string
  user_email?: string
  user_phone?: string
  method?: string
  path?: string
  limit?: number
}
