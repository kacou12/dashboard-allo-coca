export const CountryRouteApi = {
  default: '/admin/api/v1/country',
  getOne: (id: string) => `/admin/api/v1/country/${id}`,
  getOneName: '/admin/api/v1/country/*',
  filter: '/admin/api/v1/country',
}
