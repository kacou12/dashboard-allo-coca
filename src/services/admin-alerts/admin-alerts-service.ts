import type { DefaultFiltersPayload } from '../global.type'
import {
  createAdminAlertApi,
  fetchAdminAlertsApi,
  fetchAdminAlertByIdApi,
  updateAdminAlertApi,
} from './admin-alerts-api'
import type {
  AdminAlertRequest,
  AdminAlertResponse,
  AdminAlertUpdatePayload,
  AdminAlertStatsResponse,
} from './admin-alerts-type'

export async function fetchAdminAlerts(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<AdminAlertResponse> | undefined> {
  try {
    const res = await fetchAdminAlertsApi({ payload })
    let customData = res?.data;

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime(); // dateB - dateA pour le plus récent au plus ancien
    });


    return customData;
  } catch (error: any) {
    throw Error(error.response?.data?.message || error.message)
  }
}

export async function fetchAdminAlertById({
  id,
}: {
  id: string
}): Promise<AdminAlertResponse | undefined> {
  try {
    const res = await fetchAdminAlertByIdApi({ id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || error.message)
  }
}

export async function updateAdminAlert({
  id,
  data,
}: {
  id: string
  data: AdminAlertUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateAdminAlertApi({ id, data })
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || error.message)
  }
}

export async function createAdminAlert({
  data,
}: {
  data: AdminAlertRequest
}): Promise<any | undefined> {
  try {
    const res = await createAdminAlertApi(data)
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || error.message)
  }
}
