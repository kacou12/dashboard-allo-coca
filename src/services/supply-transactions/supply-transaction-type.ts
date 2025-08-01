export type SupplyTransactionResponse = {
  id: string;
  sender: {
    name: string; // e.g., "Philippe Jeans", "Natali Craig"
    id: string; // e.g., "2521586"
    avatar_url: string; // URL to the sender's profile picture
  };
  beneficiary_bank: {
    accountNumberMasked: string; // e.g., "0123456789123456" (assuming this is an account number or similar identifier)
    image_url: string; // URL to the beneficiary's icon/logo (e.g., the Ecobank logo shown)
  };
  created_at: string; // iso date
  amount: number; //
  transaction_id: string; // e.g., "XDZ87OL534"
  // TransactionStatusEnum
  status: string; // Pending , Processing, Successful, Failed
};

export type SupplyTransactionPayload = {
  amount?: number;
  bank?: string;
  file_url?: File;
};

export const SupplyTransactionBankEnum = Object.freeze({
  ECOBANK: {
    value: "Ecobank",
    name: "Ecobank",
    image_url: "src/assets/images/banks/ecobank.png",
  },
  SOCIETE_GENERALE: {
    value: "SOCIETE_GENERALE",
    image_url: "src/assets/images/banks/societe-generale.png",
  },
  BANQUE_ATLANTIQUE: {
    value: "BANQUE_ATLANTIQUE",
    image_url: "src/assets/images/banks/bank-generale.jpg",
  },
});
export type SupplyBank = {
  id: number;
  name: string;
  bankNumber: string;
  image: string;
};
