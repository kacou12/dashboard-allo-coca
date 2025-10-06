import { z } from 'zod';
import type { clientSchema, clientUpdateSchema } from './client-schema';

export type ClientResponse = {

  id: string
  name: string
  email: string
  phone: string
  address: string
  is_active: boolean
  role: string
  last_login: string
  created_at: string
  updated_at: string
  status: boolean
};

export type ClientCreatePayload = z.infer<typeof clientSchema>;

export type ClientUpdatePayload = z.infer<typeof clientUpdateSchema>;

export type ClientFiltersPayload = {
  search?: string;
  page: number;
  status?: string;
  dates?: [Date, Date];
  limit?: number;
};