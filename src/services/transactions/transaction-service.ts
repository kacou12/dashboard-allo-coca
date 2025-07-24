import type { TransactionFiltersPayload } from '../global.type'
import {
  createTransfertTransactionApi,
  fetchFiltersTransactionsApi,
  fetchUserTransactionsByIdApi,
  relaunchTransactionApi,
  updateTransactionApi,
  updateTransactionStatusApi,
} from './transaction-api'
import type {
  TransactionResponse,
  TransactionStatutUpdatePayload,
  TransactionUpdatePayload,
  TransfertTransactionPayload,
} from './transaction-type'

export async function fetchFiltersTransactions(
  payload: TransactionFiltersPayload,
): Promise<PaginationResponse<TransactionResponse> | undefined> {
  try {
    let payloadData = { ...payload }
    const res = await fetchFiltersTransactionsApi({
      payload,
    })

    let customData = res?.data

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateB.getTime() - dateA.getTime() // dateB - dateA pour le plus récent au plus ancien
    })

    return customData
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function updateTransaction({
  id,
  data,
}: {
  id: string
  data: TransactionUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateTransactionApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
export async function relaunchTransactions({ id }: { id: string }): Promise<any | undefined> {
  try {
    const res = await relaunchTransactionApi({
      id: id,
    })

    return res?.data
  } catch (error: any) {
   
    throw Error('Une erreur est survenue durant le relancement des transactions')
    // throw Error(error.response.data.message)
  }
}
export async function createTransfertTransaction({ payload }: { payload: TransfertTransactionPayload }): Promise<any | undefined> {
  try {
    const res = await createTransfertTransactionApi({
      payload: payload,
    })

    return res?.data
  } catch (error: any) {
   
    throw Error('Une erreur est survenue durant le transfert')
    // throw Error(error.response.data.message)
  }
}

export async function updateTransactionStatus({
  id,
  data,
}: {
  id: string
  data: TransactionStatutUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateTransactionStatusApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function fetchUserTransactions({
  id,
}: {
  id: string
}): Promise<PaginationResponse<TransactionResponse> | undefined> {
  try {
    const res = await fetchUserTransactionsByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}
