
import {
    createStockApi,
    createProductVariantStockApi,
    deleteProductVariantStockApi,
    fetchFiltersProductVariantStockApi,
    fetchFiltersStockApi,
    fetchStockByIdApi,
    updateStockApi,
    updateStockStatusApi,
    updateProductVariantStockApi,
    updateProductVariantStockStatusApi,
    fetchProductVariantStockByIdApi,
    deleteStockApi
} from './stock-api'
import type {
    StockCreatePayload,
    StockFiltersPayload,
    StockProductVariantCreatePayload,
    StockProductVariantFiltersPayload,
    StockProductVariantUpdatePayload,
    StockProductVariantResponse,
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

    // Sort orders by order date (most recent first)
    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at!)
      const dateB = new Date(b.created_at!)
      return dateB.getTime() - dateA.getTime()
    })

    return customData;

  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue lors de la récupération du stock')
  }
}
export async function fetchFiltersProductVariantStock(
  payload: StockProductVariantFiltersPayload,
): Promise<PaginationResponse<StockProductVariantResponse> | undefined> {
  try {
    const res = await fetchFiltersProductVariantStockApi({
      payload,
    })

    let customData = res?.data

    // Sort orders by order date (most recent first)
    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateB.getTime() - dateA.getTime()
    })

    return customData;
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

export async function fetchStockById(
  id: string,
): Promise<StockResponse | undefined> {
  try {
    const res = await fetchStockByIdApi({ id });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue lors de la récupération du produit');
  }
}

export async function deleteStock(
  id: string,
): Promise<any | undefined> {
  try {
    const res = await deleteStockApi({ id });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue lors de la suppression du produit');
  }
}

export async function createProductVariantStock({
  data,
}: {
  data: StockProductVariantCreatePayload
}): Promise<StockProductVariantResponse | undefined> {
  try {
    const res = await createProductVariantStockApi({ data });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue durant la création de la variante du produit');
  }
}

export async function fetchProductVariantStockById(
  id: string,
): Promise<StockProductVariantResponse | undefined> {
  try {
    const res = await fetchProductVariantStockByIdApi({ id });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue lors de la récupération de la variante du produit');
  }
}

export async function updateProductVariantStock({
  id,
  data,
}: {
  id: string
  data: StockProductVariantUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateProductVariantStockApi({ id, data });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue durant la mise à jour de la variante du produit');
  }
}

export async function updateProductVariantStockStatus({
  id,
  data,
}: {
  id: string
  data: StockStatusUpdatePayload
}): Promise<any | undefined> {
  try {
    const res = await updateProductVariantStockStatusApi({ id, data });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue durant la mise à jour du statut de la variante');
  }
}

export async function deleteProductVariantStock(
  id: string,
): Promise<any | undefined> {
  try {
    const res = await deleteProductVariantStockApi({ id });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue lors de la suppression de la variante du produit');
  }
}