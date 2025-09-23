<template>
    <div class="px-4 w-full ">
        <!-- Titre du tableau de bord -->
        <header class="flex items-center gap-2 text-white">
            <section class="spacep-y-1">

                <h1 class="text-clamp-md font-semibold font-merriweathersans">Commandes</h1>
                <p class="text-sm text-white">28 commandes trouvées</p>
            </section>
        </header>



        <!-- transaction filter -->
        <section class="flex xl:justify-between items-center">
            <section class="flex items-center gap-2">


                <CommonSelect v-model="statusModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" class=" w-full "
                    title="Filtre par statut" :elements="[
                        { name: 'Filtre par statut', value: 'all' },
                        { name: 'En attente', value: 'Pending' },
                        { name: 'En cours', value: 'Processing' },
                        { name: 'Echouée', value: 'Failed' },
                        { name: 'Réussi', value: 'Successful' }]">
                </CommonSelect>



                <section class=" my-5 ">
                    <SearchBar :is-loading="isFetching && filters.q !== undefined" v-model="filters.q"></SearchBar>
                </section>

            </section>

            <CommonDatesFilter :update-handler="updateData" v-model="dates"></commonDatesFilter>

        </section>

        <!-- commandes recentes table -->
        <section class=" w-full ">

            <CommonDataTable :page-size="limitModel ? parseInt(limitModel) : 10" ref="my-table"
                :default-page="filters.page" :total="ordersData?.total ?? 0" :columns="allococaOrdersColumns"
                :data="ordersData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage" @next-page="nextPage">
            </CommonDataTable>
        </section>

    </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import CommonDatesFilter from '@/components/common/commonDatesFilter.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import { sidebarStateKey } from '@/components/layouts/provide-state-key';
import { allococaOrdersColumns } from '@/components/main/allococa/orders/allococaOrders';
import SearchBar from '@/components/users/SearchBar.vue';
import { useAllococaOrdersFiltersQuery } from '@/composables/queries/allococa/useAllococaOrdersQueries';
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


const { data: ordersData, isFetched, refetch, isFetching } = useAllococaOrdersFiltersQuery();
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

<style></style>