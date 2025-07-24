import type { DefaultFiltersPayload } from '../global.type'
import {
  createCountryApi,
  deleteCountryApi,
  fetchCountryByIdApi,
  fetchFiltersCountriesApi,
  updateCountryApi,
} from './country-api'
import type { CountryRequest, CountryResponse, CountryUpdatePayload } from './country-type'

export async function fetchFiltersCountries(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<CountryResponse> | undefined> {
  try {
    const res = await fetchFiltersCountriesApi({
      payload,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchCountryById({
  id,
}: {
  id: string
}): Promise<CountryResponse | undefined> {
  try {
    const res = await fetchCountryByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateCountry({
  id,
  data,
}: {
  id: string
  data: CountryUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateCountryApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function createCountry({ data }: { data: CountryRequest }): Promise<any | undefined> {
  try {
    const res = await createCountryApi(data)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function deleteCountry({ id }: { id: string }): Promise<any | undefined> {
  try {
    const res = await deleteCountryApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
