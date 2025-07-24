import { z } from 'zod'
import type { notificationSchema } from './notification-schema'
import type { CountryResponse } from '../country/country-type'

export type NotificationForm = z.infer<typeof notificationSchema>

export type NotificationRequest = NotificationForm & {
  countries: string[]
  show_to_users: boolean
}

export type NotificationResponse = {
  countries: CountryResponse[]
  created_at: string
  id: string
  message: string
  sendchap_id: string
  show_to_users: boolean
  title: string
  updated_at: string
}

export type NotificationUpdatePayload = {
  // id: string
  message?: string
  show_to_users?: boolean
  title?: string
  countries?: string[]
}
