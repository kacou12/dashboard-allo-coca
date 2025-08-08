
import type { DefaultFiltersPayload } from '@/services/global.type'
import { massPaymentQueryKeys } from '@/services/mass-payment/mass-payment-query-keys'
import { createMassPayment, fetchFiltersMassPayments } from '@/services/mass-payment/mass-payment-service'
import type { MassPaymentRequest } from '@/services/mass-payment/mass-payment-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

export function useMassPaymentFiltersQuery() {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
    dates: [new Date(), new Date()],
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: massPaymentQueryKeys.massPaymentFilters({
        ...filters,
        // country_iso_code: country.value?.iso_code,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      massPaymentQueryKeys.massPaymentFilters({
        ...filters,
        // country_iso_code: country.value?.iso_code,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersMassPayments({
        ...filters,
        // country_iso_code: country.value?.iso_code,
      }),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: filters.q,
      // page: filters.page,
      dates: filters.dates,
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

export function useCreateMassPaymentMutation() {
  const { invalidateQuery } = useMassPaymentFiltersQuery();

  return useMutation({
    mutationFn: (payload: MassPaymentRequest) =>
      createMassPayment( payload ),
    onSuccess: () => {
      invalidateQuery();
    },
  });
}
