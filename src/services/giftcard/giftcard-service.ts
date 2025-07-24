import type { GiftCardFiltersPayload, GiftCardFiltersStatusPayload } from '../global.type'
import {
  fetchAllGiftCardsApi,
  fetchFiltersGiftCardsApi,
  fetchFiltersGiftCardStatsApi,
} from './giftcard-api'
import type {
  GiftCardResponse,
  GiftCardStatsResponse,
  GiftCardTransactionResponse,
} from './giftcard-type'

export async function fetchFiltersGiftCards(
  payload: GiftCardFiltersPayload,
): Promise<PaginationResponse<GiftCardTransactionResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersGiftCardsApi({
      payload,
    })

    let customData = res?.data;

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime(); // dateB - dateA pour le plus récent au plus ancien
    });


    return customData;
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchFiltersGiftCardStats(
  payload: GiftCardFiltersStatusPayload,
): Promise<GiftCardStatsResponse | undefined> {
  try {
    const res = await fetchFiltersGiftCardStatsApi({
      payload,
    })

    if (res!.data!.total_gift_cards_group_by_brand == null) {
      res!.data!.total_gift_cards_group_by_brand = []
    }

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function fetchAllGiftCards(): Promise<GiftCardResponse[] | undefined> {
  try {
    const res = await fetchAllGiftCardsApi()

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
