import type { DefaultFiltersPayload } from '../global.type'
import {
  createCategoryApi,
  deleteCategoryApi,
  fetchCategoriesApi,
  fetchCategoryByIdApi,
  fetchFiltersCategoriesApi,
  updateCategoryApi,
} from './category-api'
import type { CategoryRequest, CategoryResponse } from './category-type'

export async function fetchFiltersCategories(
  payload?: DefaultFiltersPayload,
): Promise<PaginationResponse<CategoryResponse> | undefined> {
  try {
    const res = await fetchFiltersCategoriesApi(payload)
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || error.message)
  }
}

export async function fetchCategories(
 
): Promise<PaginationResponse<CategoryResponse> | undefined> {
  try {
    const res = await fetchCategoriesApi()
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || error.message)
  }
}

export async function fetchCategoryById(id: string): Promise<CategoryResponse | undefined> {
  try {
    const res = await fetchCategoryByIdApi({ id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.message || error.message)
  }
}

export async function createCategory(data: CategoryRequest): Promise<CategoryResponse | undefined> {
  try {
    const res = await createCategoryApi(data)
    return res?.data
  } catch (error: any) {
    console.log(error)
    throw Error(error.response?.data?.error || error.response?.data?.message || error.message)
  }
}

export async function updateCategory(
  id: string,
  data: Partial<CategoryRequest>,
): Promise<CategoryResponse | undefined> {
  try {
    const res = await updateCategoryApi({ id, data })
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.error || error.response?.data?.message || error.message)
  }
}

export async function deleteCategory(id: string): Promise<any | undefined> {
  try {
    const res = await deleteCategoryApi({ id })
    return res?.data
  } catch (error: any) {
    throw Error(error.response?.data?.error || error.response?.data?.message || error.message)
  }
}