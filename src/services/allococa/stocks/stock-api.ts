import { env } from '@/config/env';

import { mockProductsResponse } from '@/mocks/allococa/products.mock.response';
import { Http } from '@/services/Http';
import { StockProductVariantApi, StockRouteApi } from './stock-constants';
import type {
    StockCreatePayload,
    StockFiltersPayload,
    StockProductVariantFiltersPayload,
    StockProductVariantResponse,
    StockQuantityUpdatePayload,
    StockResponse,
    StockStatusUpdatePayload,
    StockUpdatePayload,
} from './stock-type';


export async function fetchFiltersStockApi({
  payload,
}: {
  payload: StockFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<StockResponse>> | undefined> {
  if (env.VITE_MOCK_API == 'true') {
    // TODO: remove this once you have auth
    return Promise.resolve(mockProductsResponse as SuccessResponse<PaginationResponse<StockResponse>>) ;
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<StockResponse>>>(
    StockRouteApi.filter,
    payload,
  )

  return result
}
export async function fetchFiltersProductVariantStockApi({
  payload,
}: {
  payload: StockProductVariantFiltersPayload
}): Promise<SuccessResponse<PaginationResponse<StockProductVariantResponse>> | undefined> {
  // if (env.VITE_MOCK_API == 'true') {
  //   // TODO: remove this once you have auth
  //   return Promise.resolve(mockProductsResponse as SuccessResponse<PaginationResponse<StockResponse>>) ;
  // }
  const result = await Http.get<SuccessResponse<PaginationResponse<StockProductVariantResponse>>>(
    StockProductVariantApi.default,
    payload,
  )

  return result
}

export async function createStockApi({
  data,
}: {
  data: StockCreatePayload
}): Promise<SuccessResponse<StockResponse> | undefined> {
  return await Http.post<SuccessResponse<StockResponse>>(StockRouteApi.create, data)
}

export async function updateStockApi({
  id,
  data,
}: {
  id: string
  data: StockUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${StockRouteApi.default}/${id}`, data)
}

export async function updateStockStatusApi({
  id,
  data,
}: {
  id: string
  data: StockStatusUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(`${StockRouteApi.updateStatus(id)}`, data)
}


export async function fetchStockByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<StockResponse> | undefined> {
  if (env.VITE_MOCK_API == 'true') {
    // TODO: remove this once you have auth
    const mockProduct = mockProductsResponse.data.items.find(product => product.id === id)
    if (mockProduct) {
      return Promise.resolve({
        code: 200,
        msg: 'Stock successfully retrieved',
        data: mockProduct
      } as SuccessResponse<StockResponse>)
    }
  }
  
  return await Http.get<SuccessResponse<StockResponse>>(
    StockRouteApi.getOne(id),
  )
}
