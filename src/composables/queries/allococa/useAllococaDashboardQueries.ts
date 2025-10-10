import { getMidnightToday } from '@/lib/utils'
import { dashboardQueryKeys } from '@/services/allococa/dashboard/dashboard-query-keys'
import { fetchDashboardStats, fetchFiltersDashboard } from '@/services/allococa/dashboard/dashboard-service'

import type { DashboardFiltersPayload } from '@/services/global.type'
import { useQuery } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

// const { currentCountry: country } = storeToRefs(useCountryStore())

export function useAllococaDashboardFiltersQuery() {
  const initialFilters: DashboardFiltersPayload = {
    dates: [getMidnightToday(), new Date()],
  }

  const filters = reactive<DashboardFiltersPayload>({
    ...initialFilters,
  })

  const query = useQuery({
    queryKey: computed(() => {
      return dashboardQueryKeys.dashboardsFilters({
        ...filters,
        // country_iso_code: country.value?.iso_code,
      })
    }),

    queryFn: ({ signal }) => {
      return fetchFiltersDashboard({
        ...filters,
        // country_iso_code: country.value?.iso_code,
      })
    },
  })

  watch(
    () => ({
      dates: filters.dates,
    }),
    () => {
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filters,
  }
}

export function useAllococaDashboardStatsQuery() {
  const query =  useQuery({
    queryKey: dashboardQueryKeys.dashboardStats,
    queryFn: ({ signal }) => fetchDashboardStats(),
  })
  return {
    ...query
  }
}