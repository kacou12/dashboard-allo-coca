import type { ClientFiltersPayload } from './client-type';

export const clientQueryKeys = {
  client: (id: string) => ['client', id],
  admin: (id: string) => ['admin', id],
  clients: (payload: ClientFiltersPayload) => [
    'clients',
    { limit: payload.limit },
    { page: payload.page },
    { search: payload.search },
    { status: payload.status },
    { dates: payload.dates },
  ],
  admins: (payload: ClientFiltersPayload) => [
    'admins',
    { limit: payload.limit },
    { page: payload.page },
    { search: payload.search },
    { status: payload.status },
    { dates: payload.dates },
  ],
};