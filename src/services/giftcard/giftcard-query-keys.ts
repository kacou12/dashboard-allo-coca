// import type { AdminFiltersPayload } from './country-type'

import type {
  DefaultFiltersPayload,
  GiftCardFiltersPayload,
  GiftCardStatsFiltersPayload,
} from '../global.type'

export const giftCardsQueryKeys = {
  // admins: (country: string) => ['admins', country],
  giftcards: ['giftcards'],
  giftCardsFilters: (payload: GiftCardFiltersPayload) => [
    'giftcards',
    { page: payload.page },
    { q: payload.q },
    { dates: payload.dates },
    { status: payload.status },
    { country_iso_code: payload.country_iso_code },
    // {country: payload.country},
  ],
  giftCardStatsFilters: (payload: GiftCardStatsFiltersPayload) => [
    'giftcardStats',
    { dates: payload.dates },
    { country_iso_code: payload.country_iso_code },
  ],
  allGiftCards: (q: string) => ['allGiftCardsss', { q }],
}
