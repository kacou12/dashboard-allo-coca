import { i18n } from '@/locales';
import { z } from 'zod';

export const clientSchema = z.object({
  email: z
    .string({ required_error: "L'adresse email est requise" })
    .email({ message: "Le format de l'adresse email est invalide" })
    .min(1, { message: "L'adresse email ne peut pas être vide" })
    .trim(),
  name: z
    .string({ required_error: 'Le nom complet est requis' })
    .min(1, { message: 'Le nom complet ne peut pas être vide' })
    .trim(),
  phone: z
    .string({ required_error: 'Le numéro de téléphone est requis' })
    .min(1, { message: 'Le numéro de téléphone ne peut pas être vide' })
    .trim(),
  // role: z.string({ required_error: 'Le rôle est requis' }),
});



export const clientUpdateSchema = clientSchema.partial();