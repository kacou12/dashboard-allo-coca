enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  STOCK_MANAGER = 'STOCK_MANAGER',
  // Ajoutez d'autres rôles selon vos besoins
}

export const StockRouteApi = {
  default: '/admin/api/v1/product',
  getOne: (id: string) => `/admin/api/v1/product/${id}`,
  create: '/admin/api/v1/product',
  getOneName: `/admin/api/v1/product/*`,
  updateStatus: (id: string) => `/admin/api/v1/product/${id}/status`,
  updateQuantity: (id: string) => `/admin/api/v1/product/${id}/quantity`,
  updateStatusName: `/admin/api/v1/product/*/status`,
  updateQuantityName: `/admin/api/v1/product/*/quantity`,
  filter: '/admin/api/v1/product',
  movements: '/admin/api/v1/product/movements',
  movementsByProduct: (productId: string) => `/admin/api/v1/product/${productId}/movements`,

}
export const StockProductVariantApi = {
  default: '/admin/api/v1/product-variant',
  getOne: (idProductVariant: string) => `/admin/api/v1/product-variant/${idProductVariant}`,
  create: '/admin/api/v1/product-variant',
  getOneName: `/admin/api/v1/product-variant/*`,
  updateStatus: (idProductVariant: string) => `/admin/api/v1/product-variant/${idProductVariant}/status`,

}

export { AdminRole }