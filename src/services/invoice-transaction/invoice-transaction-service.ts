import {
  createInvoiceTransactionApi,
  fetchFiltersInvoiceTransactionsApi,
  getInvoiceTransactionByIdApi,
} from "./invoice-transaction-api";
import type { InvoiceTransactionResponse } from "./invoice-transaction-type";
import type {
  InvoiceFiltersPayload,
  InvoiceTransactionPayload,
} from "./invoice-transaction-type-extended";

export async function fetchFiltersInvoiceTransactions(
  payload: InvoiceFiltersPayload,
): Promise<PaginationResponse<InvoiceTransactionResponse> | undefined> {
  try {
    let payloadData = { ...payload };
    const res = await fetchFiltersInvoiceTransactionsApi({
      payload,
    });

    let customData = res?.data;

    // Trier par date de création (plus récent en premier)
    customData?.items.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateB.getTime() - dateA.getTime();
    });

    return customData;
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération des factures",
    );
  }
}

export async function getInvoiceTransactionById(
  id: string,
): Promise<PaginationResponse<InvoiceTransactionResponse> | undefined> {
  try {
    const res = await getInvoiceTransactionByIdApi(id);
    return res?.data;
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ||
        "Erreur lors de la récupération de la facture",
    );
  }
}

export async function createInvoiceTransaction({
  payload,
}: {
  payload: InvoiceTransactionPayload;
}): Promise<any | undefined> {
  try {
    const res = await createInvoiceTransactionApi({
      payload: payload,
    });

    return res?.data;
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ||
        "Une erreur est survenue durant le paiement de la facture",
    );
  }
}

export async function payInvoice({
  invoiceId,
  paymentData,
}: {
  invoiceId: string;
  paymentData: InvoiceTransactionPayload;
}): Promise<any | undefined> {
  try {
    const res = await createInvoiceTransactionApi({
      payload: { ...paymentData, invoiceId },
    });

    return res?.data;
  } catch (error: any) {
    throw Error(
      error.response?.data?.message ||
        "Une erreur est survenue durant le paiement",
    );
  }
}
