import type { DefaultFiltersPayload, UserFiltersPayload } from '@/services/global.type'
import { usersQueryKeys } from '@/services/users/user-query-keys'
import {
  fetchFiltersUsers,
  fetchUserById,
  fetchUsersStats,
  updateUser,
} from '@/services/users/user-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { useCountryStore } from '../../stores/useCountryStore'
import type { UserUpdatePayload } from '@/services/users/user-type'
import { useFiltersStore } from '../../stores/useFiltersStore'

const { currentCountry: country } = storeToRefs(useCountryStore())
const useFilters = storeToRefs(useFiltersStore())



// Fonction utilitaire qui crée les paramètres de requête
const createQueryParams = () => ({
  page: useFilters.page?.value,
  q: useFilters.q?.value,
  sort_by: useFilters.sort_by?.value,
  sort_order: useFilters.sort_order?.value,
  active: useFilters.active?.value,
  country_id: country.value?.id,
  name_filter: useFilters.name_filter?.value,
  phone_verified: useFilters.phone_verified?.value,
})

const initialSearchFilters = reactive({
  q: undefined,
})





export function useUsersFiltersQuery() {
  const queryClient = useQueryClient()
  // const initialFilters: UserFiltersPayload = {
  //   q: undefined,
  //   page: 1,
  //   sort_by: undefined,
  //   active: undefined,
  //   sort_order: undefined,
  // }

  // const filters = reactive<UserFiltersPayload>({
  //   ...initialFilters,
  // })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({

      queryKey: usersQueryKeys.userFilters(
       {...createQueryParams()}
      ),
    })
  }


  const query = useQuery({
    queryKey: computed(() =>
      usersQueryKeys.userFilters({...createQueryParams()}),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersUsers({...createQueryParams()}),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: useFilters.q?.value,
      sort_by: useFilters.sort_by?.value,
      active: useFilters.active?.value,
      sort_order: useFilters.sort_order?.value,
      name_filter: useFilters.name_filter?.value,
      phone_verified: useFilters.phone_verified?.value,
      // country_id: country.value?.id,
    }),
    () => {
      useFilters.page.value = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    // filters,
    invalidateQuery,
  }
}
export function useSearchUsersFiltersQuery() {
  const queryClient = useQueryClient()




  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: usersQueryKeys.userSearchFilters(
       {q: initialSearchFilters.q}
      ),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      usersQueryKeys.userSearchFilters( {q: initialSearchFilters.q}),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersUsers( {q: initialSearchFilters.q, page: 1}),
  })


  watch(
    initialSearchFilters,
    () => {
      console.log("refetch search");
      
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filters: initialSearchFilters,
    invalidateQuery,
  }
}

export function useUsersStatsQuery(enabled: boolean = true) {
  return useQuery({
    enabled: enabled,
    queryKey: computed(() => usersQueryKeys.userStats({ country_code: country.value!.iso_code })),
    queryFn: ({ signal }) => fetchUsersStats({ country_id: country.value!.id }),
  })
}
export function useUserQuery(id: string) {
  return useQuery({
    queryKey: computed(() => usersQueryKeys.user({ id, country_id: country.value?.id! })),
    queryFn: ({ signal }) => fetchUserById({ id }),
    enabled: false,
  })
}

export function useUpdateUserMutation(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (payload: UserUpdatePayload) => updateUser({ id, data: payload }),
    
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.userFilters(createQueryParams()),
      })
    
      console.log('user update successfully')

    },
  })
}
