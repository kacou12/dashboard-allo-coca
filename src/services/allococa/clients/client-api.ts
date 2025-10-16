import { env } from '@/config/env';
import { mockClientsResponse } from '@/mocks/allococa/client.mock.response';
import { Http } from '@/services/Http';
import { ClientRouteApi } from './client-constants';
import type {
  ClientCreatePayload,
  ClientFiltersPayload,
  ClientResponse,
  ClientUpdatePayload,
} from './client-type';

export async function fetchClientsApi({
  payload,
}: {
  payload: ClientFiltersPayload;
}): Promise<SuccessResponse<PaginationResponse<ClientResponse>> | undefined> {
  if (env.VITE_MOCK_API === 'true') {
    return Promise.resolve(mockClientsResponse as SuccessResponse<PaginationResponse<ClientResponse>>);
  }
  const result = await Http.get<SuccessResponse<PaginationResponse<ClientResponse>>>(
    ClientRouteApi.filter,
    payload,
  );

  return result;
}

export async function createClientApi({
  data,
}: {
  data: ClientCreatePayload;
}): Promise<SuccessResponse<ClientResponse> | undefined> {
  return await Http.post<SuccessResponse<ClientResponse>>(ClientRouteApi.create, data);
}

export async function updateClientApi({
  id,
  data,
}: {
  id: string;
  data: ClientUpdatePayload;
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.patch<SuccessResponse<any>>(ClientRouteApi.update(id), data);
}

export async function fetchClientByIdApi({
  id,
}: {
  id: string;
}): Promise<SuccessResponse<ClientResponse> | undefined> {
  if (env.VITE_MOCK_API === 'true') {
    const mockClient = mockClientsResponse.data.items.find((client) => client.id === id);
    if (mockClient) {
      return Promise.resolve({
        code: 200,
        msg: 'Client successfully retrieved',
        data: mockClient,
      } as SuccessResponse<ClientResponse>);
    }
  }
  return await Http.get<SuccessResponse<ClientResponse>>(ClientRouteApi.getOne(id));
}

export async function deleteClientApi({
  id,
}: {
  id: string;
}): Promise<SuccessResponse<any> | undefined> {
  return await Http.delete<SuccessResponse<any>>(ClientRouteApi.delete(id));
}