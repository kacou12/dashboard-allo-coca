import { i18n } from '@/locales';
import { z } from 'zod';

export const clientSchema = z.object({
  customer_name: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
  customer_id: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
  contact_client: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
  commune: z
    .string({ required_error: i18n.global.t('validation.required') })
    .min(1, { message: i18n.global.t('validation.required') }),
});

export const clientUpdateSchema = clientSchema.partial();