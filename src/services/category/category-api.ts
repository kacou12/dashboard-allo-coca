import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { CategoryRouteApi } from './category-constants'
import type { CategoryRequest, CategoryResponse } from './category-type'

export async function fetchFiltersCategoriesApi(
  payload?: DefaultFiltersPayload,
): Promise<SuccessResponse<PaginationResponse<CategoryResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<CategoryResponse>>>(
    CategoryRouteApi.default,
    payload,
  )
  return result
}
export async function fetchCategoriesApi(
  
): Promise<SuccessResponse<PaginationResponse<CategoryResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<CategoryResponse>>>(
    CategoryRouteApi.default,
    {
      page: 1,
      limit: 10
    },
  )
  return result
}

export async function fetchCategoryByIdApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<CategoryResponse> | undefined> {
  return await Http.get<SuccessResponse<CategoryResponse>>(`${CategoryRouteApi.default}/${id}`)
}

export async function createCategoryApi(
  data: CategoryRequest,
): Promise<SuccessResponse<CategoryResponse> | undefined> {
  const result = await Http.post<SuccessResponse<CategoryResponse>>(CategoryRouteApi.default, data)
  return result
}

export async function updateCategoryApi({
  id,
  data,
}: {
  id: string
  data: Partial<CategoryRequest>
}): Promise<SuccessResponse<CategoryResponse> | undefined> {
  return await Http.put<SuccessResponse<CategoryResponse>>(`${CategoryRouteApi.default}/${id}`, data)
}

export async function deleteCategoryApi({
  id,
}: {
  id: string
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(`${CategoryRouteApi.default}/${id}`)
}