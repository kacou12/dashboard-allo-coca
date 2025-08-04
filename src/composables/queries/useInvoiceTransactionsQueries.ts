import { invoiceTransactionQueryKeys } from "@/services/invoice-transaction/invoice-transaction-query-keys";
import {
  createInvoiceTransaction,
  fetchFiltersInvoiceTransactions,
  getInvoiceTransactionById,
  payInvoice,
} from "@/services/invoice-transaction/invoice-transaction-service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";
import { useCountryStore } from "@/stores/useCountryStore";
import { useInvoiceFiltersStore } from "@/stores/useInvoiceFilterStore";
import type { InvoiceTransactionPayload } from "@/services/invoice-transaction/invoice-transaction-type-extended";

const { currentCountry: country } = storeToRefs(useCountryStore());
const invoiceFilters = storeToRefs(useInvoiceFiltersStore());

export function useInvoiceTransactionsFiltersQuery() {
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: invoiceTransactionQueryKeys.invoiceTransactionFilters({
        limit: invoiceFilters!.limit.value,
        page: invoiceFilters?.page.value,
        q: invoiceFilters?.q.value,
        status: invoiceFilters?.status.value,
        service: invoiceFilters?.service.value,
        country_iso_code: country.value?.iso_code,
      }),
    });
  };

  const query = useQuery({
    queryKey: computed(() =>
      invoiceTransactionQueryKeys.invoiceTransactionFilters({
        limit: invoiceFilters!.limit.value,
        page: invoiceFilters?.page.value,
        q: invoiceFilters?.q.value,
        status: invoiceFilters?.status.value,
        service: invoiceFilters?.service.value,
        country_iso_code: country.value?.iso_code,
      }),
    ),
    queryFn: ({ signal }) =>
      fetchFiltersInvoiceTransactions({
        limit: invoiceFilters!.limit.value,
        page: invoiceFilters?.page.value,
        q: invoiceFilters?.q.value,
        status: invoiceFilters?.status.value,
        service: invoiceFilters?.service.value,
        country_iso_code: country.value?.iso_code,
      }),
  });

  // Si les autres filtres à part la page changent, on reset la page courante
  watch(
    () => ({
      limit: invoiceFilters.limit.value,
      q: invoiceFilters.q.value,
      status: invoiceFilters.status.value,
      service: invoiceFilters.service.value,
    }),
    () => {
      invoiceFilters.page.value = 1;
      query.refetch();
    },
    { deep: true },
  );

  return {
    ...query,
    invalidateQuery,
  };
}

export function useInvoiceTransactionByIdQuery(invoiceId: string) {
  return useQuery({
    queryKey: invoiceTransactionQueryKeys.invoiceTransaction({
      id: invoiceId,
      country: country.value?.iso_code || "",
    }),
    queryFn: () => getInvoiceTransactionById(invoiceId),
    enabled: !!invoiceId,
  });
}

export function useCreateInvoiceTransactionMutation() {
  const { invalidateQuery } = useInvoiceTransactionsFiltersQuery();

  return useMutation({
    mutationFn: (payload: InvoiceTransactionPayload) =>
      createInvoiceTransaction({ payload: payload }),
    onSuccess: () => {
      invalidateQuery();
    },
  });
}

export function usePayInvoiceMutation() {
  const { invalidateQuery } = useInvoiceTransactionsFiltersQuery();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      invoiceId,
      paymentData,
    }: {
      invoiceId: string;
      paymentData: InvoiceTransactionPayload;
    }) => payInvoice({ invoiceId, paymentData }),
    onSuccess: (_, variables) => {
      // Invalider la liste des factures
      invalidateQuery();

      // Invalider la facture spécifique qui vient d'être payée
      queryClient.invalidateQueries({
        queryKey: invoiceTransactionQueryKeys.invoiceTransaction({
          id: variables.invoiceId,
          country: country.value?.iso_code || "",
        }),
      });
    },
  });
}
