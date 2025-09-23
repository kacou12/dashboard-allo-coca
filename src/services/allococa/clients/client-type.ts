import { z } from 'zod';
import type { clientSchema, clientUpdateSchema } from './client-schema';

export type ClientResponse = {
  id: string;
  customer_name: string;
  customer_id: string;
  order_count: number;
  contact_client: string;
  commune: string;
  created_at?: string;
};

export type ClientCreatePayload = z.infer<typeof clientSchema>;

export type ClientUpdatePayload = z.infer<typeof clientUpdateSchema>;

export type ClientFiltersPayload = {
  q?: string;
  page: number;
  status?: string;
  dates?: [Date, Date];
  limit?: number;
};