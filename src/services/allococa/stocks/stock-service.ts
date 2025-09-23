
import {
    createStockApi,
    fetchFiltersStockApi,
    updateStockApi,
    updateStockStatusApi
} from './stock-api'
import type {
    StockCreatePayload,
    StockFiltersPayload,
    StockResponse,
    StockStatusUpdatePayload,
    StockUpdatePayload
} from './stock-type'

export async function fetchFiltersStock(
  payload: StockFiltersPayload,
): Promise<PaginationResponse<StockResponse> | undefined> {
  try {
    const res = await fetchFiltersStockApi({
      payload,
    })

    let customData = res?.data

    // Sort stock by product name alphabetically
    customData?.items.sort((a, b) => {
      return a.product_name.localeCompare(b.product_name)
    })

    return customData
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue lors de la récupération du stock')
  }
}

export async function createStock({
  data,
}: {
  data: StockCreatePayload
}): Promise<StockResponse | undefined> {
  try {
    const res = await createStockApi({
      data: data,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue durant la création du produit')
  }
}

export async function updateStock({
  id,
  data,
}: {
  id: string
  data: StockUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateStockApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue durant la mise à jour du produit')
  }
}

export async function updateStockStatus({
  id,
  data,
}: {
  id: string
  data: StockStatusUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateStockStatusApi({
      data: data,
      id: id,
    })

    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue durant la mise à jour du statut')
  }
}