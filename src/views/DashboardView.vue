<template>
  <div class="px-4 w-full space-y-5 h-full ">
    <!-- Titre du tableau de bord -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-8" v-if="isFetchedDashboardStats">

      <article class="flex text-white items-center gap-[42px] p-[35px] rounded-xl bg-[#86090A]">
        <div>
          <p>Total des ventes</p>
          <p class="text-clamp-h1-md">{{ dashboardStatsData?.total_sales ?? 0 }}</p>
        </div>
        <div class="mt-7">

          <div class="">
            <img src="@/assets/allococa/increase-icon.png" alt="">
          </div>
        </div>
      </article>

      <article v-if="dashboardStatsData?.best_seller"
        class="relative text-white flex items-end gap-[42px] p-[35px] rounded-xl bg-[#86090A]">
        <div class="space-y-2">
          <p class="text-sm">Meilleur vente ce mois-ci</p>
          <div class="flex items-center gap-1">

            <p class="text-clamp-md">{{ dashboardStatsData?.best_seller.orders_count ?? 0 }}</p>
            <p>commandes</p>
          </div>
        </div>


        <div class="absolute right-5 bottom-5 " v-if="dashboardStatsData?.best_seller">
          <!-- <img class="w-[37px] h-full" src="@/assets/allococa/coca-bottle.png" alt=""> -->
          <img class="w-[37px] h-full" :src="dashboardStatsData?.best_seller.product_image_url" alt="">
        </div>
      </article>

      <article class="flex text-white items-center justify-between  gap-[42px] p-[35px] rounded-xl bg-[#86090A]">
        <div>
          <p class="text-sm">Total des commandes</p>
          <div class="flex items-center gap-1">

            <p class="text-clamp-h1-md">{{ sumData }}</p>
            <p class="text-sm">cette semaine</p>
          </div>
        </div>

        <div class="mt-5">

          <div class="">
            <img src="@/assets/allococa/increase-icon.png" alt="">
          </div>
        </div>
      </article>
    </section>


    <!-- dashboa table -->
    <section class=" w-full space-y-4 ">

      <h2 class="text-clamp-md  text-white font-merriweathersans">Commandes récentes</h2>

      <CommonDataTable :show-pagination="false" :page-size="pageSize" ref="my-table" :default-page="1"
        :total="dashboardOrdersData?.total ?? 0" :columns="allococadashboardOrdersColumns"
        :data="dashboardOrdersData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage" @next-page="nextPage">
      </CommonDataTable>
    </section>

  </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import { sidebarStateKey } from '@/components/layouts/provide-state-key';
import { allococadashboardOrdersColumns } from '@/components/main/allococa/allococa-dashboard/allococaDashboard';
import { useAllococaDashboardStatsQuery } from '@/composables/queries/allococa/useAllococaDashboardQueries';
import { useDashBoardFiltersQuery } from '@/composables/queries/useDashboardQueries';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoaderStore } from "@/stores/useLoaderStore";
import { useTransactionFiltersStore } from '@/stores/useTransactionFilterStore';
import {
  CalendarDate
} from '@internationalized/date';
import { useWindowSize } from '@vueuse/core';
import type { DateRange } from "radix-vue";
import type { Ref } from 'vue';
import { computed, inject, ref, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';


let date = new Date()
const dates = ref({
  start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
  end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>

const pageSize = ref(7);

const { isSidebarExpanded, toggleSidebarExpanded } = inject(sidebarStateKey)!
const { user, fullName } = useAuthStore();

const sumData = computed(() => {
  if (!isFetchedDashboardStats.value) return 0

  return dashboardStatsData.value!.weekly_orders.pending +
    dashboardStatsData.value!.weekly_orders.cancelled +
    dashboardStatsData.value!.weekly_orders.delivered;
})

const { data: dashboardOrdersData, isFetched, refetch, isFetching } = useDashBoardFiltersQuery();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();


const { data: dashboardStatsData, isFetched: isFetchedDashboardStats, refetch: refetchDashboardStats } = useAllococaDashboardStatsQuery();

const route = useRoute();
const router = useRouter();
const { width, height } = useWindowSize()



const tableRef = useTemplateRef('my-table')

// onBeforeMount(async () => {

//   await refetchProviders();

// })



const nextPage = async () => {


}
const goToPage = async (page: number) => {




}

const prevPage = async () => {

}


</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>