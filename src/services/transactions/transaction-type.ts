import type { CountryResponse } from '../country/country-type'

export type TransactionUpdatePayload = {
  amount?: number
  beneficiary_country_code?: string
  beneficiary_name?: string
  beneficiary_phone?: string
  beneficiary_provider_id?: string
  payer_country_code?: string
  payer_name?: string
  payer_pays_fees?: boolean
  payer_phone?: string
  payer_provider_id?: string
  type?: string
}

export type TransfertTransactionPayload = {
  amount: number
 phoneNumber: string
}

export type TransactionStatutUpdatePayload = {
  status?: string
}

export enum TransactionTypeEnum {
  DEPOSIT = 'deposit',
  PAYMENT = 'payment',

}

export enum RelaunchTransactionStatusEnum {
  RETRYING = 'retrying',
  RETRY_SUCCESS = 'retry_success',
  RETRY_FAILED = 'retry_failed',
  MANUAL_REVIEW = 'manual_review',
}

// export enum TransactionStatusEnum {
//   PENDING = 'Pending',
//   PROCESSING = 'Processing',
//   SUCCESS = 'Successful',
//   FAILED = 'Failed',
// }
export const TransactionStatusEnum = Object.freeze({
  PENDING: { value: 'Pending', name: 'En attente', color: '#FFF9C4', textColor: '#F57F17' },
  PROCESSING: { value: 'Processing', name: 'En cours', color: '#E1F5FE', textColor: '#0288D1' },
  SUCCESS: { value: 'Successful', name: 'Effectué', color: '#C8E6C9', textColor: '#388E3C' },
  FAILED: { value: 'Failed', name: 'Échec', color: '#FFCDD2', textColor: '#D32F2F' },
})

export type TransactionResponse = {
  amount: number
  beneficiary_country_iso_code: string
  beneficiary_name: string
  beneficiary_phone: string
  beneficiary_provider?: BeneficiaryProvider
  beneficiary_provider_id: string
  beneficiary_provider_image_url?: string
  beneficiary_provider_name?: string
  cashin_fees: number
  cashout_fees: number
  created_at: string
  currency: string
  fees: number
  failed_reason?: string
  gift_card: GiftCard
  gift_card_id: string
  id: string
  payer_country_iso_code: string
  payer_name: string
  payer_pays_fees: boolean
  payer_phone: string
  payer_provider?: PayerProvider
  payer_provider_image_url?: string
  payer_provider_name?: string
  payer_provider_id: string
  payment_status: string
  payment_transaction_id: string
  payment_url: string
  profit: number
  reference: string
  status: string
  transfer_status: string
  transfer_transaction_id: string
  // type: TransactionTypeEnum
  type: TransactionTypeEnum
  retrying_status?: RelaunchTransactionStatusEnum
  retrying_count: number
  updated_at: string
  user: User
  user_id: string
}

interface BeneficiaryProvider {
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

interface ServiceAvailability {
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

interface CashinIssuer {
  cashin_rate: number
  cashout_rate: number
  id: string
  name: string
  x_id: string
}

interface CashoutIssuer {
  cashin_rate: number
  cashout_rate: number
  id: string
  name: string
  x_id: string
}

interface GiftCard {
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

interface PayerProvider {
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

interface ServiceAvailability2 {
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

interface CashinIssuer2 {
  cashin_rate: number
  cashout_rate: number
  id: string
  name: string
  x_id: string
}

interface CashoutIssuer2 {
  cashin_rate: number
  cashout_rate: number
  id: string
  name: string
  x_id: string
}

interface User {
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
  validated_phone_numbers: string[]
  verification_status: string
  x_id: string
}
