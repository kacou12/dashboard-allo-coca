import { i18n } from "@/locales";
import { z } from "zod";

// const supplyTransactionSchema = z.object({});

export const massPaymentSchema = z.object({
  // amount: z
  //   .string()
  //   .min(1, "Ce champ est requis")
  //   .refine((val) => !isNaN(Number(val)), "Le montant doit être un nombre.") // Vérifie si la chaîne peut être convertie en un nombre valide
  //   .transform(Number) // Transforme la chaîne en nombre
  //   .pipe(
  //     z
  //       .number()
  //       .int("Le montant doit être un nombre entier.")
  //       .positive("Le montant doit être supérieur à 0."),
  //   ),
  // bank: z.string().min(1, 'Le nom de la banque est requis.'),
  file_url: z
    .custom<File>((val) => val instanceof File, {
      // Validate that it's an instance of File
      message: "Le fichier Excel est requis.", // Message si aucun fichier ou pas un objet File
    })
    .refine(
      (file) => file.size <= 50 * 1024 * 1024,
      `Le fichier doit faire moins de 50 Mo.`,
    ) // Limite à 50 Mo
    .refine(
      (file) =>
        [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(file.type),
      `Type de fichier non supporté (XLS, XLSX uniquement).`,
    ),
  // type: z.literal('deposit'),
});