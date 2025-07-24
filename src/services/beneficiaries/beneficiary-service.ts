import type { DefaultFiltersPayload } from '../global.type'
import {
  createBeneficiaryApi,
  deleteBeneficiaryApi,
  fetchFiltersBeneficiariesApi,
  fetchBeneficiaryByIdApi,
  updateBeneficiaryApi,
} from './beneficiary-api'
import type { BeneficiaryRequest, BeneficiaryResponse, BeneficiaryUpdatePayload } from './beneficiary-type'

export async function fetchFiltersBeneficiaries(
  payload: DefaultFiltersPayload,
): Promise<PaginationResponse<BeneficiaryResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersBeneficiariesApi({
      payload,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchBeneficiaryById({ id }: { id: string }): Promise<BeneficiaryResponse | undefined> {
  try {
    const res = await fetchBeneficiaryByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateBeneficiary({
  id,
  data,
}: {
  id: string
  data: BeneficiaryUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateBeneficiaryApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createBeneficiary({ data }: { data: BeneficiaryRequest }): Promise<any | undefined> {
  try {
    const res = await createBeneficiaryApi(data)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function deleteBeneficiary({ id }: { id: string }): Promise<any | undefined> {
  try {
    const res = await deleteBeneficiaryApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}