import { userVerificationsQueryKeys } from '@/services/user-verification/user-verification-query-keys'
import {
  fetchFiltersUsersVerification,
  fetchUsersVerificationStats,
  fetchUserVerificationById,
  updateUserVerification,
} from '@/services/user-verification/user-verification-service'
import type { UpdateUserVerificationPayload } from '@/services/user-verification/user-verification.type'
import { useUsersVerificationFiltersStore } from '@/stores/useUsersVerificationFilterStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useCountryStore } from '../../stores/useCountryStore'

const { currentCountry: country } = storeToRefs(useCountryStore())
const useFilters = storeToRefs(useUsersVerificationFiltersStore())

const createQueryParams = () => ({
   page: useFilters.page?.value,
        q: useFilters.q?.value,
        status: useFilters.status.value,
        country_id: country.value?.id,
        dates: useFilters.dates?.value,
        typeDoc: useFilters.typeDoc?.value,
})

export function useUsersVerificationFiltersQuery() {
  const queryClient = useQueryClient()

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: userVerificationsQueryKeys.userVerificationFilters({
        page: useFilters.page?.value,
        q: useFilters.q?.value,
        status: useFilters.status.value,
        country_id: country.value?.id,
        dates: useFilters.dates?.value,
        typeDoc: useFilters.typeDoc?.value,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      userVerificationsQueryKeys.userVerificationFilters({
        page: useFilters.page?.value,
        q: useFilters.q?.value,
        status: useFilters.status.value,
        dates: useFilters.dates?.value,
        typeDoc: useFilters.typeDoc?.value,
        country_id: country.value?.id,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersUsersVerification({
        page: useFilters.page?.value,
        q: useFilters.q?.value,
        status: useFilters.status.value,
        dates: useFilters.dates?.value,
        typeDoc: useFilters.typeDoc?.value,
        country_id: country.value?.id,
      }),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: useFilters.q?.value,
      status: useFilters.status.value,
      // country_id: country.value?.id,
      // page: useFilters.page?.value,
      dates: useFilters.dates?.value,
      typeDoc: useFilters.typeDoc?.value,
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

export function useUsersVerificationStatsQuery(enabled: boolean = true) {
  return useQuery({
    enabled: enabled,
    queryKey: computed(() =>
      userVerificationsQueryKeys.userVerificationStats({ country: country.value!.iso_code }),
    ),
    queryFn: ({ signal }) => fetchUsersVerificationStats({ country_id: country.value!.id }),
  })
}
export function useUserVerificationQuery(id: string) {
  return useQuery({
    queryKey: computed(() =>
      userVerificationsQueryKeys.userVerification({ id, country: country.value?.id! }),
    ),
    queryFn: ({ signal }) => fetchUserVerificationById({ id }),
    enabled: false,
  })
}

export function useUpdateUserVerificationMutation(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateUserVerificationPayload) =>
      updateUserVerification({ id, data: payload }),
    
    onSuccess: () => {
      queryClient.invalidateQueries({
              queryKey: userVerificationsQueryKeys.userVerificationFilters(createQueryParams()),
            })
      console.log('user verification update successfully')

    },
  })
}
