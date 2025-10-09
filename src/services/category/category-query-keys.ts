import type { DefaultFiltersPayload } from '../global.type'

export const categoriesQueryKeys = {
  all: ['categories'] as const,
  categoriesFilters: (payload: DefaultFiltersPayload) =>
    [
      'categoriesFilters',
      payload.page,
      payload.q,
    ] as const,
  category: (id: string) => [...categoriesQueryKeys.all, id] as const,
}