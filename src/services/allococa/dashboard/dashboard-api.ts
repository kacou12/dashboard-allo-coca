// import { env } from '@/config/env'
import { env } from '@/config/env'

import { mockDashboardResponse } from '@/mocks/allococa/dashboard.mock.response'
import { mockStatsResponse } from '@/mocks/allococa/stats.mock.response'
import type { DashboardFiltersPayload } from '@/services/global.type'
import { Http } from '@/services/Http'
import type { DashboardOrderResponse, DashboardStatsResponse } from './dashboard-alpha-type'
import { DashboardRouteApi } from './dashboard-constants'

export async function fetchFiltersDashboardApi({
  payload,
}: {
  payload: DashboardFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<DashboardOrderResponse>>| undefined> {
 

    if (env.VITE_MOCK_API == 'true') {
        // TODO: remove this once you have auth
        return Promise.resolve(mockDashboardResponse as SuccessResponse<PaginationResponse<DashboardOrderResponse>>| undefined) ;
    }



  const result = await Http.get<SuccessResponse<PaginationResponse<DashboardOrderResponse>>>(
    DashboardRouteApi.default,
    payload,
  )

  return result
}

export async function fetchDashboardStatsApi(): Promise<SuccessResponse<DashboardStatsResponse> | undefined> {
 

    if (env.VITE_MOCK_API == 'true') {
        // TODO: remove this once you have auth
        return Promise.resolve(mockStatsResponse as SuccessResponse<DashboardStatsResponse>) ;
    }





  const result = await Http.get<SuccessResponse<DashboardStatsResponse>>(
    DashboardRouteApi.stats,
    
  )

  return result
}
