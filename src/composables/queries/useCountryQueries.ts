import { countryQueryKeys } from '@/services/country/country-query-keys'
import {
  createCountry,
  deleteCountry,
  fetchCountryById,
  fetchFiltersCountries,
  updateCountry,
} from '@/services/country/country-service'
import type { CountryRequest, CountryUpdatePayload } from '@/services/country/country-type'
import type { DefaultFiltersPayload } from '@/services/global.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, watch } from 'vue'

export function useCountryFiltersQuery(enabled: boolean = true) {
  const queryClient = useQueryClient()
  const initialFilters: DefaultFiltersPayload = {
    q: undefined,
    page: 1,
    limit: 100,
  }

  const filters = reactive<DefaultFiltersPayload>({
    ...initialFilters,
  })

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: countryQueryKeys.countriesFilters({
        ...filters,
      }),
    })
  }

  const query = useQuery({
    enabled: enabled,
    queryKey: computed(() =>
      countryQueryKeys.countriesFilters({
        ...filters,
      }),
    ),
    queryFn: ({ signal }) => fetchFiltersCountries(filters),
  })
  // si les autres filtre a part la page change , on reset la page courante
  watch(
    () => ({
      q: filters.q,
    }),
    () => {
      filters.page = 1
      query.refetch()
    },
    { deep: true },
  )

  return {
    ...query,
    filters,
    invalidateQuery,
  }
}

// export function useFetchAllCountriesQuery() {
//   const filters = reactive({
//     page: 1,
//   })

//   const query = useQuery({
//     enabled: false,
//     queryKey: computed(() => countryQueryKeys.countries),

//     queryFn: ({ signal }) => fetchCountries(filters.page),
//   })

//   return {
//     ...query,
//     filters,
//   }
// }

export function useCountryQuery(id: string) {
  return useQuery({
    queryKey: computed(() => countryQueryKeys.countries),
    queryFn: ({ signal }) => fetchCountryById({ id }),
    enabled: false,
  })
}

export function useCreateCountryMutation() {
  const { invalidateQuery } = useCountryFiltersQuery()
  return useMutation({
    mutationFn: (values: CountryRequest) => createCountry({ data: values }),

    onSuccess: () => {
      console.log('create country successfully')

      invalidateQuery()
    },
  })
}

export function useUpdateCountryMutation(id: string) {
  const { invalidateQuery } = useCountryFiltersQuery()
  return useMutation({
    mutationFn: (payload: CountryUpdatePayload) => updateCountry({ id, data: payload }),

    onSuccess: () => {
      console.log('update country successfully')

      invalidateQuery()
    },
  })
}

export function useDeleteCountryMutation(id: string) {
  const { invalidateQuery } = useCountryFiltersQuery()
  return useMutation({
    mutationFn: () => deleteCountry({ id }),

    onSuccess: () => {
      console.log('delete country successfully')

      invalidateQuery()
    },
  })
}
