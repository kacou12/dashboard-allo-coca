import type { OrderFiltersPayload } from "./order-type";


export const orderQueryKeys = {
  order: ({ id, commune }: { id: string; commune: string }) => [
    'order',
    { id },
    { commune },
  ],
  orderPagination: (page: number) => ['order', { page }],
  orderFilters: (payload: OrderFiltersPayload) => [
    'orderFilters',
    { limit: payload.limit },
    { page: payload.page },
    { q: payload.q },
    { dates: payload.dates },
    { status: payload.status },
  ],
//   orderStatusFilters: (payload: OrderFiltersPayload, status: string) => [
//     'orderStatusFilters',
//     status,
//     { limit: payload.limit },
//     { page: payload.page },
//     { q: payload.q },
//     { customer_name: payload.customer_name },
//     { contact_client: payload.contact_client },
//     { commune: payload.commune },
//     { status: payload.status },
//     { order_number: payload.order_number },
//     { order_date_from: payload.order_date_from },
//     { order_date_to: payload.order_date_to },
//   ],
}