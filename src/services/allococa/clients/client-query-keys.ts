import type { ClientFiltersPayload } from './client-type';

export const clientQueryKeys = {
  client: (id: string) => ['client', id],
  clients: (payload: ClientFiltersPayload) => [
    'clients',
    { limit: payload.limit },
    { page: payload.page },
    { q: payload.q },
    { status: payload.status },
    { dates: payload.dates },
  ],
};