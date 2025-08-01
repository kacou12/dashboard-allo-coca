import type { SupplyFiltersPayload, TransactionFiltersPayload } from '../global.type'

export const supplyTransactionQueryKeys = {
  // admins: (country: string) => ['admins', country],
  supplyTransaction: ({ id, country }: { id: string; country: string }) => [
    'supplyTransaction',
    { id },
    { country },
  ],
  supplyTransactionPagination: (page: number) => ['supplyTransactionPagination', { page }],
  supplyTransactionFilters: (payload: SupplyFiltersPayload) => [
    'supplyTransactionFilters',
    { limit: payload.limit },
    { page: payload.page },
    { q: payload.q },
    { status: payload.status },
    { type: payload.type },
    { country_iso_code: payload.country_iso_code },
    ],
  supplyTransactionFailedFilters: (payload: TransactionFiltersPayload) => [
    'transactionFailedFilters',
    'failed',
    { limit: payload.limit },
    { page: payload.page },
    { q: payload.q },
    { beneficiary_provider: payload.beneficiary_provider },
    { payer_provider: payload.payer_provider },
    { status: payload.status },
    { type: payload.type },
    { user_id: payload.user_id },
    { country_iso_code: payload.country_iso_code },
    { beneficiary_country_iso_code: payload.beneficiary_country_iso_code },
    // {has_relaunch_payment: payload.has_relaunch_payment}
  ],
}
