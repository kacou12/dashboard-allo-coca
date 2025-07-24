import { Http } from '../Http'
import { IssuerProviderRateRouteApi } from './Issuer-provider-rate-constants'
import type {
  IssuerProviderRateRequest,
  IssuerProviderRateResponse,
  IssuerProviderRateUpdatePayload,
  UpdateIssuerProviderRateUpdatePayload,
} from './Issuer-provider-rate-type'

export async function fetchIssuerProviderRateApi(): Promise<
  SuccessResponse<IssuerProviderRateResponse[]> | undefined
> {
  const result = await Http.get<SuccessResponse<IssuerProviderRateResponse[]>>(
    IssuerProviderRateRouteApi.default,
  )
  return result
}

export async function updateIssuerProviderRateApi({

  data,
}: {
 
  data: UpdateIssuerProviderRateUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${IssuerProviderRateRouteApi.default}/${data.id}`, {
      cashin_rate: data.cashin_rate,
    cashout_rate: data.cashout_rate
  })
}

export async function createIssuerProviderRateApi(
  data: IssuerProviderRateRequest[],
): Promise<SuccessResponse<IssuerProviderRateResponse> | undefined> {
  const result = await Http.post<SuccessResponse<IssuerProviderRateResponse>>(
    IssuerProviderRateRouteApi.default,
    data,
    {
      // headers: {
      //   'Device-Id': getDeviceId(),
      // },
    },
  )

  return result
}
