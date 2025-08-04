// Définition du type pour les détails d'une facture (existant)
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

// Nouveau type pour le payload de création/paiement de facture
export type InvoiceTransactionPayload = {
  invoiceNumber?: string;
  amount?: number;
  service?: "CIE" | "SODECI" | "Canal+";
  dueDate?: string;
  invoiceId?: string; // Pour le paiement d'une facture existante
};

// Type pour les filtres de recherche de factures
export type InvoiceFiltersPayload = {
  limit: number;
  page: number;
  q?: string; // Recherche par numéro de facture ou service
  status?: string;
  service?: "CIE" | "SODECI" | "Canal+";
  country_iso_code?: string;
  dueDate?: string; // Filtrer par date d'échéance
  paymentDate?: string; // Filtrer par date de paiement
};

// Type pour les détails étendus d'une facture
export interface InvoiceTransactionDetailResponse
  extends InvoiceTransactionResponse {
  customerInfo?: {
    name: string;
    address: string;
    customerNumber: string;
  };
  serviceDetails?: {
    previousBalance?: number;
    currentBalance?: number;
    consumptionPeriod?: {
      from: string;
      to: string;
    };
  };
  paymentHistory?: Array<{
    id: string;
    amount: number;
    paymentDate: string;
    method: string;
    status: string;
  }>;
}

// Enum pour les statuts de facture
export enum InvoiceTransactionStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  PAID = "PAID",
  FAILED = "FAILED",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

// Type pour les services disponibles
export type InvoiceService = {
  id: string;
  name: string;
  code: "CIE" | "SODECI" | "Canal+";
  image: string;
  color: string;
  description?: string;
};
