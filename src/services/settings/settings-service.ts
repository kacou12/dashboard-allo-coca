import { createSettingsApi, fetchSettingsApi, updateSettingsApi } from './settings-api'
import type { SettingsRequest, SettingsResponse, SettingsUpdatePayload } from './settings-type'

export async function fetchSettings(): Promise<SettingsResponse | undefined> {
  try {
    const res = await fetchSettingsApi()
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateSettings({
  data,
}: {
  data: SettingsUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateSettingsApi({
      data: data,
    })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function createSettings({
  data,
}: {
  data: SettingsRequest
}): Promise<any | undefined> {
  try {
    const res = await createSettingsApi(data)

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
