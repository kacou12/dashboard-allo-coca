import { benefitQueryKeys } from '@/services/benefit/benefit-query-keys'
import { fetchFiltersBenefits } from '@/services/benefit/benefit-service'

import type { DefaultFiltersPayload } from '@/services/global.type'
import { useCountryStore } from '@/stores/useCountryStore'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'

const { currentCountry: country } = storeToRefs(useCountryStore())

export function useBenefitsFiltersQuery() {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
    dates: [new Date(), new Date()],
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: benefitQueryKeys.benefitsFilters({
        ...filters,
        country_iso_code: country.value?.iso_code,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      benefitQueryKeys.benefitsFilters({
        ...filters,
        country_iso_code: country.value?.iso_code,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersBenefits({
        ...filters,
        country_iso_code: country.value?.iso_code,
      }),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: filters.q,
      // page: filters.page,
      dates: filters.dates,
    }),
    () => {
      filters.page = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filters,
    invalidateQuery,
  }
}
