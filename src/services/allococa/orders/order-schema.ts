import { i18n } from '@/locales'
import { z } from 'zod'

export const orderSchema = z.object({
  customer_name: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
  contact_client: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') })
    .regex(/^[0-9\s+\-()]+$/, { message: i18n.global.t('validation.phone') }),
  commune: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
})

export const orderUpdateSchema = z.object({
  customer_name: z
    .string()
    .min(1, { message: i18n.global.t('validation.required') })
    .optional(),
  contact_client: z
    .string()
    .min(1, { message: i18n.global.t('validation.required') })
    .regex(/^[0-9\s+\-()]+$/, { message: i18n.global.t('validation.phone') })
    .optional(),
  commune: z
    .string()
    .min(1, { message: i18n.global.t('validation.required') })
    .optional(),
  status: z.string().optional(),
})

export const orderStatusUpdateSchema = z.object({
  status: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
})