import { getMidnightToday } from '@/lib/utils'
import { fetchFiltersDashboard } from '@/services/allococa/dashboard/dashboard-service'
import { dashboardQueryKeys } from '@/services/dashboard/dashboard-query-keys'

import type { DashboardFiltersPayload } from '@/services/global.type'
import { useCountryStore } from '@/stores/useCountryStore'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'

const { currentCountry: country } = storeToRefs(useCountryStore())
export function useDashBoardFiltersQuery() {
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
        country_iso_code: country.value?.iso_code,
        // country_code: country.value?.code,
        // country_code: 'CI',
      })
    }),

    queryFn: ({ signal }) => {
      return fetchFiltersDashboard({
        ...filters,
        // country_code: country.value?.iso_code,
        country_iso_code: country.value?.iso_code,
        // country_code: 'CI',
      })
    },
  })
  // si les autres filtre a part la page change , on reset la page courante
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
