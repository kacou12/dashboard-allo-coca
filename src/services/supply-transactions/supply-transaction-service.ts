import type {
  SupplyFiltersPayload,
  TransactionFiltersPayload,
} from "../global.type";
import {
  createSupplyTransactionApi,
  fetchFiltersSupplyTransactionsApi,
} from "./supply-transaction-api";
import type {
  SupplyTransactionPayload,
  SupplyTransactionResponse,
} from "./supply-transaction-type";

export async function fetchFiltersSupplyTransactions(
  payload: SupplyFiltersPayload,
): Promise<PaginationResponse<SupplyTransactionResponse> | undefined> {
  try {
    let payloadData = { ...payload };
    const res = await fetchFiltersSupplyTransactionsApi({
      payload,
    });

    let customData = res?.data;

    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime(); // dateB - dateA pour le plus récent au plus ancien
    });

    return customData;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
}

export async function createSupplyTransaction({
  payload,
}: {
  payload: SupplyTransactionPayload;
}): Promise<any | undefined> {
  try {
    const res = await createSupplyTransactionApi({
      payload: payload,
    });

    return res?.data;
  } catch (error: any) {
    throw Error("Une erreur est survenue durant le transfert");
    // throw Error(error.response.data.message)
  }
}
