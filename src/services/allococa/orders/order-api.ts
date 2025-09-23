import { env } from '@/config/env'
// import type { OrderFiltersPayload } from '../global.type'
// import { Http } from '../Http'
import { OrderRouteApi } from './order-constants'
import type {
  OrderResponse,
  OrderStatusUpdatePayload,
  OrderUpdatePayload,
  OrderCreatePayload,
  OrderFiltersPayload,
} from './order-type'
import { mockOrdersResponse } from '@/mocks/allococa/order.mock.response'
import { Http } from '@/services/Http'
// import { mockOrdersResponse } from '@/mocks/order.mock.response'

export async function fetchFiltersOrdersApi({
  payload,
}: {
  payload: OrderFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<OrderResponse>> | undefined> {
  if (env.VITE_MOCK_API == 'true') {
    // TODO: remove this once you have auth
    return Promise.resolve(mockOrdersResponse as SuccessResponse<PaginationResponse<OrderResponse>>) ;
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<OrderResponse>>>(
    OrderRouteApi.filter,
    payload,
  )

  return result
}

