export enum Authentication {
  AccessToken = 'sendchap-pro-client-access-token',
  RefreshToken = 'refresh-token',
  DeviceId = 'device-id',
  ExpiryIn = 'expires-in',
}

export const AuthRouteApi = {
  login: '/admin/api/v1/auth/login',
   profile: '/merchant/api/v1/auth/profile',
  forgetPassword: '/merchant/api/v1/auth/forgot-password',
  resetPassword:(token: string)=> `/merchant/api/v1/auth/password-reset/${token}`,
  updatePassword: '/merchant/api/v1/auth/password-update',
  // getOne: (id: string) => `/api/v1/admins/${id}`,
  logout: '/admin/api/v1/auth/logout',
  refreshToken: '/admin/api/v1/auth/refresh-token',
}
