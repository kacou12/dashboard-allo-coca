import { i18n } from '@/locales'
import { z } from 'zod'

export const userVerficationSchema = z.object({
  // email: z
  //   .string({ required_error: i18n.global.t('login.validation.username') })
  //   .email({ message: i18n.global.t('login.validation.email') })
  //   .min(1, { message: i18n.global.t('login.validation.username') })
  //   .trim(),
  // firstname: z
  //   .string({ required_error: i18n.global.t('login.validation.password') })
  //   .min(1, { message: i18n.global.t('login.validation.password') })
  //   .trim(),
  // lastname: z
  //   .string({ required_error: i18n.global.t('login.validation.password') })
  //   .min(1, { message: i18n.global.t('login.validation.password') })
  //   .trim(),
  // phone: z
  //   .string({ required_error: i18n.global.t('login.validation.password') })
  //   .min(1, { message: i18n.global.t('login.validation.password') })
  //   .trim(),
  // role_id: z.string({ required_error: i18n.global.t('login.validation.password') }),
  // birthdate: z.string({ required_error: i18n.global.t('login.validation.password') }),
  // isActive: z.boolean({ required_error: i18n.global.t('login.validation.password') }),
})
