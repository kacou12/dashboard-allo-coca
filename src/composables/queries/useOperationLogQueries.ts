import { operationLogsQueryKeys } from '@/services/operation-logs/operation-log-query-keys'
import {
  fetchFiltersOperationLogs,
  fetchOperationLogById,
} from '@/services/operation-logs/operation-log-service'
import { useCountryStore } from '@/stores/useCountryStore'
import { useOperationLogFiltersStore } from '@/stores/useOperatorLogFilterStore'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

const { currentCountry: country } = storeToRefs(useCountryStore())
const operationLogFilters = storeToRefs(useOperationLogFiltersStore())

export function useOperationLogsFiltersQuery() {
  const queryClient = useQueryClient()
  // const initialFilters: TransactionFiltersPayload = {
  //   q: undefined,
  //   page: 1,
  //   beneficiary_provider: undefined,
  //   payer_provider: undefined,
  //   status: undefined,
  //   type: undefined,
  //   user_id: user_id,
  //   limit: 7,
  // }

  // const filters = reactive<TransactionFiltersPayload>({
  //   ...initialFilters,
  // })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: operationLogsQueryKeys.operationLogsFilters({
        limit: operationLogFilters!.limit.value,
        page: operationLogFilters?.page.value,
        q: operationLogFilters?.q.value,
        method: operationLogFilters?.method.value,
        path: operationLogFilters?.path.value,
        trace_id: operationLogFilters?.trace_id.value,
        user_email: operationLogFilters?.user_email.value,
        user_phone: operationLogFilters?.user_phone.value,
        dates: operationLogFilters?.dates.value,
        status: operationLogFilters?.status.value,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      operationLogsQueryKeys.operationLogsFilters({
        limit: operationLogFilters!.limit.value,
        page: operationLogFilters?.page.value,
        q: operationLogFilters?.q.value,
        method: operationLogFilters?.method.value,
        path: operationLogFilters?.path.value,
        trace_id: operationLogFilters?.trace_id.value,
        user_email: operationLogFilters?.user_email.value,
        user_phone: operationLogFilters?.user_phone.value,
        dates: operationLogFilters?.dates.value,
        status: operationLogFilters?.status.value,
      }),
    ),

    queryFn: ({ signal }) =>
      fetchFiltersOperationLogs({
        limit: operationLogFilters!.limit.value,
        page: operationLogFilters?.page.value,
        q: operationLogFilters?.q.value,
        method: operationLogFilters?.method.value,
        path: operationLogFilters?.path.value,
        trace_id: operationLogFilters?.trace_id.value,
        user_email: operationLogFilters?.user_email.value,
        user_phone: operationLogFilters?.user_phone.value,
        dates: operationLogFilters?.dates.value,
        status: operationLogFilters?.status.value,
      }),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      limit: operationLogFilters!.limit.value,
      // page: operationLogFilters?.page.value,
      q: operationLogFilters?.q.value,
      method: operationLogFilters?.method.value,
      path: operationLogFilters?.path.value,
      trace_id: operationLogFilters?.trace_id.value,
      user_email: operationLogFilters?.user_email.value,
      user_phone: operationLogFilters?.user_phone.value,
      dates: operationLogFilters?.dates.value,
      status: operationLogFilters?.status.value,
    }),
    () => {
      operationLogFilters.page.value = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    // filters,
    invalidateQuery,
  }
}

export function useUserOperationLogsQuery(id: string) {
  return useQuery({
    queryKey: computed(() => operationLogsQueryKeys.operationLog(id)),
    queryFn: ({ signal }) => fetchOperationLogById(id),
    // enabled: false,
  })
}
