import type { TransactionFiltersPayload } from '../global.type'

export const transactionQueryKeys = {
  // admins: (country: string) => ['admins', country],
  transaction: ({ id, country }: { id: string; country: string }) => [
    'transaction',
    { id },
    { country },
  ],
  transactionPagination: (page: number) => ['transaction', { page }],
  transactionFilters: (payload: TransactionFiltersPayload) => [
    'transactionFilters',
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
    { has_relaunch_payment: payload.has_relaunch_payment },
  ],
  transactionFailedFilters: (payload: TransactionFiltersPayload) => [
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
