import { settingsQueryKeys } from '@/services/settings/settings-keys'
import { createSettings, fetchSettings, updateSettings } from '@/services/settings/settings-service'
import type { SettingsRequest, SettingsUpdatePayload } from '@/services/settings/settings-type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'

export function useSettingsQuery() {
  return useQuery({
    queryKey: computed(() => settingsQueryKeys.settings),
    queryFn: ({ signal }) => fetchSettings(),
  })
}

export function useCreateSettingsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: SettingsRequest) => createSettings({ data: values }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.settings,
      })
    },
  })
}

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: SettingsUpdatePayload) => updateSettings({ data: payload }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.settings,
      })
    },
  })
}
