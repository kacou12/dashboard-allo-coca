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

export async function fetchFiltersDashboardApi({
  payload,
}: {
  payload: DashboardFiltersPayload
}): Promise<SuccessResponse<DashboardResponse> | undefined> {
  // Same dates

  payload.dates![0].setHours(0, 0, 0, 0)
  payload.dates![1].setHours(23, 59, 59, 59)

  const formatPayload: DashboardFiltersRequest = {
    start_date: payload.dates![0].toISOString(),
    end_date: payload.dates![1].toISOString(),
    country_iso_code: payload.country_iso_code,
  }

  // const formatPayload: DashboardFiltersRequest = {
  //   start_date: '2025-04-20T00:00:00.000Z',
  //   end_date: '2025-04-21T23:59:59.059Z',
  //   country_iso_code: 'CI',
  // }

  const result = await Http.get<SuccessResponse<DashboardResponse>>(
    DashboardRouteApi.default,
    formatPayload,
  )

  return result
}
