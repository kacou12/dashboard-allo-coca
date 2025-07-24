import type { DashboardFiltersPayload, DefaultFiltersPayload } from '../global.type'
import { fetchBenefitsApi } from './benefit-api'
import type { BenefitResponse } from './benefit-type'

export async function fetchFiltersBenefits(
  payload: DashboardFiltersPayload,
): Promise<BenefitResponse | undefined> {
  try {
    const res = await fetchBenefitsApi({
      payload,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
