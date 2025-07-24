import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'
// import { AdminAlertsQueryKeys } from './admin-alerts-query-keys'
// import {
//   createAdminAlertApi,
//   deleteAdminAlertApi,
//   fetchAdminAlertsApi,
//   fetchAdminAlertByIdApi,
//   updateAdminAlertApi,
//   resolveAdminAlertApi,
// } from './admin-alerts-api'

import { AdminAlertsQueryKeys } from '@/services/admin-alerts/admin-alerts-query-keys'
import {
  createAdminAlert,
  fetchAdminAlertById,
  fetchAdminAlerts,
  updateAdminAlert,
} from '@/services/admin-alerts/admin-alerts-service'
import type { DefaultFiltersPayload } from '@/services/global.type'
import type {
  AdminAlertRequest,
  AdminAlertUpdatePayload,
} from '@/services/admin-alerts/admin-alerts-type'

export function useAdminAlertsFiltersQuery(enabled: boolean = true) {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: AdminAlertsQueryKeys.lists(),
    })
  }

  const query = useQuery({
    queryKey: computed(() => AdminAlertsQueryKeys.lists()),
    queryFn: ({ signal }) => fetchAdminAlerts({ ...filters }),
    enabled: enabled,
  })

  watch(
    () => ({
      q: filters.q,
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

export function useAdminAlertQuery(id: string) {
  return useQuery({
    queryKey: computed(() => AdminAlertsQueryKeys.details(id)),
    queryFn: ({ signal }) => fetchAdminAlertById({ id }),
    enabled: false,
  })
}

export function useCreateAdminAlertMutation() {
  const { invalidateQuery } = useAdminAlertsFiltersQuery()
  return useMutation({
    mutationFn: (values: AdminAlertRequest) => createAdminAlert({ data: values }),
    onSuccess: () => {
      console.log('Admin alert created successfully')
      invalidateQuery()
    },
  })
}

export function useUpdateAdminAlertMutation(id: string) {
  const { invalidateQuery } = useAdminAlertsFiltersQuery()
  return useMutation({
    mutationFn: (payload: AdminAlertUpdatePayload) => updateAdminAlert({ id, data: payload }),
    onSuccess: () => {
      console.log('Admin alert updated successfully')
      invalidateQuery()
    },
  })
}
