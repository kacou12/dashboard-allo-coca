export const NotificationsRouteApi = {
  default: '/admin/api/v1/notification',
  getAll: '/admin/api/v1/notification',
  getOne: (id: string) => `/admin/api/v1/notification/${id}`,
  getOneName: `/admin/api/v1/notification/*`,
  // filter: '/admin/api/v1/user/admins',
}

// export { AdminRole }
