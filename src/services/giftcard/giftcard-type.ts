import type { CountryResponse } from '../country/country-type'

export type GiftCardResponse = {
  brand: string
  code: string
  created_at: string
  id: string
  image_url: string
  order_reference: string
  price_in_cfa: number
  product: string
  purchase_price: number
  serial: string
  updated_at: string
  x_id: string
}

export type GiftCardTransactionResponse = {
  amount: number
  beneficiary_country_iso_code: string
  beneficiary_name: string
  beneficiary_phone: string
  beneficiary_provider: BeneficiaryProvider
  beneficiary_provider_id: string
  cashin_fees: number
  cashout_fees: number
  created_at: string
  currency: string
  fees: number
  gift_card?: GiftCard
  gift_card_id: string
  id: string
  payer_country_code: string
  payer_name: string
  payer_pays_fees: boolean
  payer_phone: string
  payer_provider: PayerProvider
  payer_provider_id: string
  payment_status: string
  payment_transaction_id: string
  payment_url: string
  reference: string
  status: string
  transfer_status: string
  transfer_transaction_id: string
  type: string
  updated_at: string
  user?: User
  user_id: string
}

export interface BeneficiaryProvider {
  country: CountryResponse
  country_id: string
  created_at: string
  id: string
  image_url: string
  name: string
  service_availability: ServiceAvailability
  updated_at: string
  x_id: string
}

export interface ServiceAvailability {
  cashin_enabled: boolean
  cashin_issuer: CashinIssuer
  cashin_issuer_id: string
  cashout_enabled: boolean
  cashout_issuer: CashoutIssuer
  cashout_issuer_id: string
  created_at: string
  id: string
  provider: string
  provider_id: string
  updated_at: string
  x_id: string
}

export interface CashinIssuer {
  cashin_rate: number
  cashout_rate: number
  id: string
  name: string
  x_id: string
}

export interface CashoutIssuer {
  cashin_rate: number
  cashout_rate: number
  id: string
  name: string
  x_id: string
}

export interface GiftCard {
  brand: string
  code: string
  created_at: string
  id: string
  image_url: string
  order_reference: string
  price_in_cfa: number
  product: string
  purchase_price: number
  serial: string
  updated_at: string
  x_id: string
}

export interface PayerProvider {
  country: CountryResponse
  country_id: string
  created_at: string
  id: string
  image_url: string
  name: string
  service_availability: ServiceAvailability2
  updated_at: string
  x_id: string
}

export interface ServiceAvailability2 {
  cashin_enabled: boolean
  cashin_issuer: CashinIssuer2
  cashin_issuer_id: string
  cashout_enabled: boolean
  cashout_issuer: CashoutIssuer2
  cashout_issuer_id: string
  created_at: string
  id: string
  provider: string
  provider_id: string
  updated_at: string
  x_id: string
}

export interface CashinIssuer2 {
  cashin_rate: number
  cashout_rate: number
  id: string
  name: string
  x_id: string
}

export interface CashoutIssuer2 {
  cashin_rate: number
  cashout_rate: number
  id: string
  name: string
  x_id: string
}

export interface User {
  active: boolean
  avatar: string
  birthdate: string
  country: CountryResponse
  country_id: string
  created_at: string
  email: string
  email_verified: boolean
  firstname: string
  id: string
  lastname: string
  password: string
  phone: string
  phone_verified: boolean
  pin_code: string
  referral_code: string
  referred_by: string
  updated_at: string
  validated_phone_numbers: ValidatedPhoneNumber[]
  verification_status: string
  x_id: string
}

export interface ValidatedPhoneNumber {
  country_code: string
  created_at: string
  id: string
  name: string
  phone: string
  updated_at: string
  user_id: string
  validated: boolean
}

export interface GiftCardStatsResponse {
  count_gift_cards: number
  count_last_gift_cards: number
  last_total_amount_gift_cards: number
  total_amount_gift_cards: number
  total_gift_cards_group_by_brand: TotalGiftCardsGroupByBrand[]
}

export interface TotalGiftCardsGroupByBrand {
  brand: string
  count: number
  total_amount: number
}
