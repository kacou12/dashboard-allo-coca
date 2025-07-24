<template>

  <div ref="el" class="h-screen">
    <!-- <toastContainers /> -->
    <transition name="fade">
      <LoadingBar v-if="loading"></LoadingBar>
    </transition>


    <RouterView class="font-worksans" />
    <!-- <router-view class="font-worksans" v-slot="{ Component }">
      <Transition name="fade" :appear="true">
        <component :is="Component" />
      </Transition>
    </router-view> -->
    <VueQueryDevtools />
  </div>

</template>
<script setup lang="ts">
import { useIsFetching } from '@tanstack/vue-query';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import LoadingBar from './components/loadingBar.vue';
import { useCountryFiltersQuery } from '@/composables/queries/useCountryQueries';
import { useCountryStore } from '@/stores/useCountryStore';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';
import { AppRoute } from './constants/app-route';
import { useToast } from 'vue-toastification';

const { isLoading: loading } = storeToRefs(useLoaderStore());

const route = useRoute();
const isVisited = ref(false);
const toast = useToast();

const { user } = storeToRefs(useAuthStore());


const isFetching = useIsFetching(
  // { queryKey: [adminQueryKeys.adminFilters] }
);

// useIsLo

const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore(

);


// const { isFetched, data: countriesData, isSuccess } = useCountryFiltersQuery(
//   !!user.value
// );



const { setCurrentCountry } = useCountryStore();







// ENABLE TO FETCH COUNTRY
// onBeforeMount(async () => {
//   let data = await refetch();
//   setListCountries(countriesData.value?.items!);
// });




watch(isFetching, (newValue) => {

  if (newValue > 0 && isVisited.value == false) {
    startLoading();

    isVisited.value = true;
  }
  if (newValue == 0) {
    stopLoadingSkeleton();
    stopLoading();

  }
}, { immediate: true });







</script>

<style scoped>
:root {
  --ms-spinner-color: #fab529;

  --ms-tag-bg: #fab529;

  --ms-group-label-bg-selected: #fab529;

  --ms-group-label-bg-selected-pointed: #fab529;

  --ms-option-bg-selected: #fab529;

  --ms-option-bg-selected-pointed: #166FB8;

}

.dp__theme_light {
  --dp-primary-color: #fab529;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
