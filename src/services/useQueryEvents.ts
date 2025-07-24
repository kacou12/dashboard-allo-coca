import { watch } from 'vue'
import type { UseQueryReturnType } from '@tanstack/vue-query'

interface Callbacks<TData, TError> {
  onSuccess?: (data: TData) => void
  onError?: (error: TError) => void
}

export const useQueryEvents = <TData, TError>(
  query: UseQueryReturnType<TData, TError>,
  callbacks: Callbacks<TData, TError>,
) => {
  const { onSuccess, onError } = callbacks

  watch(
    () => query.isSuccess.value,
    () => {
      if (query.isSuccess.value) {
        onSuccess?.(query.data.value as TData)
      }
    },
  )

  watch(
    () => query.isError.value,
    () => {
      if (query.isError.value) {
        onError?.(query.error.value as TError)
      }
    },
  )
}
