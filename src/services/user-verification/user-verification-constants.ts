export const UserVerificationRouteApi = {
  default: '/admin/api/v1/kyc',
  getOne: (id: string) => `/admin/api/v1/kyc/${id}`,
  getStats: '/admin/api/v1/kyc/stats',
  updateStatus: (id: string) => `/admin/api/v1/kyc/${id}/status`,
  updateStatusName: `/admin/api/v1/kyc/*/status`,
}
