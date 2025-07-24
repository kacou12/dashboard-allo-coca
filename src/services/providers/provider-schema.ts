import { i18n } from '@/locales'
import { z } from 'zod'

export const providerSchema = z
  .object({
    name: z
      .string({ required_error: 'Le nom du fournisseur est requis' })
      .min(1, { message: 'Le nom du fournisseur ne peut pas être vide' })
      .trim(),
    image_url: z
      .string({ required_error: "L'URL de l'image est requise" })
      .min(1, { message: "L'URL de l'image ne peut pas être vide" })
      .trim(),
    instruction: z
      .string({ required_error: 'Les instructions sont requises' })
      .min(1, { message: 'Les instructions ne peuvent pas être vides' })
      .trim(),
    validation_type: z.enum(['link', 'otp', 'ussd'], {
      required_error: 'Le type de validation est requis',
      invalid_type_error: "Le type de validation doit être 'link', 'otp' ou 'ussd'",
    }),
    extra: z
      .array(z.string())
      .min(1, { message: 'Au moins un élément supplémentaire est requis' })
      .default([]),
    cashin_issuer_used: z
      .array(z.string())
      .min(1, { message: 'Au moins un élément supplémentaire est requis' })
      .default([]),
    cashout_issuer_used: z
      .array(z.string())
      .min(1, { message: 'Au moins un élément supplémentaire est requis' })
      .default([]),
  })
  .partial()
// instruction: string
// validation_type: 'link' | 'otp' | 'ussd'
// extra: string[]
