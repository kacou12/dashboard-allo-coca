import { z } from 'zod';

export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  STOCK_MANAGER = 'STOCK_MANAGER',
  CLIENT_MANAGER = 'CLIENT_MANAGER',
  // Add other roles as needed
}

export const ClientRouteApi = {
  default: '/admin/api/v1/clients',
  getOne: (id: string) => `/admin/api/v1/clients/${id}`,
  create: '/admin/api/v1/clients',
  filter: '/admin/api/v1/clients',
  update: (id: string) => `/admin/api/v1/clients/${id}`,
  delete: (id: string) => `/admin/api/v1/clients/${id}`,
};

