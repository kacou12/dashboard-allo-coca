export const MassPaymentRouteApi = {
  default: '/admin/api/v1/mass-payment',
  getAll: '/admin/api/v1/mass-payment',
  getOne: (id: string) => `/admin/api/v1/mass-payment/${id}`,
  getOneName: `/admin/api/v1/mass-payment/*`,
  // filter: '/admin/api/v1/user/admins',
}

// export { AdminRole }
