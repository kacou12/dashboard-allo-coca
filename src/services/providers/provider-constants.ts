// enum AdminRole {
//   SUPER_ADMIN = 'SUPER_ADMIN',
//   ADMIN = 'ADMIN',
//   EDITOR = 'EDITOR',
//   VIEWER = 'VIEWER',
//   // Ajoutez d'autres rôles selon vos besoins
// }

export const ProviderRouteApi = {
  default: '/admin/api/v1/providers',
  getOne: (id: string) => `/admin/api/v1/providers/${id}`,
  getOneName: '/admin/api/v1/providers/*',
}
export const ProviderServiceAvailibilityRouteApi = {
  default: '/admin/api/v1/service-availability',
  getOne: (id: string) => `/admin/api/v1/service-availability/${id}`,
  getOneName: `/admin/api/v1/service-availability/*`,
}

// export { AdminRole }
