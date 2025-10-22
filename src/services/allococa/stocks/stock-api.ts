import { env } from '@/config/env';

import { mockProductsResponse } from '@/mocks/allococa/products.mock.response';
import { Http } from '@/services/Http';
import { StockProductVariantApi, StockRouteApi } from './stock-constants';
import type {
  StockCreatePayload,
  StockFiltersPayload,
  StockProductVariantCreatePayload,
  StockProductVariantFiltersPayload,
  StockProductVariantResponse,
  StockProductVariantUpdatePayload,
  StockResponse,
  StockStatusUpdatePayload,
  StockUpdatePayload
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
  
  const formData = new FormData()

  formData.append('name', data.name!)
  formData.append('description', data.description!)
  formData.append('category_id', data.category_id!)
  formData.append('image', data.image!)
 
  return await Http.post<SuccessResponse<StockResponse>>(StockRouteApi.create, formData,
    {
      headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  )
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
  return await Http.patch<SuccessResponse<any>>(`${StockRouteApi.updateStatus(id)}`, data)
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

export async function deleteStockApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(StockRouteApi.getOne(id))
}


export async function createProductVariantStockApi({
  data,
}: {
  data: StockProductVariantCreatePayload
}): Promise<SuccessResponse<StockProductVariantResponse> | undefined> {
    const formData = new FormData()
  formData.append('product_id', data.product_id!)
  formData.append('size', data.size!.toString())
  formData.append('description', data.description!)
  formData.append('sort_order', data.sort_order!.toString())
  formData.append('quantity', data.quantity!.toString())
  formData.append('unit_price', data.unit_price!.toString())

  if(data.label){
    formData.append('label', data.label!)

  }
  if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append('images', image)
      })
  }

  
  return  Http.post<SuccessResponse<StockProductVariantResponse>>(StockProductVariantApi.create, formData,
      {
      headers: {
    'Content-Type': 'multipart/form-data',
  },
    }
  )
}

// AJOUTS CI-DESSOUS ▼

/**
 * Récupère une variante de produit en stock par son ID.
 */
export async function fetchProductVariantStockByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<StockProductVariantResponse> | undefined> {
  return await Http.get<SuccessResponse<StockProductVariantResponse>>(
    StockProductVariantApi.getOne(id), // Note : Assurez-vous que getOne(id) existe dans vos constantes
  )
}

/**
 * Met à jour les informations d'une variante de produit en stock.
 */
export async function updateProductVariantStockApi({
  id,
  data,
}: {
  id: string
  data: StockProductVariantUpdatePayload // Note : Assurez-vous que ce type est défini
}): Promise<SuccessResponse<any> | undefined> {
  const formData = new FormData()
  formData.append('size', data.size!.toString())
  formData.append('description', data.description!)
  formData.append('unit_price', data.unit_price!.toString())

  if(data.label){

    formData.append('label', data.label!)
  }
  if(data.image){

    formData.append('image', data.image!)
  }

  if(data.icon_image){

    formData.append('icon_image', data.icon_image!)
  }


  // if (data.images && data.images.length > 0) {
  //     data.images.forEach((image) => {
  //       formData.append('images', image)
  //     })
  // }

  return await Http.put<SuccessResponse<any>>(`${StockProductVariantApi.default}/${id}`, formData, 
    {
      headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// export async function depositRequestApi({
//   data,
// }: {
//   data: MerchantDepositRequest
// }): Promise<SuccessResponse<any> | undefined> {
//   const formData = new FormData()

//   formData.append('file_url', data.file_url!)
//   formData.append('bank', data.bank!)
//   formData.append('amount', data.amount!.toString())
//   formData.append('type', MerchantRequestTypeEnum.Deposit)

//   return await Http.post<SuccessResponse<any>>(MerchantRequestsRouteApi.default, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
// }

export async function updateProductVariantStockStatusApi({
  id,
  data,
}: {
  id: string
  data: StockStatusUpdatePayload
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.patch<SuccessResponse<any>>(`${StockProductVariantApi.updateStatus(id)}`, data)
}



/**
 * Supprime une variante de produit du stock.
 */
export async function deleteProductVariantStockApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${StockProductVariantApi.default}/${id}`)
}