// import { env } from '@/config/env'
import { env } from '@/config/env'
import type { TransactionFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { SupplyTransactionRouteApi } from './supply-transaction-constants'

import { mockTransactionsResponse } from '@/mocks/transaction.mock.response'
import type { SupplyTransactionPayload, SupplyTransactionResponse } from './supply-transaction-type'

export async function fetchFiltersSupplyTransactionsApi({
  payload,
}: {
  payload: TransactionFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<SupplyTransactionResponse>> | undefined> {``
 if (env.VITE_MOCK_API == 'true') {
    // TODO: remove this once you have auth
    //@ts-ignore
    return Promise.resolve(mockTransactionsResponse as SuccessResponse<PaginationResponse<SupplyTransactionResponse>>) ;
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<SupplyTransactionResponse>>>(
    SupplyTransactionRouteApi.filter,
    payload,
  )

  return result
}



export async function createSupplyTransactionApi({
  payload,
}: {
  payload: SupplyTransactionPayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.post<SuccessResponse<any>>(`${SupplyTransactionRouteApi.transfertTransaction}`, payload)
}
