import type { InvoiceFiltersPayload } from "./invoice-transaction-type-extended";

export const invoiceTransactionQueryKeys = {
  invoiceTransaction: ({ id, country }: { id: string; country: string }) => [
    "invoiceTransaction",
    { id },
    { country },
  ],
  invoiceTransactionPagination: (page: number) => [
    "invoiceTransactionPagination",
    { page },
  ],
  invoiceTransactionFilters: (payload: InvoiceFiltersPayload) => [
    "invoiceTransactionFilters",
    { limit: payload.limit },
    { page: payload.page },
    { q: payload.q },
    { status: payload.status },
    { service: payload.service },
    { service: payload.service },
    { country_iso_code: payload.country_iso_code },
  ],
};
