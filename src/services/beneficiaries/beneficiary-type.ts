import { z } from 'zod'

import type { beneficiarySchema } from './beneficiary-schema'

export type BeneficiaryForm = z.infer<typeof beneficiarySchema>

export type BeneficiaryRequest = BeneficiaryForm

export type BeneficiaryResponse = {
  id: string; // Unique identifier for the beneficiary
  first_name: string; // Corresponds to "Philippe Jeans"
  last_name: string
  network: string; // Corresponds to "MTN"
  phone: string; // Corresponds to "+226 0787986058"
  description?: string; // Corresponds to "Description of the beneficiary" (optional based on screenshot, but good to include)
  created_at: string; // Corresponds to "07/08/2023" in the "Date de modification" column
}

export type BeneficiaryUpdatePayload = {
  first_name?: string
  last_name?: string
  network?: string
  phone?: string
  description?: string
}