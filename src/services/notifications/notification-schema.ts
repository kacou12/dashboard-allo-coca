import { i18n } from '@/locales'
import { z } from 'zod'

export const notificationSchema = z.object({
  title: z
    .string({ required_error: 'Le titre est requis' })
    .min(1, { message: 'Le titre ne peut pas être vide' })
    .trim(),
  message: z
    .string({ required_error: 'Le message est requis' })
    .min(1, { message: 'Le message ne peut pas être vide' })
    .trim(),
})
// export const adminRoleSchema = z.object({
//   name: z
//     .string({ required_error: i18n.global.t('login.validation.name') })
//     .min(1, { message: i18n.global.t('login.validation.username') })
//     .trim(),
// })
