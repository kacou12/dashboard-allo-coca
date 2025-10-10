// import { env } from '@/config/env'
import type {
  DashboardFiltersPayload,
  DefaultFiltersPayload,
  DefaultFiltersRequest,
} from '../global.type'
import { Http } from '../Http'
import { BenefitRouteApi } from './benefit-constants'
import type { BenefitResponse } from './benefit-type'

export async function fetchBenefitsApi({
  payload,
}: {
  payload: DashboardFiltersPayload
}): Promise<SuccessResponse<BenefitResponse> | undefined> {

  const formatPayload = {
   
    country_iso_code: payload.country_iso_code,
    // page: payload.page,
  }

  const result = await Http.get<SuccessResponse<BenefitResponse>>(
    BenefitRouteApi.default,
    formatPayload,
  )

  return result
}
