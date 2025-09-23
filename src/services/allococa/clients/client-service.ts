import {
  createClientApi,
  fetchClientsApi,
  updateClientApi,
  deleteClientApi
} from './client-api';
import type {
  ClientCreatePayload,
  ClientFiltersPayload,
  ClientResponse,
  ClientUpdatePayload,
} from './client-type';

export async function fetchClients(
  payload: ClientFiltersPayload,
): Promise<PaginationResponse<ClientResponse> | undefined> {
  try {
    const res = await fetchClientsApi({
      payload,
    });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue lors de la récupération des clients');
  }
}

export async function createClient({
  data,
}: {
  data: ClientCreatePayload;
}): Promise<ClientResponse | undefined> {
  try {
    const res = await createClientApi({
      data: data,
    });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue durant la création du client');
  }
}

export async function updateClient({
  id,
  data,
}: {
  id: string;
  data: ClientUpdatePayload;
}): Promise<any | undefined> {
  try {
    const res = await updateClientApi({
      data: data,
      id: id,
    });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue durant la mise à jour du client');
  }
}

export async function deleteClient({
  id,
}: {
  id: string;
}): Promise<any | undefined> {
  try {
    const res = await deleteClientApi({
      id: id,
    });
    return res?.data;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue durant la suppression du client');
  }
}