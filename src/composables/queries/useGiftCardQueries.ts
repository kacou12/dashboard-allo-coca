import { giftCardsQueryKeys } from '@/services/giftcard/giftcard-query-keys'

import {
  fetchAllGiftCards,
  fetchFiltersGiftCards,
  fetchFiltersGiftCardStats,
} from '@/services/giftcard/giftcard-service'
import type { DefaultFiltersPayload } from '@/services/global.type'
import { useCountryStore } from '@/stores/useCountryStore'
import { useGiftCardFiltersStore } from '@/stores/useGiftCardStore'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'

const { currentCountry: country } = storeToRefs(useCountryStore())
const useFilters = storeToRefs(useGiftCardFiltersStore())

export function useGiftCardsFiltersQuery() {
  // const initialFilters: DefaultFiltersPayload = {
  //   q: '',
  //   page: 1,
  //   dates: [new Date(), new Date()],
  // }

  // const filters = reactive<DefaultFiltersPayload>({
  //   ...initialFilters,
  // })

  const query = useQuery({
    queryKey: computed(() =>
      giftCardsQueryKeys.giftCardsFilters({
        page: useFilters.page.value,
        q: useFilters.q.value,
        dates: useFilters.dates.value,
        status: useFilters.status.value,
        country_iso_code: country.value?.iso_code,
      }),
    ),

    queryFn: ({ signal }) =>
      fetchFiltersGiftCards({
        page: useFilters.page.value,
        q: useFilters.q.value,
        dates: useFilters.dates.value,
        status: useFilters.status.value,
        country_iso_code: country.value?.iso_code,
      }),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: useFilters.q.value,
      dates: useFilters.dates.value,
      status: useFilters.status.value,
    }),
    () => {
      useFilters.page.value = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    // filters,
  }
}

export function useGiftCardsStatsQuery(enabled: boolean = true) {
  // GiftCardFiltersStatusPayload

  const initialFilters: DefaultFiltersPayload = {
    q: '',
    page: 1,
    dates: [new Date(), new Date()],
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })
  const query = useQuery({
    enabled: enabled,
    queryKey: computed(() =>
      giftCardsQueryKeys.giftCardStatsFilters({
        ...filters,
        // country_code: country.value?.iso_code,
        country_iso_code: country.value?.iso_code,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersGiftCardStats({
        page: filters.page,
        start_date: filters.dates![0].toISOString(),
        end_date: filters.dates![1].toISOString(),
        // country_code: country.value?.iso_code,
        country_iso_code: country.value?.iso_code,
      }),
  })

  return {
    ...query,
    filters,
  }
}

export function useAllGiftCardsQuery() {
  // GiftCardFiltersStatusPayload

  const initialFilters = {
    q: '',
  }

  const filters = reactive({
    ...initialFilters,
  })
  const query = useQuery({
    refetchInterval: 50000,
    queryKey: computed(() =>
      giftCardsQueryKeys.giftCardStatsFilters({
        ...filters,
        // country_code: country.value?.iso_code,
        country_iso_code: country.value?.iso_code,
      }),
    ),
    queryFn: ({ signal }) => fetchAllGiftCards(),
  })

  return {
    ...query,
    filters,
  }
}
