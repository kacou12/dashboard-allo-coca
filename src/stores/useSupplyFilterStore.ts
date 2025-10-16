import type { SupplyFiltersPayload } from "@/services/global.type";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const initialFilters: SupplyFiltersPayload = {
  q: undefined,
  page: 1,
  status: undefined,
  type: undefined,
  // has_relaunch_payment: undefined,
  //   user_id: undefined,
  limit: 7,
};

export const useSupplyFiltersStore = defineStore(
  "useSupplyFiltersStore",
  () => {
    const q = ref(initialFilters.q);
    const page = ref(initialFilters.page);
    const status = ref(initialFilters.status);
    const type = ref(initialFilters.type);
    // const has_relaunch_payment = ref(initialFilters.has_relaunch_payment)
    //   const user_id = ref(initialFilters.user_id)
    const limit = ref(initialFilters.limit);
    const country_iso_code = ref(initialFilters.country_iso_code);

    const route = useRoute();

    watch(
      () => route.name,
      (n, o) => {
        if (
          q.value != initialFilters.q ||
          page.value != initialFilters.page ||
          status.value != initialFilters.status ||
          type.value != initialFilters.type ||
          limit.value != initialFilters.limit ||
          // has_relaunch_payment.value != initialFilters.has_relaunch_payment ||
          country_iso_code.value != initialFilters.country_iso_code
        ) {
          q.value = initialFilters.q;
          page.value = initialFilters.page;
          status.value = initialFilters.status;
          type.value = initialFilters.type;
          limit.value = initialFilters.limit;
          // has_relaunch_payment.value = initialFilters.has_relaunch_payment
          country_iso_code.value = initialFilters.country_iso_code;
        }
      },
    );

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
      status,
      type,
      // user_id,
      limit,
      country_iso_code,
      // has_relaunch_payment
    };
  },
);
