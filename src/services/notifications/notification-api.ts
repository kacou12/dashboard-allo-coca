import type { NotificationFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { NotificationsRouteApi } from './notification-constants'
import type {
  NotificationRequest,
  NotificationResponse,
  NotificationUpdatePayload,
} from './notification-type'

// const mock = new MockAdapter(axios.create())

export async function createNotificationApi(
  data: NotificationRequest,
): Promise<SuccessResponse<NotificationResponse> | undefined> {
  let a = 'aa'
  const result = await Http.post<SuccessResponse<NotificationResponse>>(
    NotificationsRouteApi.default,
    data,
    {},
  )
  let test = result

  return result
}

export async function fetchFiltersNotificationsApi(
  payload: NotificationFiltersPayload,
): Promise<SuccessResponse<PaginationResponse<NotificationResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<NotificationResponse>>>(
    NotificationsRouteApi.getAll,
    payload,
  )
  return result
}

export async function fetchNotificationByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<NotificationResponse> | undefined> {
  return await Http.get<SuccessResponse<NotificationResponse>>(
    `${NotificationsRouteApi.getAll}/${id}`,
  )
}

export async function updateNotificationApi({
  id,
  data,
}: {
  id: string
  data: NotificationUpdatePayload
}): Promise<SuccessResponse<NotificationResponse> | undefined> {
  return await Http.put<SuccessResponse<NotificationResponse>>(
    `${NotificationsRouteApi.getAll}/${id}`,
    data,
  )
}
export async function deleteNotificationApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<string> | undefined> {
  return await Http.delete<SuccessResponse<string>>(`${NotificationsRouteApi.getAll}/${id}`)
}
