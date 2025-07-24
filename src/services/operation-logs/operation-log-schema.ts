import { z } from 'zod'

export const operationLogSchema = z
  .object({
    args: z.string().optional(),
    browser: z.string().optional(),
    city: z.string().optional(),
    code: z.string().optional(),
    cost_time: z.number().optional(),
    country: z.string().optional(),
    device: z.string().optional(),
    ip: z.string().optional(),
    method: z.string().optional(),
    msg: z.string().optional(),
    os: z.string().optional(),
    path: z.string().optional(),
    region: z.string().optional(),
    status: z.number().optional(),
    title: z.string().optional(),
    trace_id: z.string().optional(),
    user_agent: z.string().optional(),
    user_email: z.string().optional(),
    user_phone: z.string().optional(),
  })
  .partial()
