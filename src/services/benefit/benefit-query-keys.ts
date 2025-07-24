// import type { AdminFiltersPayload } from './country-type'

import type { DashboardFiltersPayload, DefaultFiltersPayload } from '../global.type'

export const benefitQueryKeys = {
  // admins: (country: string) => ['admins', country],
  benefits: ['benefits'],
  benefitsFilters: (payload: DashboardFiltersPayload) => [
    'dashboards',
    { dates: payload.dates },
    { country_iso_code: payload.country_iso_code },
  ],
}
