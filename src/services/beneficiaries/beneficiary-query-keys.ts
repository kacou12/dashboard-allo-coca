import type { DefaultFiltersPayload } from '../global.type'

export const beneficiariesQueryKeys = {
  beneficiary: ({ id }: { id: string }) => ['beneficiary', { id }],
  beneficiariesPagination: (page: number) => ['beneficiaries', { page }],
  beneficiariesFilters: (payload: DefaultFiltersPayload) => [
    'beneficiaries',
    { page: payload.page },
    { q: payload.q },
  ],
}