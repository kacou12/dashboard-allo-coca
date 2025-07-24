import type { DefaultFiltersPayload, NotificationFiltersPayload } from '../global.type'

export const notificationQueryKeys = {
  // admins: (country: string) => ['admins', country],
  // notifications: ({ page }: { page: number }) => ['notification', page],
  notification: ({ id }: { id: string }) => ['notification', { id }],
  // notificationPagination: (page: number) => ['admin', page],
  notificationFilters: (payload: NotificationFiltersPayload) => [
    'notification',
    { page: payload.page },
    { countries: payload.countries },
  ],
}
