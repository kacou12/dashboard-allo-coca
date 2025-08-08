import type { DefaultFiltersPayload } from '../global.type'
import { Http } from '../Http'
import { MassPaymentRouteApi } from './mass-payment-constants'
import type {
  MassPaymentRequest,
  MassPaymentResponse
} from './mass-payment-type'

// const mock = new MockAdapter(axios.create())

export async function createMassPaymentApi(
  data: MassPaymentRequest,
): Promise<SuccessResponse<MassPaymentResponse> | undefined> {
  const result = await Http.post<SuccessResponse<MassPaymentResponse>>(
    MassPaymentRouteApi.default,
    data,
    {},
  )
  let test = result

  return result
}

export async function fetchFiltersMassPaymentsApi(
  payload: DefaultFiltersPayload,
): Promise<SuccessResponse<PaginationResponse<MassPaymentResponse>> | undefined> {
  const result = await Http.get<SuccessResponse<PaginationResponse<MassPaymentResponse>>>(
    MassPaymentRouteApi.getAll,
    payload,
  )
  return result
}
