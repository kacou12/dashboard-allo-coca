import { z } from 'zod'
import type { loginSchema } from './auth-schema'
import type { CountryResponse } from '../country/country-type'

export type LoginForm = z.infer<typeof loginSchema>

export type Authentication = {
  access_token: string
  token_type: string
  duration: string
  deviceId: string
}

export type LoginRequest = LoginForm & {}

export type LoginResponse = Authentication & {
  user: AuthResponse
}

export type RefreshTokenRequest = {
  grantType: 'refresh_token'
  clientId: string
  clientSecret: string
  refreshToken: string
}

export type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
  expiresAt: string
  deviceId: string
}
export type AdminPolicyResponse = {
  action: string
  object: string
  subject: string
}
export type AdminPolicyPayload = {
  action: string
  object: string
  subject: string
}

type Role = {
  id: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

export type AuthResponse = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  role: string

}

export type ResetPasswordRequest = {
  new_password: string
  confirmed_password: string
  token: string
}
