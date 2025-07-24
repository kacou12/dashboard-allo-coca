import type {
  OperationLogFiltersPayload,
  TransactionFiltersPayload,
  UserFiltersPayload,
} from '@/services/global.type'
import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCountryStore } from './useCountryStore'

const initialFilters: OperationLogFiltersPayload = {
  q: undefined,
  page: 1,
  limit: 10,
  trace_id: undefined,
  user_email: undefined,
  user_phone: undefined,
  method: undefined,
  path: undefined,
  status: undefined,
  dates: [new Date(), new Date()],
  // start_date: undefined,
  // end_date: undefined,
}

export const useOperationLogFiltersStore = defineStore('operatorLogFilters', () => {
  const q = ref(initialFilters.q)
  const page = ref(initialFilters.page)
  const trace_id = ref(initialFilters.trace_id)
  const user_email = ref(initialFilters.user_email)
  const user_phone = ref(initialFilters.user_phone)
  const method = ref(initialFilters.method)
  const path = ref(initialFilters.path)
  const status = ref(initialFilters.status)
  const limit = ref(initialFilters.limit)
  const dates = ref(initialFilters.dates)

  const route = useRoute()

  watch(
    () => route.name,
    (n, o) => {
      if (
        q.value != initialFilters.q ||
        page.value != initialFilters.page ||
        trace_id.value != initialFilters.trace_id ||
        user_email.value != initialFilters.user_email ||
        user_phone.value != initialFilters.user_phone ||
        method.value != initialFilters.method ||
        path.value != initialFilters.path ||
        status.value != initialFilters.status ||
        limit.value != initialFilters.limit ||
        dates.value != initialFilters.dates
      ) {
        q.value = initialFilters.q
        page.value = initialFilters.page
        trace_id.value = initialFilters.trace_id
        user_email.value = initialFilters.user_email
        user_phone.value = initialFilters.user_phone
        method.value = initialFilters.method
        path.value = initialFilters.path
        status.value = initialFilters.status
        limit.value = initialFilters.limit
        dates.value = initialFilters.dates
      }
    },
  )

  return {
    q,
    page,
    trace_id,
    user_email,
    user_phone,
    method,
    path,
    status,
    limit,
    dates,
  }
})
