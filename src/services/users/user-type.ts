import { z } from 'zod'

import type { CountryResponse } from '../country/country-type'
import type { userSchema } from './user-schema'

export type UserForm = z.infer<typeof userSchema>

export type UserRequest = UserForm & {
  country_id: string
}
export enum VerificationStatusEnum {
  UNVERIFIED = 'unverified',
  VERIFIED = 'verified',
}

export type UsersStatsResponse = {
  count_users: number
  count_users_in_progress: number
  count_users_unverified: number
  count_users_verified: number
  current_month_users_count: number
  last_day_users_count: number
  last_month_users_count: number
  today_users_count: number
  monthly_stats: MonthlyStat[]
  daily_stats: DailyStat[]
}

export type UserResponse = {
  id: string
  sendchap_id: string
  firstname: string
  lastname: string
  email: string
  birthdate: string
  avatar: string
  phone: string
  phone_verified: boolean
  email_verified: boolean
  country_id: string
  country: CountryResponse
  verification_status: string
  referred_by: string
  referral_code: string
  withdrawn_amount: number
  reward_amount: number
  is_superuser: boolean
  active: boolean
  accepted_tos: boolean
  role_id: string
  role: Role
  validated_phone_numbers: any
  last_login: any
  created_at: string
  updated_at: string
  account_verification?: AccountVerification
}
export type UserUpdatePayload = {
  accepted_tos?: boolean
  active?: boolean
  avatar?: string
  birthdate?: string
  country_id?: string
  email?: string
  email_verified?: boolean
  firstname?: string
  is_superuser?: boolean
  lastname?: string
  password?: string
  phone?: string
  phone_verified?: boolean
  pin_code?: string
  referral_code?: string
  referred_by?: string
  reward_amount?: number
  role_id?: string
  verification_status?: string
  withdrawn_amount?: number
  has_pin?: boolean
  one_signal_subs_id?: string
}

export interface MonthlyStat {
  month: string
  year: number
  user_count: number
}

export interface DailyStat {
  date: string
  day_name: string
  user_count: number
}

interface Role {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

interface AccountVerification {
  id: string
  x_id: string
  files: File[]
  user_id: string
  user: any
  type_of_id_card: string
  status: string
  reason: any
  message: any
  created_at: string
  updated_at: string
}

interface File {
  id: string
  x_id: string
  filepath: string
  public_id: string
  file_type: string
  description: string
  created_at: string
  updated_at: string
  account_verification_request_id: string
}
