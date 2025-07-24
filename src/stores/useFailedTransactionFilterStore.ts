import type { TransactionFiltersPayload, UserFiltersPayload } from '@/services/global.type'
import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCountryStore } from './useCountryStore'
import { AppRoute } from '@/constants/app-route'

const initialFilters: TransactionFiltersPayload = {
  q: undefined,
  page: 1,
  beneficiary_provider: undefined,
  beneficiary_country_iso_code: undefined,
  payer_provider: undefined,
  status: undefined,
  type: undefined,
  // has_relaunch_payment: true,
  //   user_id: undefined,
  limit: 10,
}

export const useFailedTransactionFilterStore = defineStore('TransactionFailedfilters', () => {
  const q = ref(initialFilters.q)
  const page = ref(initialFilters.page)
  const beneficiary_provider = ref(initialFilters.beneficiary_provider)
  const beneficiary_country_iso_code = ref(initialFilters.beneficiary_country_iso_code)
  const payer_provider = ref(initialFilters.payer_provider)
  const status = ref(initialFilters.status)
  const type = ref(initialFilters.type)
  // const has_relaunch_payment = ref(initialFilters.has_relaunch_payment)
  //   const user_id = ref(initialFilters.user_id)
  const limit = ref(initialFilters.limit)
  const country_iso_code = ref(initialFilters.country_iso_code)

  const route = useRoute()



  watch(
    () => route.name,
    (n, o) => {
      if (
        q.value != initialFilters.q ||
        page.value != initialFilters.page ||
        beneficiary_provider.value != initialFilters.beneficiary_provider ||
        beneficiary_country_iso_code.value != initialFilters.beneficiary_country_iso_code ||
        payer_provider.value != initialFilters.payer_provider ||
        status.value != initialFilters.status ||
        type.value != initialFilters.type ||
        limit.value != initialFilters.limit ||         
        // has_relaunch_payment.value != initialFilters.has_relaunch_payment ||         
        country_iso_code.value != initialFilters.country_iso_code
      ) {
        q.value = initialFilters.q
        page.value = initialFilters.page
        beneficiary_provider.value = initialFilters.beneficiary_provider
        beneficiary_country_iso_code.value = initialFilters.beneficiary_country_iso_code
        payer_provider.value = initialFilters.payer_provider
        status.value = initialFilters.status
        type.value = initialFilters.type
        limit.value = initialFilters.limit
        // has_relaunch_payment.value = initialFilters.has_relaunch_payment
        country_iso_code.value = initialFilters.country_iso_code
      }
     
    },
  )

  //   watch(
  //   () => route.name,
  //   (n, o) => {
  //     if (n == AppRoute.RECENT_REFUND_TRANSACTIONS.name) {
  //       has_relaunch_payment.value = true;
  //     }else{
  //       has_relaunch_payment.value = undefined
  //     }
  //   },
  // )

  return {
    q,
    page,
    beneficiary_provider,
    beneficiary_country_iso_code,
    payer_provider,
    status,
    type,
    // user_id,
    limit,
    country_iso_code,
    // has_relaunch_payment
  }
})
