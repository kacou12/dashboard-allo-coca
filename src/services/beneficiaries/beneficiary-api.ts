import { env } from '@/config/env'
import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { BeneficiaryRouteApi } from './beneficiary-constants'
import type { BeneficiaryRequest, BeneficiaryResponse, BeneficiaryUpdatePayload } from './beneficiary-type'
import { mockBeneficiariesResponse } from '@/mocks/beneficiary.mock.response'

export async function fetchFiltersBeneficiariesApi({
  payload,
}: {
  payload: DefaultFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<BeneficiaryResponse>> | undefined> {
  if (env.VITE_MOCK_API == 'true') {
      // TODO: remove this once you have auth
      return Promise.resolve(mockBeneficiariesResponse as SuccessResponse<PaginationResponse<BeneficiaryResponse>>) ;
  }
  
  const result = await Http.get<SuccessResponse<PaginationResponse<BeneficiaryResponse>>>(
    BeneficiaryRouteApi.default,
    payload,
  )

  return result
}

export async function fetchBeneficiaryByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<BeneficiaryResponse> | undefined> {
  return await Http.get<SuccessResponse<BeneficiaryResponse>>(`${BeneficiaryRouteApi.default}/${id}`)
}

export async function updateBeneficiaryApi({
  id,
  data,
}: {
  id: string
  data: BeneficiaryUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${BeneficiaryRouteApi.default}/${id}`, data)
}

export async function createBeneficiaryApi(
  data: BeneficiaryRequest,
): Promise<SuccessResponse<BeneficiaryResponse> | undefined> {
  const result = await Http.post<SuccessResponse<BeneficiaryResponse>>(BeneficiaryRouteApi.default, data, {
    // headers: {
    //   'Device-Id': getDeviceId(),
    // },
  })

  return result
}

export async function deleteBeneficiaryApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${BeneficiaryRouteApi.default}/${id}`)
}