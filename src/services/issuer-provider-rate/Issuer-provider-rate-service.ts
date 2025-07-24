import {
  createIssuerProviderRateApi,
  fetchIssuerProviderRateApi,
  updateIssuerProviderRateApi,
} from './Issuer-provider-rate-api'
import type {
  IssuerProviderRateRequest,
  IssuerProviderRateResponse,
  IssuerProviderRateUpdatePayload,
  UpdateIssuerProviderRateUpdatePayload,
} from './Issuer-provider-rate-type'

export async function fetchIssuerProviderRate(): Promise<IssuerProviderRateResponse[] | undefined> {
  try {
    const res = await fetchIssuerProviderRateApi()
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateIssuerProviderRate({

  data,
}: {
  
  data: UpdateIssuerProviderRateUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateIssuerProviderRateApi({
      
      data: data,
    })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createIssuerProviderRate({
  data,
}: {
  data: IssuerProviderRateRequest
}): Promise<any | undefined> {
  try {
    const res = await createIssuerProviderRateApi([data])

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
