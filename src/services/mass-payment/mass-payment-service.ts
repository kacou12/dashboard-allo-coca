
import type { DefaultFiltersPayload } from '../global.type'
import { createMassPaymentApi, fetchFiltersMassPaymentsApi } from './mass-payment-api'

import type { MassPaymentRequest, MassPaymentResponse } from './mass-payment-type'


export async function fetchFiltersMassPayments(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<MassPaymentResponse> | undefined> {
  try {
    const testPayload = { ...payload }
    const res = await fetchFiltersMassPaymentsApi(payload)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createMassPayment(data: MassPaymentRequest): Promise<any | undefined> {
  try {
    const res = await createMassPaymentApi(data)

    return res?.data
    // return res
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

