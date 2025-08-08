import { z } from 'zod'
import type { massPaymentSchema } from './mass-payment-schema'
import type { CountryResponse } from '../country/country-type'

export type MassPaymentForm = z.infer<typeof massPaymentSchema>

export type MassPaymentRequest = MassPaymentForm & {
 excelFile: File
}

export type MassPaymentResponse = {

  name: string
  phone: string
  network: string
  amount: number
}

export type MassPaymentUpdatePayload = {
  // id: string
  message?: string
  show_to_users?: boolean
  title?: string
  countries?: string[]
}
