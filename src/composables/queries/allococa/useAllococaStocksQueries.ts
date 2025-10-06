import { getMidnightToday } from '@/lib/utils'
import { stockQueryKeys } from '@/services/allococa/stocks/stock-query-keys'
import {
  createStock,
  fetchFiltersProductVariantStock,
  fetchFiltersStock,
  updateStock,
  updateStockStatus,
} from '@/services/allococa/stocks/stock-service'

import type {
  StockCreatePayload,
  StockFiltersPayload,
  StockProductVariantFiltersPayload,
  StockStatusUpdatePayload,
  StockUpdatePayload,
} from '@/services/allococa/stocks/stock-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

const initialFiltersStock: StockFiltersPayload = {
  search: undefined,
  page: 1,
  limit: 10,
  dates: [getMidnightToday(), new Date()],
  status: undefined,
}
const initialFiltersProductVariantStock: StockProductVariantFiltersPayload = {
  search: undefined,
  page: 1,
  limit: 10,
  product_id: undefined,
  dates: [getMidnightToday(), new Date()],
  status: undefined,
}

const filtersStock = reactive<StockFiltersPayload>({
  ...initialFiltersStock,
})
const filtersProductVariantStock = reactive<StockProductVariantFiltersPayload>({
  ...initialFiltersProductVariantStock,
})
export function useAllococaStocksFiltersQuery() {
  const queryClient = useQueryClient()


  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: stockQueryKeys.stockFilters(filtersStock),
    })
  }

  const query = useQuery({
    queryKey: computed(() => stockQueryKeys.stockFilters(filtersStock)),

    queryFn: ({ signal }) => fetchFiltersStock(filtersStock),
  })

  watch(
    () => ({
      search: filtersStock.search,
      dates: filtersStock.dates,
      status: filtersStock.status,
    }),
    () => {
      filtersStock.page = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filtersStock,
    invalidateQuery,
  }
}

export function useAllococaPoductVariantStocksFiltersQuery(productId: string) {
  const queryClient = useQueryClient()
  filtersProductVariantStock.product_id = productId


  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: stockQueryKeys.productVariantStockFilters(filtersProductVariantStock),
    })
  }

  const query = useQuery({
    queryKey: computed(() => stockQueryKeys.productVariantStockFilters(filtersProductVariantStock)),

    queryFn: ({ signal }) => fetchFiltersProductVariantStock(filtersProductVariantStock),
  })

  watch(
    () => ({
      search: filtersProductVariantStock.search,
      dates: filtersProductVariantStock.dates,
      status: filtersProductVariantStock.status,
    }),
    () => {
      filtersProductVariantStock.page = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filtersProductVariantStock,
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