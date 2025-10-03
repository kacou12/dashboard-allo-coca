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
  OrderFiltersRequest,
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

  let startDate = new Date()
  let endDate = new Date()
  if(payload.dates != null) {
     startDate = payload.dates![0]!
     endDate = payload.dates![1]!
    
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(23, 59, 59)
  }

  const data : OrderFiltersRequest = {
    search: payload.q,
    page: payload.page!,
    limit: payload.limit!,
    date_from: payload.dates == null ? undefined : startDate.toISOString(),
    date_to: payload.dates == null ? undefined : endDate.toISOString(),
    status: payload.status,
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<OrderResponse>>>(
    OrderRouteApi.filter,
    data,
  )

  return result
}

export async function updateOrderStatusApi({
  status,
  order_id
}: {
  status: string
  order_id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.patch<SuccessResponse<any>>(OrderRouteApi.updateStatus(order_id), {status})
}
