import type { GiftCardFiltersPayload } from '@/services/global.type'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const initialFilters: GiftCardFiltersPayload = {
  q: undefined,
  page: 1,
  status: undefined,
  dates: [new Date(), new Date()],
}

export const useGiftCardFiltersStore = defineStore('GiftCardFilters', () => {
  const q = ref(initialFilters.q)
  const page = ref(initialFilters.page)
  const status = ref(initialFilters.status)
  const dates = ref(initialFilters.dates)

  const route = useRoute()

  watch(
    () => route.name,
    (n, o) => {
      if (
        q.value != initialFilters.q ||
        page.value != initialFilters.page ||
        status.value != initialFilters.status ||
        dates.value != initialFilters.dates
      ) {
        q.value = initialFilters.q
        page.value = initialFilters.page
        status.value = initialFilters.status
        dates.value != initialFilters.dates
      }
    },
  )

  return {
    q,
    page,
    status,
    dates,
  }
})
