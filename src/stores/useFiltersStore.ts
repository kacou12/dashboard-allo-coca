import type { UserFiltersPayload } from '@/services/global.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const initialFilters: UserFiltersPayload = {
  q: undefined,
  page: 1,
  sort_by: undefined,
  active: undefined,
  sort_order: undefined,
  name_filter: undefined,
  phone_verified: undefined,
}

export const useFiltersStore = defineStore('usersfilters', () => {
  const q = ref(initialFilters.q)
  const page = ref(initialFilters.page)
  const sort_by = ref(initialFilters.sort_by)
  const active = ref(initialFilters.active)
  const sort_order = ref(initialFilters.sort_order)
  const name_filter = ref(initialFilters.name_filter)
  const phone_verified = ref(initialFilters.phone_verified)

  const route = useRoute()

  watch(
    () => route.name,
    (n, o) => {
      if (
        q.value != initialFilters.q ||
        page.value != initialFilters.page ||
        sort_by.value != initialFilters.sort_by ||
        active.value != initialFilters.active ||
        sort_order.value != initialFilters.sort_order ||
        phone_verified.value != initialFilters.phone_verified ||
        name_filter.value != initialFilters.name_filter
      ) {
        q.value = initialFilters.q
        page.value = initialFilters.page
        sort_by.value = initialFilters.sort_by
        active.value = initialFilters.active
        sort_order.value = initialFilters.sort_order
        name_filter.value = initialFilters.name_filter
        phone_verified.value = initialFilters.phone_verified
      }
    },
  )

  return {
    q,
    page,
    sort_by,
    active,
    sort_order,
    name_filter,
    phone_verified,
  }
})
