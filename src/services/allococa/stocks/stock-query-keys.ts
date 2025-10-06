// import type { StockFiltersPayload, StockMovementFiltersPayload } from '../global.type'

import type { StockFiltersPayload, StockProductVariantFiltersPayload } from "./stock-type";

export const stockQueryKeys = {
  stock: ({ id, product_name }: { id: string; product_name: string }) => [
    'stock',
    { id },
    { product_name },
  ],
  stockPagination: (page: number) => ['stock', { page }],
  stockFilters: (payload: StockFiltersPayload) => [
    'stockFilters',
    { limit: payload.limit },
    { page: payload.page },
    { search: payload.search },
    { status: payload.status },
    { dates: payload.dates },
   
  ],
  productVariantStockFilters: (payload: StockProductVariantFiltersPayload) => [
    'productVariantStockFilters',
    { limit: payload.limit },
    { page: payload.page },
    { product_id: payload.product_id },
    { search: payload.search },
    { status: payload.status },
    { dates: payload.dates },
   
  ],

}