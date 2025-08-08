import type { DefaultFiltersPayload, NotificationFiltersPayload } from '../global.type'

export const massPaymentQueryKeys = {
  // admins: (country: string) => ['admins', country],
  // notifications: ({ page }: { page: number }) => ['notification', page],
  massPayment: ({ id }: { id: string }) => ['notification', { id }],
  // notificationPagination: (page: number) => ['admin', page],
  massPaymentFilters: (payload: DefaultFiltersPayload) => [
    'massPayment',
    { page: payload.page },
    // { countries: payload.countries },
    { q: payload.q },
  ],
}
