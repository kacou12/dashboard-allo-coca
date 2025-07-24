import type { DefaultFiltersPayload, UserFiltersPayload } from '../global.type'

export const providersQueryKeys = {
  provider: ({ country, id }: { country: string; id: string }) => ['provider', { country }, { id }],
  providersPagination: (page: number, country: string) => ['provider', { page }, { country }],
  providersFilters: (payload: DefaultFiltersPayload) => [
    'providersFilters',
    { page: payload.page },
    { q: payload.q },
    { country_id: payload.country_id },
  ],
  serviceAvailability: ({ country }: { country: string }) => ['serviceAvailability', { country }],
}
