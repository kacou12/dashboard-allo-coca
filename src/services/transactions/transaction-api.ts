// import { env } from '@/config/env'
import { env } from '@/config/env'
import type { TransactionFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { TransactionRouteApi } from './transaction-constants'
import type {
  TransactionResponse,
  TransactionStatutUpdatePayload,
  TransactionUpdatePayload,
  TransfertTransactionPayload,
} from './transaction-type'
import { mockTransactionsResponse } from '@/mocks/transaction.mock.response'

export async function fetchFiltersTransactionsApi({
  payload,
}: {
  payload: TransactionFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<TransactionResponse>> | undefined> {``
 if (env.VITE_MOCK_API == 'true') {
    // TODO: remove this once you have auth
    return Promise.resolve(mockTransactionsResponse as SuccessResponse<PaginationResponse<TransactionResponse>>) ;
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<TransactionResponse>>>(
    TransactionRouteApi.filter,
    payload,
  )

  return result
}

export async function updateTransactionApi({
  id,
  data,
}: {
  id: string
  data: TransactionUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${TransactionRouteApi.default}/${id}`, data)
}
export async function updateTransactionStatusApi({
  id,
  data,
}: {
  id: string
  data: TransactionStatutUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${TransactionRouteApi.updateStatus(id)}`, data)
}
export async function relaunchTransactionApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.post<SuccessResponse<any>>(`${TransactionRouteApi.relaunchTransaction(id)}`, {})
}
export async function createTransfertTransactionApi({
  payload,
}: {
  payload: TransfertTransactionPayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.post<SuccessResponse<any>>(`${TransactionRouteApi.transfertTransaction}`, payload)
}

export async function fetchUserTransactionsByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<PaginationResponse<TransactionResponse>> | undefined> {
  if (env.VITE_MOCK_API == 'true') {
    // TODO: remove this once you have auth
    return Promise.resolve(mockTransactionsResponse as SuccessResponse<PaginationResponse<TransactionResponse>>) ;
  }
  
  return await Http.get<SuccessResponse<PaginationResponse<TransactionResponse>>>(
    `${TransactionRouteApi.default}`,
    {
      user_id: id,
    },
  )
}
