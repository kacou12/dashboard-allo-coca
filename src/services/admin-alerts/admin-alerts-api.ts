import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { AdminAlertsRouteApi } from './admin-alerts-constants'
import type {
  AdminAlertRequest,
  AdminAlertResponse,
  AdminAlertUpdatePayload,
} from './admin-alerts-type'

export async function fetchAdminAlertsApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<AdminAlertResponse>> | undefined> {
  return await Http.get<SuccessResponse<PaginationResponse<AdminAlertResponse>>>(
    AdminAlertsRouteApi.default,
    payload,
  )
}

export async function fetchAdminAlertByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<AdminAlertResponse> | undefined> {
  return await Http.get<SuccessResponse<AdminAlertResponse>>(`${AdminAlertsRouteApi.default}/${id}`)
}

export async function createAdminAlertApi(
  data: AdminAlertRequest,
): Promise<SuccessResponse<AdminAlertResponse> | undefined> {
  return await Http.post<SuccessResponse<AdminAlertResponse>>(AdminAlertsRouteApi.default, data)
}

export async function updateAdminAlertApi({
  id,
  data,
}: {
  id: string
  data: AdminAlertUpdatePayload
}): Promise<SuccessResponse<AdminAlertResponse> | undefined> {
  return await Http.put<SuccessResponse<AdminAlertResponse>>(
    `${AdminAlertsRouteApi.default}/${id}`,
    data,
  )
}
