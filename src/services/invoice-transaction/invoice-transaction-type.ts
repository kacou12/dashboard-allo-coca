// Définition du type pour les détails d'une facture
export interface InvoiceTransactionResponse {
  id: string; // Un identifiant unique pour la facture, peut être le numéro de facture
  service: "CIE" | "SODECI" | "Canal+"; // Le nom du service ou prestataire
  invoiceNumber: string; // Le numéro de facture
  amount: number; // Le montant total à payer
  currency: string; // La devise, par exemple 'XOF'
  dueDate: string; // La date d'échéance de la facture
  status: string; // Le statut de la facture (voir le type ci-dessus)
  paymentDate?: string; // La date de paiement, optionnelle car non présente si la facture n'est pas payée
}
