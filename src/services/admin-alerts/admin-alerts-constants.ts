export const AdminAlertsRouteApi = {
  default: '/admin/api/v1/admin-alert',
  getOne: (id: string) => `/admin/api/v1/admin-alert/${id}`,
  getOneName: '/admin/api/v1/admin-alert/*',
}
