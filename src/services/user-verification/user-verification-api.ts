import type { UserVerificationFiltersPayload, UserVerificationFiltersRequest } from '../global.type'
import { Http } from '../Http'
import { UserVerificationRouteApi } from './user-verification-constants'
import type {
  UpdateUserVerificationPayload,
  UserVerificationResponse,
  UserVerificationStatsResponse,
} from './user-verification.type'

export async function fetchUsersVerificationApi(
  page: number,
): Promise<SuccessResponse<PaginationResponse<UserVerificationResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<UserVerificationResponse>>>(
    UserVerificationRouteApi.default,
    {
      page,
    },
  )
  return result
}

export async function fetchFiltersUsersVerificationApi({
  payload,
}: {
  payload: UserVerificationFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<UserVerificationResponse>> | undefined> {
  payload.dates![0].setHours(0, 0, 0, 0)
  payload.dates![1].setHours(23, 59, 59, 59)

  const formatPayload: UserVerificationFiltersRequest = {
    startDate: payload.dates![0].toISOString(),
    endDate: payload.dates![1].toISOString(),
    page: payload.page,
    q: payload.q,
    country_id: payload.country_id,
    typeDoc: payload.typeDoc,
    status: payload.status,
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<UserVerificationResponse>>>(
    UserVerificationRouteApi.default,
    formatPayload,
  )

  return result
}
export async function fetchUserVerificationByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<UserVerificationResponse> | undefined> {
  return await Http.get<SuccessResponse<UserVerificationResponse>>(
    `${UserVerificationRouteApi.default}/${id}`,
  )
}
export async function fetchUsersVerificationStatsApi({
  country_id,
}: {
  country_id: string
}): Promise<SuccessResponse<UserVerificationStatsResponse> | undefined> {
  return await Http.get<SuccessResponse<UserVerificationStatsResponse>>(
    `${UserVerificationRouteApi.getStats}`,
    {
      country_id,
    },
  )
}

export async function updateUserVerificationApi({
  id,
  data,
}: {
  id: string
  data: UpdateUserVerificationPayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(UserVerificationRouteApi.updateStatus(id), data)
}
