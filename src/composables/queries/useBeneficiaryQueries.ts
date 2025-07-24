import { beneficiariesQueryKeys } from '@/services/beneficiaries/beneficiary-query-keys'
import {
    createBeneficiary,
    deleteBeneficiary,
    fetchBeneficiaryById,
    fetchFiltersBeneficiaries,
    updateBeneficiary,
} from '@/services/beneficiaries/beneficiary-service'
import type { BeneficiaryRequest, BeneficiaryUpdatePayload } from '@/services/beneficiaries/beneficiary-type'
import type { DefaultFiltersPayload } from '@/services/global.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'



export function useBeneficiariesFiltersQuery(limit?: number) {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
    limit: limit ?? 10,
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: beneficiariesQueryKeys.beneficiariesFilters({
        ...filters,
        // country: country.value?.id,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      beneficiariesQueryKeys.beneficiariesFilters({
        ...filters,
        // country: country.value?.id,
      }),
    ),
    queryFn: ({ signal }) => fetchFiltersBeneficiaries(filters),
  })
  
  // si les autres filtre a part la page change , on reset la page courante
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

export function useBeneficiaryQuery(id: string) {
  return useQuery({
    queryKey: computed(() => beneficiariesQueryKeys.beneficiary({ id })),
    queryFn: ({ signal }) => fetchBeneficiaryById({ id }),
    enabled: false,
  })
}

export function useCreateBeneficiaryMutation() {
  const { invalidateQuery } = useBeneficiariesFiltersQuery()
  return useMutation({
    mutationFn: (values: BeneficiaryRequest) => createBeneficiary({ data: values }),

    onSuccess: () => {
      console.log('create beneficiary successfully')

      invalidateQuery()
    },
  })
}

export function useUpdateBeneficiaryMutation(id: string) {
  const { invalidateQuery } = useBeneficiariesFiltersQuery()
  return useMutation({
    mutationFn: (payload: BeneficiaryUpdatePayload) => updateBeneficiary({ id, data: payload }),

    onSuccess: () => {
      console.log('update beneficiary successfully')

      invalidateQuery()
    },
  })
}

export function useDeleteBeneficiaryMutation(id: string) {
  const { invalidateQuery } = useBeneficiariesFiltersQuery()
  return useMutation({
    mutationFn: () => deleteBeneficiary({ id }),

    onSuccess: () => {
      console.log('delete beneficiary successfully')

      invalidateQuery()
    },
  })
}