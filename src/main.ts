import './assets/main.css'
import Toast, { useToast, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueEasyLightbox from 'vue-easy-lightbox/external-css'
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import InfiniteLoading from '@/plugins/infiniteLoadingPlugins'

import App from './App.vue'
import router from './router'

import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { QueryClient, VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'

const app = createApp(App)
app.use(Toast, {
  autoClose: 3000,
  // ...
} as PluginOptions)
const toast = useToast()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // @ts-ignore err: unknown -> err: AxiosError
      retry: (failureCount, err: AxiosError) => {
        if (err.response?.status === 401) {
          console.log('This works')
          return false // do not retry, trigger error
        }

        // otherwise, restore default
        const defaultRetry = new QueryClient().getDefaultOptions().queries?.retry

        // @ts-ignore
        return Number.isSafeInteger(defaultRetry) ? failureCount < (defaultRetry ?? 0) : false
      },
      onError: (err: AxiosError) => {
        console.log('this doesnt work')
        if (err.response?.status === 401) {
          // clean up session state and prompt for login
          // ex: window.location.reload();
        }
        toast.error(err.response?.data)
      },
      // staleTime: 3600,
    },
    mutations: {
      onError: (error: Error, variables: unknown, context: unknown) => {
        // toast.error('err.response?.data')
      },
    },
  },
})


const pinia = createPinia()

pinia.use(piniaPluginPersistedState)
app.use(pinia)

app.use(VueEasyLightbox)
app.use(router)
app.use(VueQueryPlugin, {
  queryClient,
})
// app.component('infinite-loading', InfiniteLoading)

app.mount('#app')
// export { queryClient }
