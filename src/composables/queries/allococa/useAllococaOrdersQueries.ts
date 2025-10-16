import { getMidnightToday } from '@/lib/utils'
import { orderQueryKeys } from '@/services/allococa/orders/order-query-keys'
import { fetchFiltersOrders, updateOrderStatus } from '@/services/allococa/orders/order-service'

import type { OrderFiltersPayload } from '@/services/allococa/orders/order-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'


/**
 * Returns a new Date object representing the date from 7 days ago.
 * @returns {Date} The date 7 days ago.
 */
function getSomeDaysAgoDate(days:number) {
    let date = new Date(); 
    // Soustrait 7 jours
    date.setDate(date.getDate() - days); 
    return date;
}

const initialFilters: OrderFiltersPayload = {
  search: undefined,
  page: 1,
  limit: 7,
  dates: [getSomeDaysAgoDate(7), new Date()],
  status: undefined,
}

const filters = reactive<OrderFiltersPayload>({
  ...initialFilters,
})
export function useAllococaOrdersFiltersQuery() {
  const queryClient = useQueryClient()
  
  const query = useQuery({
    queryKey: computed(() => {
      return orderQueryKeys.orderFilters(filters)
    }),

    queryFn: ({ signal }) => {
      return fetchFiltersOrders(filters)
    },
  })

    const invalidateQuery = () => {
      queryClient.invalidateQueries({
        queryKey: orderQueryKeys.orderFilters(filters),
      })
    }

  watch(
    () => ({
      q: filters.search,
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
    invalidateQuery
  }
}

export function useUpdateOrderStatusMutation(order_id: string) {
  const { invalidateQuery } = useAllococaOrdersFiltersQuery()
  return useMutation({
    mutationFn: (status: string) =>
      updateOrderStatus({status, order_id}),

    onSuccess: () => {
      console.log('update order status successfully')

      invalidateQuery()
    },
  })
}