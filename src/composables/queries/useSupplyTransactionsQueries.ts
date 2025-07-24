import { supplyTransactionQueryKeys } from '@/services/supply-transactions/supply-transaction-query-keys'
import {
    createSupplyTransaction,
    fetchFiltersSupplyTransactions
} from '@/services/supply-transactions/supply-transaction-service'
import type {
    SupplyTransactionPayload
} from '@/services/supply-transactions/supply-transaction-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useCountryStore } from '@/stores/useCountryStore'
import { useTransactionFiltersStore } from '@/stores/useTransactionFilterStore'

const { currentCountry: country } = storeToRefs(useCountryStore())
const transactionFilters = storeToRefs(useTransactionFiltersStore())

export function useSupplyTransactionsFiltersQuery(user_id?: string) {
  const queryClient = useQueryClient()

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: supplyTransactionQueryKeys.supplyTransactionFilters({
        limit: transactionFilters!.limit.value,
        page: transactionFilters?.page.value,
        q: transactionFilters?.q.value,
        beneficiary_provider: transactionFilters?.beneficiary_provider.value,
        beneficiary_country_iso_code: transactionFilters?.beneficiary_country_iso_code.value,
        payer_provider: transactionFilters?.payer_provider.value,
        status: transactionFilters?.status.value,
        type: transactionFilters?.type.value,
        user_id: user_id,
        country_iso_code: country.value?.iso_code,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      supplyTransactionQueryKeys.supplyTransactionFilters({
        limit: transactionFilters!.limit.value,
        page: transactionFilters?.page.value,
        q: transactionFilters?.q.value,
        beneficiary_provider: transactionFilters?.beneficiary_provider.value,
        beneficiary_country_iso_code: transactionFilters?.beneficiary_country_iso_code.value,
        payer_provider: transactionFilters?.payer_provider.value,
        status: transactionFilters?.status.value,
        type: transactionFilters?.type.value,
  
        user_id: user_id,
        country_iso_code: country.value?.iso_code,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersSupplyTransactions({
        limit: transactionFilters!.limit.value,
        page: transactionFilters?.page.value,
        q: transactionFilters?.q.value,
        beneficiary_provider: transactionFilters?.beneficiary_provider.value,
        beneficiary_country_iso_code: transactionFilters?.beneficiary_country_iso_code.value,
        payer_provider: transactionFilters?.payer_provider.value,
        status: transactionFilters?.status.value,
        type: transactionFilters?.type.value,
        user_id: user_id,
        country_iso_code: country.value?.iso_code,
        // age: 'test'
      }),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      limit: transactionFilters.limit.value,
      beneficiary_country_iso_code: transactionFilters.beneficiary_country_iso_code.value,
      q: transactionFilters.q.value,
      beneficiary_provider: transactionFilters.beneficiary_provider.value,
      payer_provider: transactionFilters.payer_provider.value,
      status: transactionFilters.status.value,
      type: transactionFilters.type.value,
    //   has_relaunch_payment: transactionFilters?.has_relaunch_payment.value,
    }),
    () => {
      transactionFilters.page.value = 1
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

export function useCreateSupplyTransactionMutation() {
  const { invalidateQuery } = useSupplyTransactionsFiltersQuery()
  return useMutation({
    mutationFn: (payload: SupplyTransactionPayload) => createSupplyTransaction({  payload: payload }),

    onSuccess: () => {
     
      invalidateQuery()
    },
  })
}

