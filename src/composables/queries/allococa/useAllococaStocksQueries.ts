import { getMidnightToday } from '@/lib/utils'
import { stockQueryKeys } from '@/services/allococa/stocks/stock-query-keys'
import {
  createStock,
  fetchFiltersStock,
  updateStock,
  updateStockStatus,
} from '@/services/allococa/stocks/stock-service'

import type {
  StockCreatePayload,
  StockFiltersPayload,
  StockStatusUpdatePayload,
  StockUpdatePayload,
} from '@/services/allococa/stocks/stock-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

export function useAllococaStocksFiltersQuery() {
  const queryClient = useQueryClient()

  const initialFilters: StockFiltersPayload = {
    q: undefined,
    page: 1,
    limit: 10,
    dates: [getMidnightToday(), new Date()],
    status: undefined,
  }

  const filters = reactive<StockFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: stockQueryKeys.stockFilters(filters),
    })
  }

  const query = useQuery({
    queryKey: computed(() => stockQueryKeys.stockFilters(filters)),

    queryFn: ({ signal }) => fetchFiltersStock(filters),
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
    invalidateQuery,
  }
}

export function useCreateAllococaStockMutation() {
  const { invalidateQuery } = useAllococaStocksFiltersQuery()
  return useMutation({
    mutationFn: (data: StockCreatePayload) => createStock({ data }),

    onSuccess: () => {
      console.log('create stock successfully')
      invalidateQuery()
    },
  })
}

export function useUpdateAllococaStockMutation(id: string) {
  const { invalidateQuery } = useAllococaStocksFiltersQuery()
  return useMutation({
    mutationFn: (data: StockUpdatePayload) => updateStock({ id, data }),

    onSuccess: () => {
      console.log('update stock successfully')
      invalidateQuery()
    },
  })
}

export function useUpdateAllococaStockStatusMutation(id: string) {
  const { invalidateQuery } = useAllococaStocksFiltersQuery()
  return useMutation({
    mutationFn: (data: StockStatusUpdatePayload) => updateStockStatus({ id, data }),

    onSuccess: () => {
      console.log('update stock status successfully')
      invalidateQuery()
    },
  })
}