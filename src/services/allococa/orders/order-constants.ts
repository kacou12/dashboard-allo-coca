enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  // Ajoutez d'autres rôles selon vos besoins
}

export const OrderRouteApi = {
  default: '/admin/api/v1/order',
  getOne: (id: string) => `/admin/api/v1/order/${id}`,
  create: '/admin/api/v1/order',
  getOneName: `/admin/api/v1/order/*`,
  updateStatus: (id: string) => `/admin/api/v1/order/${id}/status`,
  updateStatusName: `/admin/api/v1/order/*/status`,
  filter: '/admin/api/v1/order',
  assign: (id: string) => `/admin/api/v1/order/${id}/assign`,
  assignName: `/admin/api/v1/order/*/assign`,
}

export { AdminRole }