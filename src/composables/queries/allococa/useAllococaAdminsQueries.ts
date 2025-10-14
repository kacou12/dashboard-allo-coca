import { getMidnightToday } from '@/lib/utils'
import { fetchOneAdmin } from '@/services/admin/admin-service'
import { clientQueryKeys } from '@/services/allococa/clients/client-query-keys'
import {
  createClient,
  deleteClient,
  fetchClients,
  updateClient,
} from '@/services/allococa/clients/client-service'

import type {
  ClientCreatePayload,
  ClientFiltersPayload,
  ClientUpdatePayload,
} from '@/services/allococa/clients/client-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

export function useAllococaAdminsFiltersQuery() {
  const queryClient = useQueryClient()

  const initialFilters: ClientFiltersPayload = {
    search: undefined,
    page: 1,
    limit: 10,
    dates: [getMidnightToday(), new Date()],
    status: undefined,
    role: "admin",
  }

  const filters = reactive<ClientFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: clientQueryKeys.admins(filters),
    })
  }

  const query = useQuery({
    queryKey: computed(() => clientQueryKeys.admins(filters)),

    queryFn: ({ signal }) => fetchClients(filters),
  })

  watch(
    () => ({
      q: filters.search,
      dates: filters.dates,
      status: filters.status,
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

export function useAdminQuery(id: string) {
  return useQuery({
    queryKey: computed(() => clientQueryKeys.admin(id)),
    queryFn: ({ signal }) => fetchOneAdmin({ id }),
    enabled: false,
  })
}

