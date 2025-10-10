export enum Authentication {
  AccessToken = 'dashboard-allococa-access-token',
  RefreshToken = 'dashboard-allococa-refresh-token',
  DeviceId = 'device-id',
  ExpiryIn = 'expires-in',
}

export const AuthRouteApi = {
  login: '/admin/api/v1/auth/login',
  profile: '/admin/api/v1/auth/me',
  forgetPassword: '/admin/api/v1/auth/forgot-password',
  resetPassword:(token: string)=> `/admin/api/v1/auth/password-reset/${token}`,
  updatePassword: '/admin/api/v1/auth/password-update',
  // getOne: (id: string) => `/api/v1/admins/${id}`,
  logout: '/admin/api/v1/auth/logout',
  refreshToken: '/admin/api/v1/auth/refresh',
}
