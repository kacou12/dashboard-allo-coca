import { dateValueSchema } from '@/lib/utils'
import { z } from 'zod'

export const adminSchema = z.object({
  email: z
    .string({ required_error: "L'adresse email est requise" })
    .email({ message: "Le format de l'adresse email est invalide" })
    .min(1, { message: "L'adresse email ne peut pas être vide" })
    .trim()
    .refine((email) => email.endsWith('@sendchap.ci'), {
      message: "L'email doit appartenir au domaine @sendchap.ci",
    }),
  firstname: z
    .string({ required_error: 'Le prénom est requis' })
    .min(1, { message: 'Le prénom ne peut pas être vide' })
    .trim(),
  lastname: z
    .string({ required_error: 'Le nom est requis' })
    .min(1, { message: 'Le nom ne peut pas être vide' })
    .trim(),
  phone: z
    .string({ required_error: 'Le numéro de téléphone est requis' })
    .min(1, { message: 'Le numéro de téléphone ne peut pas être vide' })
    .trim(),
  role_id: z.string({ required_error: 'Le rôle est requis' }),
  birthdate: dateValueSchema,
  // isActive: z.boolean({ required_error: "Le statut d'activation est requis" }),
})

export const adminRoleSchema = z.object({
  name: z
    .string({ required_error: 'Le nom du rôle est requis' })
    .min(1, { message: 'Le nom du rôle ne peut pas être vide' })
    .trim(),
})
