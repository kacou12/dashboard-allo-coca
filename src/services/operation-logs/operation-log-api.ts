import { Http } from '../Http'
import { OperationLogRouteApi } from './operation-log-constants'
import type { OperationLogFiltersPayload, OperationLogResponse } from './operation-log-type'

export async function fetchFiltersOperationLogsApi(
  payload?: OperationLogFiltersPayload,
): Promise<SuccessResponse<PaginationResponse<OperationLogResponse>> | undefined> {
  payload!.dates![0].setHours(0, 0, 0, 0)
  payload!.dates![1].setHours(23, 59, 59, 59)
  payload!.start_date = payload!.dates![0].toISOString()
  payload!.end_date = payload!.dates![1].toISOString()

  const result = await Http.get<SuccessResponse<PaginationResponse<OperationLogResponse>>>(
    OperationLogRouteApi.default,
    payload,
  )
  return result
}

export async function fetchOperationLogByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<OperationLogResponse> | undefined> {
  return await Http.get<SuccessResponse<OperationLogResponse>>(
    `${OperationLogRouteApi.default}/${id}`,
  )
}

// export async function exportOperationLogsApi(
//   payload?: OperationLogFiltersPayload,
// ): Promise<Blob | undefined> {
//   const result = await Http.getBlob(`${OperationLogRouteApi.default}/export`, payload)
//   return result
// }
