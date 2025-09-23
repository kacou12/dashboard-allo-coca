import type { DashboardFiltersPayload } from '@/services/global.type'


import type { DashboardOrderResponse, DashboardStatsResponse } from './dashboard-alpha-type'
import { fetchDashboardStatsApi, fetchFiltersDashboardApi } from './dashboard-api'

const defaultProviderColor = [
  {
    name: 'mtn',
    color: '#ffc403',
  },
  {
    name: 'orange',
    color: '#f58220',
  },
  {
    name: 'moov',
    color: '#005ca8',
  },
  {
    name: 'wave',
    color: '#1dc8ff',
  },


  {
    name: 'out',
    title: "Sorties",
    color: '#F44336',
  },
  {
    name: 'in',
    title: "Entrées",
    color: '#4CAF50',
  },

]

export async function fetchFiltersDashboard(
  payload: DashboardFiltersPayload,
): 
Promise<PaginationResponse<DashboardOrderResponse> | undefined>  {
  try {
    let res = await fetchFiltersDashboardApi({
      payload,
    })

    return res?.data;
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchDashboardStats(): Promise<DashboardStatsResponse | undefined> {
  try {
    let res = await fetchDashboardStatsApi()

    return res?.data;
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}