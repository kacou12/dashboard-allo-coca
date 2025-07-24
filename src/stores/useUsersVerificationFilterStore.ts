import type { UserVerificationFiltersPayload } from '@/services/global.type'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const initialFilters: UserVerificationFiltersPayload = {
  q: undefined,
  page: 1,
  dates: [new Date(), new Date()],
}

export const useUsersVerificationFiltersStore = defineStore('userVerificationfilters', () => {
  const q = ref(initialFilters.q)
  const page = ref(initialFilters.page)
  const typeDoc = ref(initialFilters.typeDoc)
  const status = ref(initialFilters.status)
  const dates = ref(initialFilters.dates)

  const route = useRoute()

  watch(
    () => route.name,
    (n, o) => {
      if (
        q.value != initialFilters.q ||
        page.value != initialFilters.page ||
        typeDoc.value != initialFilters.typeDoc ||
        status.value != initialFilters.status ||
        dates.value != initialFilters.dates
      ) {
        q.value = initialFilters.q
        page.value = initialFilters.page
        typeDoc.value = initialFilters.typeDoc
        status.value = initialFilters.status
        dates.value = initialFilters.dates
      }
    },
  )

  return {
    q,
    page,
    status,
    typeDoc,
    dates,
  }
})
