import { fetchAdminByIdApi } from '@/services/admin/admin-api'
import { adminQueryKeys } from '@/services/admin/admin-query-keys'
import {
  createAdmin,
  fetchFiltersAdmins,
  fetchOneAdmin,
  updateAdmin,
} from '@/services/admin/admin-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'
import type { AdminRequest, AdminUpdatePayload } from '../../services/admin/admin-type'
import { useCountryStore } from '../../stores/useCountryStore'
import { useLoaderStore } from '../../stores/useLoaderStore'
import type { DefaultFiltersPayload } from '@/services/global.type'

const { currentCountry: country } = storeToRefs(useCountryStore())

export function useAdminsFiltersQuery() {
  const queryClient = useQueryClient()
  // const queryClient = VueQueryPlugin
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: adminQueryKeys.adminFilters({
        ...filters,
        //  country: country.value?.id
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      adminQueryKeys.adminFilters({
        ...filters,

        // country: country.value?.id,
      }),
    ),

    queryFn: ({ signal }) =>
      fetchFiltersAdmins({
        ...filters,
        // country: country.value?.id,
      }),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: filters.q,
      // country: country.value?.id,
    }),
    () => {
      filters.page = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filters,
    invalidateQuery,
  }
}

// export function useAdminQuery(id: string) {
//   return useQuery({
//     queryKey: computed(() => adminQueryKeys.admin({ id, country: country.value?.id! })),
//     queryFn: ({ signal }) => fetchOneAdmin({ id }),
//     enabled: false,
//   })
// }

export function useCreateAdminMutation() {
  const { invalidateQuery } = useAdminsFiltersQuery()
  return useMutation({
    mutationFn: (values: AdminRequest) => createAdmin(values),

    onSuccess: () => {
      console.log('create admin successfully')

      invalidateQuery()
    },
  })
}
export function useUpdateAdminMutation(id: string) {
  const { invalidateQuery } = useAdminsFiltersQuery()
  return useMutation({
    mutationFn: (payload: AdminUpdatePayload) => updateAdmin({ id, data: payload }),

    onSuccess: () => {
      console.log('create admin successfully')

      // invalidateQuery()
    },
  })
}
