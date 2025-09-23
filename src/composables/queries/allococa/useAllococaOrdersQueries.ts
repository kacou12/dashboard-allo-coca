import { getMidnightToday } from '@/lib/utils'
import { orderQueryKeys } from '@/services/allococa/orders/order-query-keys'
import { fetchFiltersOrders } from '@/services/allococa/orders/order-service'

import type { OrderFiltersPayload } from '@/services/allococa/orders/order-type'
import { useQuery } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

export function useAllococaOrdersFiltersQuery() {
  const initialFilters: OrderFiltersPayload = {
    q: undefined,
    page: 1,
    limit: 10,
    dates: [getMidnightToday(), new Date()],
    status: undefined,
  }

  const filters = reactive<OrderFiltersPayload>({
    ...initialFilters,
  })

  const query = useQuery({
    queryKey: computed(() => {
      return orderQueryKeys.orderFilters(filters)
    }),

    queryFn: ({ signal }) => {
      return fetchFiltersOrders(filters)
    },
  })

  watch(
    () => ({
      q: filters.q,
      dates: filters.dates,
      status: filters.status,
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
  }
}