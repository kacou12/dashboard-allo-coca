import { fetchFiltersOperationLogsApi, fetchOperationLogByIdApi } from './operation-log-api'
import type { OperationLogFiltersPayload, OperationLogResponse } from './operation-log-type'

export async function fetchFiltersOperationLogs(
  payload?: OperationLogFiltersPayload,
): Promise<PaginationResponse<OperationLogResponse> | undefined> {
  try {
    // if (payload?.page == 333) {
    //   payload.page = 332
    // }
    // const response = await fetchFiltersOperationLogsApi(payload)
    const res = await fetchFiltersOperationLogsApi(payload)
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchOperationLogById(id: string): Promise<OperationLogResponse | undefined> {
  try {
    const res = await fetchOperationLogByIdApi({ id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

// export async function exportOperationLogs(
//   payload?: OperationLogFiltersPayload,
// ): Promise<Blob | undefined> {
//   try {
//     const res = await exportOperationLogsApi(payload)
//     return res
//   } catch (error: any) {
//     throw Error(error.response.data.message)
//   }
// }
