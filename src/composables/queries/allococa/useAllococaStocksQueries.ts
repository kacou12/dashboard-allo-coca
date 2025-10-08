import { getMidnightToday } from '@/lib/utils'
import { stockQueryKeys } from '@/services/allococa/stocks/stock-query-keys'
import {
  createStock,
  createProductVariantStock,
  deleteProductVariantStock,
  fetchFiltersProductVariantStock,
  fetchFiltersStock,
  fetchProductVariantStockById,
  updateStock,
  updateStockStatus,
  updateProductVariantStock,
  updateProductVariantStockStatus,
} from '@/services/allococa/stocks/stock-service'

import type {
  StockCreatePayload,
  StockFiltersPayload,
  StockProductVariantCreatePayload,
  StockProductVariantFiltersPayload,
  StockProductVariantUpdatePayload,
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

export function useAllococaProductVariantStockByIdQuery(id: string) {
  return useQuery({
    queryKey: stockQueryKeys.productVariantStockById(id),
    queryFn: () => fetchProductVariantStockById(id),
    enabled: !!id,
  })
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

export function useCreateAllococaProductVariantStockMutation(productId: string) {
  const { invalidateQuery } = useAllococaPoductVariantStocksFiltersQuery(productId)
  return useMutation({
    mutationFn: (data: StockProductVariantCreatePayload) => createProductVariantStock({ data }),

    onSuccess: () => {
      console.log('create product variant stock successfully')
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

export function useUpdateAllococaProductVariantStockMutation(productId: string, variantId: string) {
  const queryClient = useQueryClient()
  const { invalidateQuery } = useAllococaPoductVariantStocksFiltersQuery(productId)
  return useMutation({
    mutationFn: (data: StockProductVariantUpdatePayload) => updateProductVariantStock({ id: variantId, data }),

    onSuccess: () => {
      console.log('update product variant stock successfully')
      invalidateQuery()
      queryClient.invalidateQueries({ queryKey: stockQueryKeys.productVariantStockById(variantId) })
    },
  })
}

export function useUpdateAllococaProductVariantStockStatusMutation(productId: string, variantId: string) {
  const queryClient = useQueryClient()
  const { invalidateQuery } = useAllococaPoductVariantStocksFiltersQuery(productId)
  return useMutation({
    mutationFn: (data: StockStatusUpdatePayload) => updateProductVariantStockStatus({ id: variantId, data }),

    onSuccess: () => {
      console.log('update product variant stock status successfully')
      invalidateQuery()
      queryClient.invalidateQueries({ queryKey: stockQueryKeys.productVariantStockById(variantId) })
    },
  })
}

export function useDeleteAllococaProductVariantStockMutation(productId: string) {
  const { invalidateQuery } = useAllococaPoductVariantStocksFiltersQuery(productId)
  return useMutation({
    mutationFn: (id: string) => deleteProductVariantStock(id),
    onSuccess: () => {
      console.log('delete product variant stock successfully')
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