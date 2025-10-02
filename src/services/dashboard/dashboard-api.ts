// import { env } from '@/config/env'
import { getMidnightToday } from '@/lib/utils'
import type {
  DashboardFiltersPayload,
  DashboardFiltersRequest,
  DefaultFiltersPayload,
} from '../global.type'
import { Http } from '../Http'
import type { DashboardResponse } from './dashboard-alpha-type'
import { DashboardRouteApi } from './dashboard-constants'
import { env } from '@/config/env'
import { dataAnalysisBeneficiariesResponse } from '@/mocks/data-analysis.mock.response'

export async function fetchFiltersDashboardApi({
  payload,
}: {
  payload: DashboardFiltersPayload
}): Promise<SuccessResponse<DashboardResponse> | undefined> {

  //    if (env.VITE_MOCK_API == 'true') {
  //       // TODO: remove this once you have auth
  //       return Promise.resolve(dataAnalysisBeneficiariesResponse as SuccessResponse<DashboardResponse>) ;
  //   }



  // payload.dates![0].setHours(0, 0, 0, 0)
  // payload.dates![1].setHours(23, 59, 59, 59)

  // const formatPayload: DashboardFiltersRequest = {
  //   start_date: payload.dates![0].toISOString(),
  //   end_date: payload.dates![1].toISOString(),
  //   country_iso_code: payload.country_iso_code,
  // }
  // const result = await Http.get<SuccessResponse<DashboardResponse>>(
  //   DashboardRouteApi.default,
  //   formatPayload,
  // )

  // return result

  return Promise.resolve(dataAnalysisBeneficiariesResponse as SuccessResponse<DashboardResponse>) ;

 
}
