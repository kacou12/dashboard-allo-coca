import type { SupplyTransactionResponse } from "@/services/supply-transactions/supply-transaction-type";

export const mockSupplyTransactionsResponse: {
  code: number;
  msg: string;
  data: {
    total: number;
    has_next: boolean;
    items: SupplyTransactionResponse[];
  };
} = {
  code: 200,
  msg: "Transactions supplies successfully retrieved",
  data: {
    items: [
      {
        id: "1",
        sender: {
          name: "Philippe Jeans",
          id: "2521586",
          avatar_url: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        beneficiary_bank: {
          accountNumberMasked: "543210987654",
          image_url: "https://example.com/ecobank-logo.png",
        },
        created_at: "2025-07-31T10:00:00Z",
        amount: 500.5,
        transaction_id: "XDZ87OL534",
        status: "Successful",
      },
      {
        id: "2",
        sender: {
          name: "Natali Craig",
          id: "2521587",
          avatar_url: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        beneficiary_bank: {
          accountNumberMasked: "0123456789123456",
          image_url: "https://example.com/bceao-logo.png",
        },
        created_at: "2025-07-30T15:30:00Z",
        amount: 1200.75,
        transaction_id: "FGH45MN987",
        status: "Processing",
      },
      {
        id: "3",
        sender: {
          name: "John Doe",
          id: "2521588",
          avatar_url: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        beneficiary_bank: {
          accountNumberMasked: "0123456789127456",
          image_url: "https://example.com/bicici-logo.png",
        },
        created_at: "2025-07-29T08:15:00Z",
        amount: 75.0,
        transaction_id: "ABC123XYZ",
        status: "Failed",
      },
    ],
    has_next: false,
    total: 3,
  },
};
