import type { TransactionFiltersPayload } from '@/services/global.type'
import { transactionQueryKeys } from '@/services/transactions/transaction-query-keys'
import {
  createTransfertTransaction,
  fetchFiltersTransactions,
  fetchUserTransactions,
  relaunchTransactions,
  updateTransaction,
  updateTransactionStatus,
} from '@/services/transactions/transaction-service'
import type {
  TransactionStatutUpdatePayload,
  TransactionUpdatePayload,
  TransfertTransactionPayload,
} from '@/services/transactions/transaction-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'
import { useCountryStore } from '../../stores/useCountryStore'
import { useTransactionFiltersStore } from '../../stores/useTransactionFilterStore'
import { useFailedTransactionFilterStore } from '@/stores/useFailedTransactionFilterStore'

const { currentCountry: country } = storeToRefs(useCountryStore())
const transactionFilters = storeToRefs(useTransactionFiltersStore())
const transactionFailedFilters = storeToRefs(useFailedTransactionFilterStore())

export function useTransactionsFiltersQuery(user_id?: string) {
  const queryClient = useQueryClient()

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: transactionQueryKeys.transactionFilters({
        limit: transactionFilters!.limit.value,
        page: transactionFilters?.page.value,
        q: transactionFilters?.q.value,
        beneficiary_provider: transactionFilters?.beneficiary_provider.value,
        beneficiary_country_iso_code: transactionFilters?.beneficiary_country_iso_code.value,
        payer_provider: transactionFilters?.payer_provider.value,
        status: transactionFilters?.status.value,
        type: transactionFilters?.type.value,
        has_relaunch_payment: transactionFilters?.has_relaunch_payment.value,
        user_id: user_id,
        country_iso_code: country.value?.iso_code,
      }),
    })
  }

  const query = useQuery({
    queryKey: computed(() =>
      transactionQueryKeys.transactionFilters({
        limit: transactionFilters!.limit.value,
        page: transactionFilters?.page.value,
        q: transactionFilters?.q.value,
        beneficiary_provider: transactionFilters?.beneficiary_provider.value,
        beneficiary_country_iso_code: transactionFilters?.beneficiary_country_iso_code.value,
        payer_provider: transactionFilters?.payer_provider.value,
        status: transactionFilters?.status.value,
        type: transactionFilters?.type.value,
        has_relaunch_payment: transactionFilters?.has_relaunch_payment.value,
        user_id: user_id,
        country_iso_code: country.value?.iso_code,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersTransactions({
        limit: transactionFilters!.limit.value,
        page: transactionFilters?.page.value,
        q: transactionFilters?.q.value,
        beneficiary_provider: transactionFilters?.beneficiary_provider.value,
        beneficiary_country_iso_code: transactionFilters?.beneficiary_country_iso_code.value,
        payer_provider: transactionFilters?.payer_provider.value,
        status: transactionFilters?.status.value,
        type: transactionFilters?.type.value,
        has_relaunch_payment: transactionFilters?.has_relaunch_payment.value,
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
      has_relaunch_payment: transactionFilters?.has_relaunch_payment.value,
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


export function useUpdateTransactionMutation(id: string) {
  const { invalidateQuery } = useTransactionsFiltersQuery()
  return useMutation({
    mutationFn: (payload: TransactionUpdatePayload) => updateTransaction({ id, data: payload }),

    onSuccess: () => {
      console.log('update transaction successfully')

      invalidateQuery()
    },
  })
}

export function useCreateTransfertTransactionMutation() {
  const { invalidateQuery } = useTransactionsFiltersQuery()
  return useMutation({
    mutationFn: (payload: TransfertTransactionPayload) => createTransfertTransaction({  payload: payload }),

    onSuccess: () => {
     
      invalidateQuery()
    },
  })
}


export function useUpdateTransactionStatusMutation(id: string) {
  const { invalidateQuery } = useTransactionsFiltersQuery()
  return useMutation({
    mutationFn: (payload: TransactionStatutUpdatePayload) =>
      updateTransactionStatus({ id, data: payload }),

    onSuccess: () => {
      console.log('update transaction status successfully')

      invalidateQuery()
    },
  })
}

export function useUserTransactionsQuery(id: string) {
  return useQuery({
    queryKey: computed(() => transactionQueryKeys.transaction({ id, country: country.value?.id! })),
    queryFn: ({ signal }) => fetchUserTransactions({ id }),
    // enabled: false,
  })
}
