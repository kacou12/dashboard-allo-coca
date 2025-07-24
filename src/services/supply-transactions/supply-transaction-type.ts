export type SupplyTransactionResponse = {
  id: string; // Unique identifier for the pending request (e.g., transaction ID)
  sender: {
    name: string; // e.g., "Philippe Jeans", "Natali Craig"
    id: string; // e.g., "2521586"
    avatar_url: string; // URL to the sender's profile picture
  };
  beneficiary_bank: {
    accountNumberMasked: string; // e.g., "0123456789123456" (assuming this is an account number or similar identifier)
    image_url: string; // URL to the beneficiary's icon/logo (e.g., the Ecobank logo shown)
  };
  created_at: string; // e.g., "Aujourd'hui à 08h30" or "07/08/2023 à 08h30" - recommend using ISO string for consistency
  amount: string; // e.g., "10 000 000 F CFA" - recommend using number and currency for parsing
  transaction_id: string; // e.g., "XDZ87OL534"
  // TransactionStatusEnum
  status: string
};

export type SupplyTransactionPayload = {
  amount?: number
  bank?: string
  file_url?: File
}