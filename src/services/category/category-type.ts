import { z } from 'zod'

import type { categorySchema } from './category-schema'

export type CategoryForm = z.infer<typeof categorySchema>

export type CategoryRequest = {
  name: string
  description: string
}

export interface CategoryResponse {
  id: string
  name: string
  description: string
  created_at?: string
  updated_at?: string
}