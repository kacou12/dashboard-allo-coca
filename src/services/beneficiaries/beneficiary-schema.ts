import { i18n } from '@/locales'
import { z } from 'zod'

export const beneficiarySchema = z.object({
  first_name: z
    .string({ required_error: i18n.global.t('validation.first_name_required') })
    .min(1, { message: i18n.global.t('validation.first_name_required') })
    .trim(),
  last_name: z
    .string({ required_error: i18n.global.t('validation.last_name_required') })
    .min(1, { message: i18n.global.t('validation.last_name_required') })
    .trim(),
  network: z
    .string({ required_error: i18n.global.t('validation.network_required') })
    .min(1, { message: i18n.global.t('validation.network_required') })
    .trim(),
  phone: z
    .string({ required_error: i18n.global.t('validation.phone_required') })
    .min(1, { message: i18n.global.t('validation.phone_required') })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: i18n.global.t('validation.phone_format') })
    .trim(),
  description: z
    .string()
    .optional()
    .or(z.literal(''))
})