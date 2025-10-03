// import type { AdminFiltersPayload } from './country-type'

import type { DashboardFiltersPayload } from "@/services/global.type";

export const dashboardQueryKeys = {
  // admins: (country: string) => ['admins', country],
  dashboards: ['dashboard'],
  dashboardStats: ['dashboardStats'],
  dashboardsFilters: (payload: DashboardFiltersPayload) => [
    'dashboardsFilters',
    { dates: payload.dates },
    { country_iso_code: payload.country_iso_code },
  ],
}
