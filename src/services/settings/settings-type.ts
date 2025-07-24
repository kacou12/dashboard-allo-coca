import { z } from 'zod'
import type { settingsSchema } from './settings-schema'

export type SettingsForm = z.infer<typeof settingsSchema>

export type SettingsRequest = SettingsForm

export type SettingsResponse = {
  created_at: string
  fees: number
  international_fee: number
  id: string
  unverified_user_daily_limit: number
  unverified_user_monthly_limit: number
  updated_at: string
  verified_user_daily_limit: number
  verified_user_monthly_limit: number
  giftcard_availability: boolean
}

export type SettingsUpdatePayload = {
  fees?: number
  international_fee?:number
  unverified_user_daily_limit?: number
  unverified_user_monthly_limit?: number
  verified_user_daily_limit?: number
  verified_user_monthly_limit?: number
  giftcard_availability: boolean
}
