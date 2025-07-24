// import type { AdminFiltersPayload } from './country-type'

import type { DefaultFiltersPayload } from '../global.type'

export const countryQueryKeys = {
  // admins: (country: string) => ['admins', country],
  countries: ['countries'],
  countriesFilters: (payload: DefaultFiltersPayload) => [
    'countries',
    { page: payload.page },
    { q: payload.q },
  ],
}
