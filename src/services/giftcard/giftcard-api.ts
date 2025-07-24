import type {
  GiftCardFiltersPayload,
  GiftCardFiltersRequest,
  GiftCardFiltersStatusPayload,
} from '../global.type'
import { Http } from '../Http'
import { GiftCardRouteApi } from './giftcard-constants'
import type {
  GiftCardResponse,
  GiftCardStatsResponse,
  GiftCardTransactionResponse,
} from './giftcard-type'

export async function fetchFiltersGiftCardsApi({
  payload,
}: {
  payload: GiftCardFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<GiftCardTransactionResponse>> | undefined> {
  payload.dates![0].setHours(0, 0, 0, 0)
  payload.dates![1].setHours(23, 59, 59, 59)

  const formatPayload: GiftCardFiltersRequest = {
    start_date: payload.dates![0].toISOString(),
    end_date: payload.dates![1].toISOString(),
    country_iso_code: payload.country_iso_code,
    page: payload.page,
    q: payload.q,
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<GiftCardTransactionResponse>>>(
    // AdminRouteApi.filter,
    GiftCardRouteApi.getAllTranxactions,
    formatPayload,
  )

  return result
}

export async function fetchAllGiftCardsApi(): Promise<
  SuccessResponse<GiftCardResponse[]> | undefined
> {
  const result = await Http.get<SuccessResponse<GiftCardResponse[]>>(
    // AdminRouteApi.filter,
    GiftCardRouteApi.getAll,
  )

  return result
}

export async function fetchFiltersGiftCardStatsApi({
  payload,
}: {
  payload: GiftCardFiltersStatusPayload
}): Promise<SuccessResponse<GiftCardStatsResponse> | undefined> {
  const startDate = new Date(payload.start_date)
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(payload.end_date)
  endDate.setHours(23, 59, 59, 999)

  payload.start_date = startDate.toISOString()
  payload.end_date = endDate.toISOString()

  const result = await Http.get<SuccessResponse<GiftCardStatsResponse>>(
    `${GiftCardRouteApi.getStats}`,
    payload,
  )

  return result
}
