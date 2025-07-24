import { z } from 'zod'

import type { CountryResponse } from '../country/country-type'
import type { providerSchema } from './provider-schema'

export type ProviderForm = z.infer<typeof providerSchema>

export type ProviderRequest = ProviderForm & {
  country_id: string
}

export type ProviderResponse = {
  country: CountryResponse
  country_id: string
  created_at: string
  id: string
  name: string
  image_url: string
  serviceAvailability: ServiceAvailability
  updated_at: string
  x_id: string
  // new field
  instruction: string
  validation_type: 'link' | 'otp' | 'ussd' | ''
  extra: string[]
  cashin_issuer_used: string[]
  cashout_issuer_used: string[]
}

export type ProviderUpdatePayload = {
  name?: string
  image_url?: string
}
export type ProviderServiceAvailabilityPayload = {
  cashin_enabled: boolean
  cashin_issuer_id: string
  cashout_enabled: boolean
  cashout_issuer_id: string
  id: string
  provider_id: string
  must_pay_fees: boolean
}

interface ServiceAvailability {
  airtime_enabled: boolean
  cashinIssuer: CashinIssuer
  cashin_enabled: boolean
  cashin_issuer_id: string
  cashoutIssuer: CashoutIssuer
  cashout_enabled: boolean
  cashout_issuer_id: string
  gift_card_enabled: boolean
  id: string

  provider: string
  provider_id: string
  sendchap_id: string
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

export interface ServiceAvailabilityResponse {
  cashin_enabled: boolean
  cashin_issuer?: CashinIssuer
  cashin_issuer_id?: string
  cashout_enabled: boolean
  cashout_issuer?: CashoutIssuer
  cashout_issuer_id?: string
  created_at: string
  id: string
  must_pay_fees: boolean
  provider?: ProviderResponse
  provider_id?: string
  updated_at: string
  x_id: string
}
