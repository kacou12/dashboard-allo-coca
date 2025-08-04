import { env } from "@/config/env";

import { Http } from "../Http";
import { InvoiceTransactionRouteApi } from "./invoice-transaction-constants";

import type { InvoiceTransactionResponse } from "./invoice-transaction-type";
import { mockInvoiceTransactionsResponse } from "@/mocks/invoice-transaction.mock.response";
import type {
  InvoiceFiltersPayload,
  InvoiceTransactionPayload,
} from "./invoice-transaction-type-extended";

export async function fetchFiltersInvoiceTransactionsApi({
  payload,
}: {
  payload: InvoiceFiltersPayload;
}): Promise<
  SuccessResponse<PaginationResponse<InvoiceTransactionResponse>> | undefined
> {
  if (env.VITE_MOCK_API == "true") {
    // TODO: remove this once you have auth
    return Promise.resolve(mockInvoiceTransactionsResponse);
  }

  const result = await Http.get<
    SuccessResponse<PaginationResponse<InvoiceTransactionResponse>>
  >(InvoiceTransactionRouteApi.filter, payload);

  return result;
}

export async function getInvoiceTransactionByIdApi(
  id: string,
): Promise<
  SuccessResponse<PaginationResponse<InvoiceTransactionResponse>> | undefined
> {
  if (env.VITE_MOCK_API == "true") {
    // Mock single invoice response
    return Promise.resolve(mockInvoiceTransactionsResponse);
  }

  const result = await Http.get<
    SuccessResponse<PaginationResponse<InvoiceTransactionResponse>> | undefined
  >(InvoiceTransactionRouteApi.getOne(id));

  return result;
}

export async function createInvoiceTransactionApi({
  payload,
}: {
  payload: InvoiceTransactionPayload;
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.post<SuccessResponse<any>>(
    InvoiceTransactionRouteApi.payInvoice,
    payload,
  );
}

export async function updateInvoiceStatusApi({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.put<SuccessResponse<any>>(
    InvoiceTransactionRouteApi.updateStatus(id),
    { status },
  );
}
