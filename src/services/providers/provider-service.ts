import { toRaw } from 'vue'
import type { DefaultFiltersPayload } from '../global.type'
import {
  createProviderApi,
  deleteProviderApi,
  fetchFiltersProvidersApi,
  fetchProviderByIdApi,
  fetchProviderServiceAvailabilityApi,
  updateProviderApi,
  updateProviderServiceAvailabilityApi,
} from './provider-api'
import type {
  ProviderRequest,
  ProviderResponse,
  ProviderServiceAvailabilityPayload,
  ProviderUpdatePayload,
  ServiceAvailabilityResponse,
} from './provider-type'

export async function fetchFiltersProviders(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<ProviderResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersProvidersApi({
      payload,
    })

    let responseData = res?.data
    responseData?.items.sort((a, b) => a.name.localeCompare(b.name))

    return responseData
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchProviderById({
  id,
}: {
  id: string
}): Promise<ProviderResponse | undefined> {
  try {
    const res = await fetchProviderByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateProvider({
  id,
  data,
}: {
  id: string
  data: ProviderUpdatePayload
}): Promise<any | undefined> {
  try {
    const test = JSON.stringify(data)
    // console.log(JSON.stringify(data))
    const res = await updateProviderApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function createProvider({
  data,
}: {
  data: ProviderRequest
}): Promise<any | undefined> {
  try {
    const res = await createProviderApi(data)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function deleteProvider({ id }: { id: string }): Promise<any | undefined> {
  try {
    const res = await deleteProviderApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateProviderServiceAvailability({
  data,
}: {
  data: ProviderServiceAvailabilityPayload[]
}): Promise<any | undefined> {
  try {
    const res = await updateProviderServiceAvailabilityApi({
      data,
    })

    return res
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function   fetchProviderServiceAvailibilities({country_id}:{country_id:string}): Promise<
  PaginationResponse<ServiceAvailabilityResponse> | undefined
> {
  try {
    const res = await fetchProviderServiceAvailabilityApi({
      country_id: country_id
    })
    let resultData = res?.data;
    

    resultData!.items = [...resultData!.items].sort((a, b) => a.provider!.name.toLowerCase().localeCompare(b.provider!.name.toLowerCase()))
    

    return resultData;
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
