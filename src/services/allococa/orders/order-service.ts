
import {
    fetchFiltersOrdersApi,
    updateOrderStatusApi
} from './order-api'
import type {
    OrderFiltersPayload,
    OrderResponse
} from './order-type'

export async function fetchFiltersOrders(
  payload: OrderFiltersPayload,
): Promise<PaginationResponse<OrderResponse> | undefined> {
  try {
    const res = await fetchFiltersOrdersApi({
      payload,
    })

    let customData = res?.data

    // Sort orders by order date (most recent first)
    customData?.items.sort((a, b) => {
      const dateA = new Date(a.order_date)
      const dateB = new Date(b.order_date)
      return dateB.getTime() - dateA.getTime()
    })

    return customData
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateOrderStatus({
  status,
  order_id
}: {
  status: string
  order_id: string
}): Promise<any | undefined> {
  try {
    const res = await updateOrderStatusApi({
      status: status,
      order_id: order_id
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
