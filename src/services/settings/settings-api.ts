import { Http } from '../Http'
import { SettingsRouteApi } from './settings-constants'
import type { SettingsRequest, SettingsResponse, SettingsUpdatePayload } from './settings-type'

export async function fetchSettingsApi(): Promise<SuccessResponse<SettingsResponse> | undefined> {
  const result = await Http.get<SuccessResponse<SettingsResponse>>(SettingsRouteApi.default)
  return result
}

export async function updateSettingsApi({
  data,
}: {
  data: SettingsUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(SettingsRouteApi.default, data)
}

export async function createSettingsApi(
  data: SettingsRequest,
): Promise<SuccessResponse<SettingsResponse> | undefined> {
  const result = await Http.post<SuccessResponse<SettingsResponse>>(
    SettingsRouteApi.default,
    data,
    {
      // headers: {
      //   'Device-Id': getDeviceId(),
      // },
    },
  )

  return result
}
