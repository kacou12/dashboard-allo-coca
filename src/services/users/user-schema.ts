import { dateValueSchema } from '@/lib/utils'
import { z } from 'zod'

export const userSchema = z.object({
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
export const userToAdminSchema = z.object({
  email: z
    .string({ required_error: "L'adresse e-mail est requise." })
    .email({ message: "L'adresse e-mail n'est pas valide." })
    .min(1, { message: "L'adresse e-mail est requise." })
    .trim(),

  firstname: z
    .string({ required_error: 'Le prénom est requis.' })
    .min(1, { message: 'Le prénom est requis.' })
    .trim(),

  lastname: z
    .string({ required_error: 'Le nom de famille est requis.' })
    .min(1, { message: 'Le nom de famille est requis.' })
    .trim(),

  phone: z
    .string({ required_error: 'Le numéro de téléphone est requis.' })
    .min(1, { message: 'Le numéro de téléphone est requis.' })
    .trim(),

  birthdate: dateValueSchema,
  password: z.string({ required_error: 'Le mot de passe est requis.' }),
})
