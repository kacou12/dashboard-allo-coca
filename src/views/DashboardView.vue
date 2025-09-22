<template>
  <div class="px-4 w-full space-y-16 h-full ">
    <!-- Titre du tableau de bord -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-8">

      <article class="flex text-white items-center gap-[42px] p-[35px] rounded-xl bg-[#86090A]">
        <div>
          <p>Total des ventes</p>
          <p class="text-clamp-h1-md">634,500,258</p>
        </div>
        <div class="mt-7">

          <div class="">
            <img src="@/assets/allococa/increase-icon.png" alt="">
          </div>
        </div>
      </article>

      <article class="relative text-white flex items-end gap-[42px] p-[35px] rounded-xl bg-[#86090A]">
        <div class="space-y-2">
          <p class="text-sm">Meilleur vente ce mois-ci</p>
          <div class="flex items-center gap-1">

            <p class="text-clamp-md">2,710</p>
            <p>commandes</p>
          </div>
        </div>


        <div class="absolute right-5 bottom-5 ">
          <img src="@/assets/allococa/coca-bottle.png" alt="">
        </div>
      </article>

      <article class="flex text-white items-center justify-between  gap-[42px] p-[35px] rounded-xl bg-[#86090A]">
        <div>
          <p class="text-sm">Total des commandes</p>
          <div class="flex items-center gap-1">

            <p class="text-clamp-h1-md">547</p>
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

      <CommonDataTable :page-size="limitModel ? parseInt(limitModel) : 10" ref="my-table" :default-page="filters.page"
        :total="transactionsData?.total ?? 0" :columns="recentsTransactionsColumns"
        :data="transactionsData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage" @next-page="nextPage">
      </CommonDataTable>
    </section>

  </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import { sidebarStateKey } from '@/components/layouts/provide-state-key';
import { recentsTransactionsColumns } from '@/components/main/recentTransactions/tables/TransactionsColumn';
import { useTransactionsFiltersQuery } from '@/composables/queries/useTransactionQueries';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoaderStore } from "@/stores/useLoaderStore";
import { useTransactionFiltersStore } from '@/stores/useTransactionFilterStore';
import {
  CalendarDate
} from '@internationalized/date';
import { useWindowSize } from '@vueuse/core';
import type { DateRange } from "radix-vue";
import type { Ref } from 'vue';
import { inject, ref, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';


let date = new Date()
const dates = ref({
  start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
  end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>



const updateData = () => {


  const startDate = dates.value.start!.toDate('Africa/Abidjan')
  const endDate = dates.value.end!.toDate('Africa/Abidjan')
  // filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
}


const { isSidebarExpanded, toggleSidebarExpanded } = inject(sidebarStateKey)!
const { user, fullName } = useAuthStore();


const { data: transactionsData, isFetched, refetch, isFetching } = useTransactionsFiltersQuery();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();
// const { isFetched: isFetchedCounty, data: countriesData, isSuccess } = useCountryFiltersQuery();


const filters = useTransactionFiltersStore()
// const { page } = storeToRefs(useTransactionFiltersStore())

// const { data: providersData, isFetched: isFetchedProviders, refetch: refetchProviders } = useProvidersFiltersQuery(false);

const route = useRoute();
const router = useRouter();
const { width, height } = useWindowSize()



const tableRef = useTemplateRef('my-table')

// onBeforeMount(async () => {

//   await refetchProviders();

// })

const [statusModel,] = defineModel('status', {
  set(value: string) {
    if (value == "all") {
      filters.status = undefined;
    } else {
      filters.status = value;
    }
    return value
  },
  //   get(v) {
  //     return v;
  //   },
  default: undefined,
})




const [limitModel, limitModifiers] = defineModel('limitProvider', {
  type: String,

  set(value: string) {
    filters.limit = parseInt(value);
    return value
  },
  //   get(v) {
  //     return v;
  //   },
  default: undefined,
})



const nextPage = async () => {
  filters.page = filters.page + 1;
  startLoadingSkeleton();
  // refetch();

}
const goToPage = async (page: number) => {

  filters.page = page
  startLoadingSkeleton();
  // refetch();


}

const prevPage = async () => {

  filters.page = filters.page - 1;
  startLoadingSkeleton();
  refetch();

}


</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>