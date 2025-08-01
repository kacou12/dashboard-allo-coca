// import { env } from '@/config/env'
import { env } from "@/config/env";
import type {
  SupplyFiltersPayload,
  TransactionFiltersPayload,
} from "../global.type";
import { Http } from "../Http";
import { SupplyTransactionRouteApi } from "./supply-transaction-constants";

import { mockTransactionsResponse } from "@/mocks/transaction.mock.response";
import type {
  SupplyTransactionPayload,
  SupplyTransactionResponse,
} from "./supply-transaction-type";
import { mockSupplyTransactionsResponse } from "@/mocks/supply-transaction.mock.response";

export async function fetchFiltersSupplyTransactionsApi({
  payload,
}: {
  payload: SupplyFiltersPayload;
}): Promise<
  SuccessResponse<PaginationResponse<SupplyTransactionResponse>> | undefined
> {
  ``;
  if (env.VITE_MOCK_API == "true") {
    // TODO: remove this once you have auth
    return Promise.resolve(mockSupplyTransactionsResponse);
  }
  const result = await Http.get<
    SuccessResponse<PaginationResponse<SupplyTransactionResponse>>
  >(SupplyTransactionRouteApi.filter, payload);

  return result;
}

export async function createSupplyTransactionApi({
  payload,
}: {
  payload: SupplyTransactionPayload;
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.post<SuccessResponse<any>>(
    `${SupplyTransactionRouteApi.transfertTransaction}`,
    payload,
  );
}
