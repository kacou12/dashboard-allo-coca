import { categoriesQueryKeys } from '@/services/category/category-query-keys'
import {
    fetchCategories,
    fetchCategoryById
} from '@/services/category/category-service'

import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'


export function useCategoriesQuery() {
  return useQuery({
    queryKey: computed(() => categoriesQueryKeys.all),
    queryFn: ({ signal }) => fetchCategories(),
    // enabled: false,
  })
}

export function useCategoryQuery(id: string) {
  return useQuery({
    queryKey: computed(() => categoriesQueryKeys.category(id)),
    queryFn: ({ signal }) => fetchCategoryById(id),

  })
}
