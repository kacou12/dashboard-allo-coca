import { i18n } from '@/locales'
import { z } from 'zod'

export const stockSchema = z.object({
  product_name: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
  volume: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
  image_url: z
    .string({ required_error: i18n.global.t('validation.required') })
    .url({ message: i18n.global.t('validation.url') }),
  quantity: z
    .number({ required_error: i18n.global.t('validation.required') })
    .min(0, { message: 'La quantité doit être supérieure ou égale à 0' }),
  min_threshold: z
    .number()
    .min(0, { message: 'Le seuil minimum doit être supérieur ou égal à 0' })
    .optional(),
  max_threshold: z
    .number()
    .min(0, { message: 'Le seuil maximum doit être supérieur ou égal à 0' })
    .optional(),
})

export const stockUpdateSchema = z.object({
  product_name: z
    .string()
    .min(1, { message: i18n.global.t('validation.required') })
    .optional(),
  volume: z
    .string()
    .min(1, { message: i18n.global.t('validation.required') })
    .optional(),
  image_url: z
    .string()
    .url({ message: i18n.global.t('validation.url') })
    .optional(),
  quantity: z
    .number()
    .min(0, { message: 'La quantité doit être supérieure ou égale à 0' })
    .optional(),
  min_threshold: z
    .number()
    .min(0, { message: 'Le seuil minimum doit être supérieur ou égal à 0' })
    .optional(),
  max_threshold: z
    .number()
    .min(0, { message: 'Le seuil maximum doit être supérieur ou égal à 0' })
    .optional(),
  status: z.string().optional(),
})

export const stockStatusUpdateSchema = z.object({
  status: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
})

export const stockQuantityUpdateSchema = z.object({
  quantity: z
    .number({ required_error: i18n.global.t('validation.required') })
    .min(0, { message: 'La quantité doit être supérieure ou égale à 0' }),
  operation: z
    .enum(['add', 'subtract', 'set'], { 
      required_error: 'Le type d\'opération est requis',
      invalid_type_error: 'Type d\'opération invalide'
    }),
})

// Validation with custom refinements
export const stockSchemaWithRefinements = stockSchema.refine(
  (data) => {
    if (data.min_threshold && data.max_threshold) {
      return data.min_threshold <= data.max_threshold
    }
    return true
  },
  {
    message: "Le seuil minimum doit être inférieur ou égal au seuil maximum",
    path: ["min_threshold"],
  }
)