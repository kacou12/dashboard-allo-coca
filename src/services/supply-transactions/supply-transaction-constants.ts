enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  // Ajoutez d'autres rôles selon vos besoins
}

export const SupplyTransactionRouteApi = {
  default: '/admin/api/v1/supply-transaction',
  getOne: (id: string) => `/admin/api/v1/supply-transaction/${id}`,
  transfertTransaction: '/admin/api/v1/supply-transaction/init',
  getOneName: `/admin/api/v1/supply-transaction/*`,
  updateStatus: (id: string) => `/admin/api/v1/supply-transaction/${id}/status`,
  relaunchTransaction: (id: string) => `/admin/api/v1/supply-transaction/${id}/relaunch`,
  relaunchTransactionName: `/admin/api/v1/supply-transaction/*/relaunch`,
  updateStatusName: `/admin/api/v1/supply-transaction/*/status`,
  filter: '/admin/api/v1/supply-transaction',
}

export { AdminRole }
