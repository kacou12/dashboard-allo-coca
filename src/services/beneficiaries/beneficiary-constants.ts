export const BeneficiaryRouteApi = {
  default: '/admin/api/v1/beneficiary',
  getOne: (id: string) => `/admin/api/v1/beneficiary/${id}`,
  getOneName: `/admin/api/v1/beneficiary/*`,
}