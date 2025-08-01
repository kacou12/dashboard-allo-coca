import { i18n } from "@/locales";
import { z } from "zod";

const supplyTransactionSchema = z.object({});

export const supplyDepositSchema = z.object({
  amount: z
    .string()
    .min(1, "Ce champ est requis")
    .refine((val) => !isNaN(Number(val)), "Le montant doit être un nombre.") // Vérifie si la chaîne peut être convertie en un nombre valide
    .transform(Number) // Transforme la chaîne en nombre
    .pipe(
      z
        .number()
        .int("Le montant doit être un nombre entier.")
        .positive("Le montant doit être supérieur à 0."),
    ),
  // bank: z.string().min(1, 'Le nom de la banque est requis.'),
  file_url: z
    .custom<File>((val) => val instanceof File, {
      // Validate that it's an instance of File
      message: "Le bordereau de versement est requis.", // Message if no file or not a File object
    })
    .refine(
      (file) => file.size <= 50 * 1024 * 1024,
      `Le fichier doit faire moins de 50 Mo.`,
    ) // 50 MB limit
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
      `Type de fichier non supporté (JPEG, PNG, PDF uniquement).`,
    ),
  // type: z.literal('deposit'),
});
