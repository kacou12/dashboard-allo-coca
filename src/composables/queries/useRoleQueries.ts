import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { useCountryStore } from '../../stores/useCountryStore'
import type { DefaultFiltersPayload } from '@/services/global.type'

import {
  addNewPermissionsToRole,
  createRoleAdmin,
  deleteOnePermissionAdmin,
  deleteRoleAdmin,
  fetchRoleById,
  fetchRoles,
  updateRoleAdmin,
} from '@/services/admin/admin-service'

import { adminQueryKeys } from '@/services/admin/admin-query-keys'
import type {
  AdminRoleRequest,
  AdminRoleUpdatePayload,
  PermissionRequest,
} from '@/services/admin/admin-type'
import type { AdminPolicyPayload } from '@/services/auth/auth-type'

const { currentCountry: country } = storeToRefs(useCountryStore())

export function useRoleFiltersQuery(enabled: boolean = true) {
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
      queryKey: adminQueryKeys.rolesFilters({
        ...filters,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      adminQueryKeys.rolesFilters({
        ...filters,
      }),
    ),

    queryFn: ({ signal }) => fetchRoles(filters.page),
    // enabled: enabled,
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: filters.q,
      // country_id: country.value?.id,
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

export function useRoleQuery(id: string) {
  return useQuery({
    queryKey: computed(() => adminQueryKeys.role({ id })),
    queryFn: ({ signal }) => fetchRoleById(id),
    // enabled: false,
  })
}

export function useCreateRoleMutation() {
  const { invalidateQuery } = useRoleFiltersQuery()
  return useMutation({
    mutationFn: (values: AdminRoleRequest) => createRoleAdmin(values),

    onSuccess: () => {
      console.log('create role successfully')

      invalidateQuery()
    },
  })
}

export function useUpdateRoleMutation() {
  const { invalidateQuery } = useRoleFiltersQuery()
  return useMutation({
    mutationFn: (payload: AdminRoleUpdatePayload) => updateRoleAdmin(payload),

    onSuccess: () => {
      console.log('update role successfully')

      invalidateQuery()
    },
  })
}

export function useAddNewPermissionsToRoleMutation(id: string) {
  const { invalidateQuery } = useRoleFiltersQuery()
  return useMutation({
    mutationFn: (payload: PermissionRequest[]) => addNewPermissionsToRole(id, payload),

    onSuccess: () => {
      console.log('update role successfully')

      invalidateQuery()
    },
  })
}

export function useDeleteRoleMutation() {
  const { invalidateQuery } = useRoleFiltersQuery()
  return useMutation({
    mutationFn: (payload: AdminPolicyPayload) => deleteOnePermissionAdmin(payload),

    onSuccess: () => {
      console.log('delete role successfully')

      invalidateQuery()
    },
  })
}
export function useDeleteOnePermissionMutation() {
  const { invalidateQuery } = useRoleFiltersQuery()
  return useMutation({
    mutationFn: (payload: AdminPolicyPayload) => deleteOnePermissionAdmin(payload),

    onSuccess: () => {
      console.log('delete role successfully')

      invalidateQuery()
    },
  })
}
