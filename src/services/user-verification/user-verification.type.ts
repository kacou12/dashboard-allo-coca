import type { CountryResponse } from '../country/country-type'
import type { DocumentFile } from '../global.type'

export interface UserVerificationResponse {
  created_at: string
  files: DocumentFile[]
  id: string
  // UserVerificationStatusEnum
  status: string
  type_of_id_card: string
  updated_at: string
  user: User
  user_id: string
  x_id: string
}

export enum UserVerificationDocumentTypeEnum {
  CNI = 'cni',
  PASSPORT = 'passport',
}
export enum UserVerificationStatusEnum {
  IN_PROGRESS = 'in_progress',
  REFUSED = 'refused',
  VERIFIED = 'verified',
}

interface File {
  account_verification_request_id: string
  created_at: string
  description: string
  file_type: string
  filepath: string
  id: string
  public_id: string
  updated_at: string
  x_id: string
}

export interface UpdateUserVerificationPayload {
  message?: string
  reason?: string
  status: UserVerificationStatusEnum.REFUSED | UserVerificationStatusEnum.VERIFIED
}

export interface UserVerificationStatsResponse {
  count_in_progress: number
  count_submission_with_cni: number
  count_submission_with_passport: number
  count_submited_verification_request: number
  count_unique_users: number
  count_unverified: number
  count_verified: number
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
