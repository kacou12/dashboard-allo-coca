import type { DefaultFiltersPayload, UserFiltersPayload } from '../global.type'
import {
  fetchFiltersUsersApi,
  fetchUserByIdApi,
  fetchUsersApi,
  fetchUsersStatsApi,
  updateUserApi,
} from './user-api'
import type { UserResponse, UsersStatsResponse, UserUpdatePayload } from './user-type'

export async function fetchUsers(
  page: number,
): Promise<PaginationResponse<UserResponse> | undefined> {
  try {
    const res = await fetchUsersApi(page)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function fetchFiltersUsers(
  payload: UserFiltersPayload,
): Promise<PaginationResponse<UserResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersUsersApi({
      payload,
    })

    let customData = res?.data;

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime(); // dateB - dateA pour le plus récent au plus ancien
    });


    return customData;
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchUserById({ id }: { id: string }): Promise<UserResponse | undefined> {
  try {
    const res = await fetchUserByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function fetchUsersStats({
  country_id,
}: {
  country_id: string
}): Promise<UsersStatsResponse | undefined> {
  try {
    let res = await fetchUsersStatsApi({
      country_id: country_id,
    })

    if (res?.data?.daily_stats == null) {
      res!.data!.daily_stats = []
    }
    if (res?.data?.monthly_stats == null) {
      res!.data!.monthly_stats = []
    }

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateUser({
  id,
  data,
}: {
  id: string
  data: UserUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateUserApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
