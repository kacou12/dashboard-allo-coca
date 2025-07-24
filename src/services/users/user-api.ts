// import { env } from '@/config/env'
import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { UserRouteApi } from './user-constants'
import type { UserResponse, UsersStatsResponse, UserUpdatePayload } from './user-type'

export async function fetchUsersApi(
  page: number,
): Promise<SuccessResponse<PaginationResponse<UserResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<UserResponse>>>(
    UserRouteApi.default,
    {
      page,
    },
  )
  return result
}

export async function fetchFiltersUsersApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<UserResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<UserResponse>>>(
    UserRouteApi.default,
    payload,
  )

  return result
}
export async function fetchUserByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<UserResponse> | undefined> {
  return await Http.get<SuccessResponse<UserResponse>>(`${UserRouteApi.default}/${id}`)
}
export async function fetchUsersStatsApi({
  country_id,
}: {
  country_id: string
}): Promise<SuccessResponse<UsersStatsResponse> | undefined> {
  return await Http.get<SuccessResponse<UsersStatsResponse>>(`${UserRouteApi.getStats}`, {
    country_id,
  })
}

export async function updateUserApi({
  id,
  data,
}: {
  id: string
  data: UserUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${UserRouteApi.default}/${id}`, data)
}
