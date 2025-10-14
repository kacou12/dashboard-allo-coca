import {
  createClientApi,
  deleteClientApi,
  fetchClientByIdApi,
  fetchClientsApi,
  updateClientApi
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

    let customData = res?.data

    // Sort orders by order date (most recent first)
    customData?.items.sort((a, b) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateB.getTime() - dateA.getTime()
    })

    return customData;
  } catch (error: any) {
    throw Error(error.response?.data?.message || 'Une erreur est survenue lors de la récupération des clients');
  }
}

export async function fetchOneClient({ id }: { id: string }): Promise<ClientResponse | undefined> {
  try {
    const res = await fetchClientByIdApi({ id: id })

    return res?.data
  } catch (error: any) {
    throw Error(error.response.data.message)
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