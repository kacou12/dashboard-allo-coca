enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  STOCK_MANAGER = 'STOCK_MANAGER',
  // Ajoutez d'autres rôles selon vos besoins
}

export const StockRouteApi = {
  default: '/admin/api/v1/stock',
  getOne: (id: string) => `/admin/api/v1/stock/${id}`,
  create: '/admin/api/v1/stock',
  getOneName: `/admin/api/v1/stock/*`,
  updateStatus: (id: string) => `/admin/api/v1/stock/${id}/status`,
  updateQuantity: (id: string) => `/admin/api/v1/stock/${id}/quantity`,
  updateStatusName: `/admin/api/v1/stock/*/status`,
  updateQuantityName: `/admin/api/v1/stock/*/quantity`,
  filter: '/admin/api/v1/stock',
  movements: '/admin/api/v1/stock/movements',
  movementsByProduct: (productId: string) => `/admin/api/v1/stock/${productId}/movements`,
  lowStock: '/admin/api/v1/stock/low-stock',
  outOfStock: '/admin/api/v1/stock/out-of-stock',
}

export { AdminRole }