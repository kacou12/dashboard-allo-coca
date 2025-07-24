import { z } from 'zod'

export const adminAlertSchema = z.object({
  is_resolved: z.boolean(),
  //   id: z.string(),
  //   title: z.string(),
  //   description: z.string(),
  //   type: z.string(),
  //   severity: z.string(),
  //   created_at: z.string(),
  //   updated_at: z.string(),
  //   resolved_at: z.string().nullable(),
  //   metadata: z.array(z.number()).optional(),
  //   status: z.string().optional(),
})

export type AdminAlertSchema = z.infer<typeof adminAlertSchema>
