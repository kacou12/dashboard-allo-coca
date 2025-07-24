import type {
  DefaultFiltersPayload,
  UserFiltersPayload,
  UserVerificationFiltersPayload,
} from '../global.type'
import type { UsersStatsResponse } from '../users/user-type'
import {
  fetchFiltersUsersVerificationApi,
  fetchUsersVerificationApi,
  fetchUsersVerificationStatsApi,
  fetchUserVerificationByIdApi,
  updateUserVerificationApi,
} from './user-verification-api'
import type {
  UpdateUserVerificationPayload,
  UserVerificationResponse,
  UserVerificationStatsResponse,
  UserVerificationStatusEnum,
} from './user-verification.type'

export async function fetchUsersVerification(
  page: number,
): Promise<PaginationResponse<UserVerificationResponse> | undefined> {
  try {
    const res = await fetchUsersVerificationApi(page)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function fetchFiltersUsersVerification(
  payload: UserVerificationFiltersPayload,
): Promise<PaginationResponse<UserVerificationResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    // console.log('====================================')
    // // console.log(payloadData)
    // console.log('====================================')
    const res = await fetchFiltersUsersVerificationApi({
      payload,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchUserVerificationById({
  id,
}: {
  id: string
}): Promise<UserVerificationResponse | undefined> {
  try {
    const res = await fetchUserVerificationByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function fetchUsersVerificationStats({
  country_id,
}: {
  country_id: string
}): Promise<UserVerificationStatsResponse | undefined> {
  try {
    const res = await fetchUsersVerificationStatsApi({
      country_id: country_id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateUserVerification({
  id,
  data,
}: {
  id: string
  data: UpdateUserVerificationPayload
}): Promise<any | undefined> {
  try {
    const res = await updateUserVerificationApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
