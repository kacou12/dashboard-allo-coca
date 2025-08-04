import { i18n } from "@/locales";
import { z } from "zod";

const invoiceTransactionSchema = z.object({});

export const invoicePaymentSchema = z.object({
  invoiceNumber: z
    .string()
    .min(1, "Le numéro de facture est requis")
    .regex(
      /^[A-Z0-9-]+$/,
      "Le numéro de facture doit contenir uniquement des lettres majuscules, des chiffres et des tirets",
    ),

  amount: z
    .string()
    .min(1, "Ce champ est requis")
    .refine((val) => !isNaN(Number(val)), "Le montant doit être un nombre.")
    .transform(Number)
    .pipe(
      z
        .number()
        .int("Le montant doit être un nombre entier.")
        .positive("Le montant doit être supérieur à 0."),
    ),

  service: z.enum(["CIE", "SODECI", "Canal+"], {
    errorMap: () => ({ message: "Veuillez sélectionner un service valide" }),
  }),

  dueDate: z
    .string()
    .min(1, "La date d'échéance est requise")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Format de date invalide")
    .refine((date) => {
      const parsedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parsedDate >= today;
    }, "La date d'échéance ne peut pas être dans le passé"),
});
