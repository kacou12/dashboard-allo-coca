import type { DefaultFiltersPayload, UserFiltersPayload } from '../global.type'

export const usersQueryKeys = {
  user: ({ id, country_id }: { id: string; country_id: string }) => [
    'user',
    { id },
    { country_id },
  ],
  userStats: ({ country_code }: { country_code: string }) => ['userStats', { country_code }],
  userPagination: (page: number) => ['userPagination', { page }],
  userFilters: (payload: UserFiltersPayload) => [
    'usersFilters',
    { page: payload.page },
    { q: payload.q },
    // {country: payload.country},
    { sort_by: payload.sort_by },
    { active: payload.active },
    { sort_order: payload.sort_order },
    { name_filter: payload.name_filter },
    { phone_verified: payload.phone_verified },
  ],
  userSearchFilters: (payload: {q?: string}) => [
    'userSearchFilters',
    { q: payload.q },
   
  ],
}
