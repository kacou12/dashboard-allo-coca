import type { DefaultFiltersPayload, NotificationFiltersPayload } from '@/services/global.type'
import { notificationQueryKeys } from '@/services/notifications/notification-query-keys'
import {
  createNotification,
  deleteNotification,
  fetchNotificationById,
  fetchFiltersNotifications,
  updateNotification,
} from '@/services/notifications/notification-service'
import type {
  NotificationRequest,
  NotificationUpdatePayload,
} from '@/services/notifications/notification-type'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed, reactive } from 'vue'
import { useCountryStore } from '../../stores/useCountryStore'

const { currentCountry: country } = storeToRefs(useCountryStore())

export function useNotificationsFilterQuery() {
  const queryClient = useQueryClient()
  const initialFilters: NotificationFiltersPayload = {
    page: 1,
    // countries:[]
  }

  const filters = reactive<NotificationFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: notificationQueryKeys.notificationFilters({
        ...filters,
        countries: [country.value!.id],
      }),
    })
  }

  // const query = useQuery({
  //   queryKey: computed(() => {
  //     const test = { ...country.value }
  //     return notificationQueryKeys.notificationFilters({
  //       ...filters,
  //       countries: [country.value!.id],
  //     })
  //   }),

  //   queryFn: ({ signal }) =>
  //     fetchFiltersNotifications({
  //       ...filters,
  //       countries: [country.value!.id],
  //     }),
  // })

  const query = useInfiniteQuery({
    queryKey: computed(() => {
      const test = { ...country.value }
      return notificationQueryKeys.notificationFilters({
        ...filters,
        countries: [country.value!.id],
      })
    }),
    queryFn: ({ pageParam }) =>
      fetchFiltersNotifications({
        // ...filters,
        page: pageParam,

        countries: [country.value!.id],
      }),

    initialPageParam: filters.page,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.items.length === 10 ? allPages.length + 1 : undefined
      return nextPage
    },
  })

  return {
    ...query,
    filters,
    invalidateQuery,
  }
}

export function useNotificationQuery(id: string) {
  const query = useQuery({
    queryKey: computed(() => notificationQueryKeys.notification({ id })),
    queryFn: ({ signal }) => fetchNotificationById({ id }),
    enabled: false,
  })

  return {
    ...query,
  }
}

export function useCreateNotificationMutation() {
  const { invalidateQuery } = useNotificationsFilterQuery()
  return useMutation({
    mutationFn: (values: NotificationRequest) => createNotification(values),

    onSuccess: () => {
      console.log('create notification successfully')

      invalidateQuery()
    },
  })
}
export function useUpdateNotificationMutation(id: string) {
  const { invalidateQuery } = useNotificationsFilterQuery()
  return useMutation({
    mutationFn: (payload: NotificationUpdatePayload) => updateNotification({ id, data: payload }),

    onSuccess: () => {
      console.log('update notification successfully')

      invalidateQuery()
    },
  })
}
export function useDeleteNotificationMutation(id: string) {
  const { invalidateQuery } = useNotificationsFilterQuery()
  return useMutation({
    mutationFn: () => deleteNotification({ id }),
    onSuccess: () => {
      console.log('update notification successfully')

      invalidateQuery()
    },
  })
}
