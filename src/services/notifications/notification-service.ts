import type { DefaultFiltersPayload, NotificationFiltersPayload } from '../global.type'
import {
  createNotificationApi,
  deleteNotificationApi,
  fetchFiltersNotificationsApi,
  fetchNotificationByIdApi,
  updateNotificationApi,
} from './notification-api'
import type {
  NotificationRequest,
  NotificationResponse,
  NotificationUpdatePayload,
} from './notification-type'

export async function fetchFiltersNotifications(
  payload: NotificationFiltersPayload,
): Promise<PaginationResponse<NotificationResponse> | undefined> {
  try {
    const testPayload = { ...payload }
    const res = await fetchFiltersNotificationsApi(payload)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createNotification(data: NotificationRequest): Promise<any | undefined> {
  try {
    const res = await createNotificationApi(data)

    return res?.data
    // return res
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateNotification({
  id,
  data,
}: {
  id: string
  data: NotificationUpdatePayload
}): Promise<NotificationResponse | undefined> {
  try {
    const res = await updateNotificationApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function deleteNotification({ id }: { id: string }): Promise<string | undefined> {
  try {
    const res = await deleteNotificationApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchNotificationById({
  id,
}: {
  id: string
}): Promise<NotificationResponse | undefined> {
  try {
    const res = await fetchNotificationByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
