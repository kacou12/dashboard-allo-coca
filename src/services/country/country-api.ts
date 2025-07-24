// import { env } from '@/config/env'
import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { CountryRouteApi } from './country-constants'
import type { CountryRequest, CountryResponse, CountryUpdatePayload } from './country-type'

// export async function fetchCountriesApi(
//   page: number,
// ): Promise<SuccessResponse<PaginationResponse<CountryResponse>> | undefined> {
//   const result = await Http.get<SuccessResponse<PaginationResponse<CountryResponse>>>(
//     CountryRouteApi.default,
//     {
//       page,
//     },
//   )
//   return result
// }

export async function fetchFiltersCountriesApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<CountryResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<CountryResponse>>>(
    CountryRouteApi.default,
    payload,
  )

  return result
}

export async function fetchCountryByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<CountryResponse> | undefined> {
  return await Http.get<SuccessResponse<CountryResponse>>(`${CountryRouteApi.default}/${id}`)
}

export async function updateCountryApi({
  id,
  data,
}: {
  id: string
  data: CountryUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${CountryRouteApi.default}/${id}`, data)
}

export async function createCountryApi(
  data: CountryRequest,
): Promise<SuccessResponse<CountryResponse> | undefined> {
  const result = await Http.post<SuccessResponse<CountryResponse>>(CountryRouteApi.default, data, {
    // headers: {
    //   'Device-Id': getDeviceId(),
    // },
  })

  return result
}

export async function deleteCountryApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${CountryRouteApi.default}/${id}`)
}
