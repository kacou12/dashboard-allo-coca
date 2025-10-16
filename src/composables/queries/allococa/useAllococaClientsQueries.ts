import { getMidnightToday } from '@/lib/utils'
import { clientQueryKeys } from '@/services/allococa/clients/client-query-keys'
import {
  createClient,
  deleteClient,
  fetchClients,
  fetchOneClient,
  updateClient,
} from '@/services/allococa/clients/client-service'

import type {
  ClientCreatePayload,
  ClientFiltersPayload,
  ClientUpdatePayload,
} from '@/services/allococa/clients/client-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

export function useAllococaClientsFiltersQuery() {
  const queryClient = useQueryClient()

  const initialFilters: ClientFiltersPayload = {
    search: undefined,
    page: 1,
    limit: 7,
    dates: [getMidnightToday(), new Date()],
    status: undefined,
    role: "customer",
  }

  const filters = reactive<ClientFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: clientQueryKeys.clients(filters),
    })
  }

  const query = useQuery({
    queryKey: computed(() => clientQueryKeys.clients(filters)),

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

export function useClientQuery(id: string) {
  return useQuery({
    queryKey: computed(() => clientQueryKeys.client(id)),
    queryFn: ({ signal }) => fetchOneClient({ id }),
  })
}



export function useCreateAllococaClientMutation() {
  const { invalidateQuery } = useAllococaClientsFiltersQuery()
  return useMutation({
    mutationFn: (data: ClientCreatePayload) => createClient({ data }),

    onSuccess: () => {
      console.log('create client successfully')
      invalidateQuery()
    },
  })
}

export function useUpdateAllococaClientMutation(id: string) {
  const { invalidateQuery } = useAllococaClientsFiltersQuery()
  return useMutation({
    mutationFn: (data: ClientUpdatePayload) => updateClient({ id, data }),

    onSuccess: () => {
      console.log('update client successfully')
      invalidateQuery()
    },
  })
}

export function useDeleteAllococaClientMutation() {
  const { invalidateQuery } = useAllococaClientsFiltersQuery()
  return useMutation({
    mutationFn: (id: string) => deleteClient({ id }),

    onSuccess: () => {
      console.log('delete client successfully')
      invalidateQuery()
    },
  })
}