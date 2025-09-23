// import type { StockFiltersPayload, StockMovementFiltersPayload } from '../global.type'

import type { StockFiltersPayload } from "./stock-type";

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
    { q: payload.q },
    { status: payload.status },
    { dates: payload.dates },
   
  ],

}