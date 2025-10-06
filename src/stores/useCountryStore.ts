import type { CountryResponse } from '@/services/country/country-type'
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useAuthStore } from './useAuthStore'

// Store pour le pays courant
export const useCountryStore = defineStore(
  'country',
  () => {
    const currentCountry = ref<CountryResponse>()
    const {user} = storeToRefs(useAuthStore());	

    const setCurrentCountry = (country: CountryResponse) => {
      currentCountry.value = country
    }

    watch(
      () => user.value,
      (n, o) => {
        if(n != null && currentCountry.value == null) {
          // currentCountry.value = n.country;
        }
        
      })

    return {
      currentCountry,
      setCurrentCountry,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)
