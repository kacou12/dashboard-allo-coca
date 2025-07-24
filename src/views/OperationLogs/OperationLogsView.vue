<template>
    <div class="px-4 bg-white">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-xl font-bold font-merriweathersans leading-6 text-black">Gestion des logs</h1>
                <p class="text-neutral-30 text-sm font-normal">Consultez les logs récents en temps réel</p>
            </div>

            <div>
                <notification-icon></notification-icon>
            </div>
        </header>

        <div class="flex flex-col sm:flex-row sm:justify-between sm:my-4">
            <section class="flex gap-2 items-center">
                <p class="text-[18px] font-semibold">logs</p>
                <div>
                    <span
                        class="text-xs font-medium px-[5px] py-[1px]  rounded-xl border text-[#633DA5] border-[#633DA5]"><span
                            v-if="isFetched">{{ operationLogsData!.total }}</span>
                        Transactions</span>
                </div>
            </section>
            <section class="my-2 ms:my-0">
                <Button variant="outline" class="rounded-[8px]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.8332 13.2362H4.16651C3.39571 13.23 2.65439 12.9392 2.085 12.4197C1.51561 11.9001 1.15833 11.1884 1.08184 10.4214C1.00534 9.65438 1.21503 8.88616 1.67059 8.26437C2.12615 7.64258 2.79544 7.2111 3.54984 7.05284C3.54984 6.96118 3.54984 6.86951 3.54984 6.77784C3.54924 5.77707 3.8631 4.8014 4.44708 3.98867C5.03106 3.17595 5.85563 2.56725 6.80431 2.24857C7.75299 1.92988 8.77782 1.91733 9.73402 2.21267C10.6902 2.50802 11.5295 3.09634 12.1332 3.89451C12.513 3.73457 12.921 3.65239 13.3332 3.65284C14.1613 3.65504 14.9549 3.98499 15.5405 4.57057C16.126 5.15614 16.456 5.94972 16.4582 6.77784C16.4665 6.86932 16.4665 6.96136 16.4582 7.05284C17.2132 7.2113 17.883 7.64345 18.3385 8.2661C18.794 8.88876 19.0031 9.65791 18.9255 10.4255C18.8479 11.1931 18.4891 11.9048 17.9182 12.4237C17.3473 12.9426 16.6047 13.232 15.8332 13.2362ZM4.11651 8.23618C3.61923 8.24281 3.14495 8.44671 2.798 8.80303C2.45106 9.15935 2.25988 9.6389 2.26651 10.1362C2.27314 10.6335 2.47704 11.1077 2.83336 11.4547C3.18968 11.8016 3.66923 11.9928 4.16651 11.9862H15.8332C16.3305 11.9862 16.8074 11.7886 17.159 11.437C17.5106 11.0854 17.7082 10.6085 17.7082 10.1112C17.7082 9.6139 17.5106 9.13698 17.159 8.78535C16.8074 8.43372 16.3305 8.23618 15.8332 8.23618H15.7165C15.6129 8.24433 15.5089 8.22616 15.4142 8.18337C15.3195 8.14058 15.2372 8.07455 15.1748 7.99141C15.1125 7.90827 15.0721 7.81072 15.0576 7.70783C15.043 7.60493 15.0547 7.50002 15.0915 7.40284C15.165 7.1967 15.2044 6.97998 15.2082 6.76118C15.2076 6.42108 15.1144 6.08755 14.9388 5.79631C14.7632 5.50507 14.5116 5.26709 14.2111 5.10784C13.9106 4.9486 13.5724 4.87408 13.2328 4.89229C12.8932 4.91049 12.5649 5.02072 12.2832 5.21118C12.2124 5.26043 12.132 5.29407 12.0472 5.30988C11.9624 5.32568 11.8753 5.32328 11.7915 5.30284C11.7079 5.28548 11.629 5.25049 11.56 5.20019C11.491 5.14989 11.4336 5.08545 11.3915 5.01118C11.0846 4.47101 10.6397 4.02205 10.1023 3.71019C9.56498 3.39832 8.95446 3.23475 8.33317 3.23618C7.39454 3.23838 6.49498 3.61222 5.83127 4.27594C5.16755 4.93965 4.79371 5.83921 4.79151 6.77784C4.79358 7.00756 4.81871 7.23648 4.86651 7.46118C4.88346 7.55502 4.87956 7.65145 4.85508 7.74362C4.8306 7.83579 4.78613 7.92145 4.72484 7.99451C4.66408 8.06701 4.58725 8.12435 4.50046 8.16196C4.41366 8.19957 4.31929 8.21642 4.22484 8.21118L4.11651 8.23618ZM11.0082 17.5945L12.8082 15.7945C12.9186 15.676 12.9787 15.5193 12.9758 15.3574C12.973 15.1955 12.9074 15.041 12.7929 14.9265C12.6783 14.812 12.5239 14.7464 12.3619 14.7435C12.2 14.7407 12.0433 14.8008 11.9248 14.9112L10.1165 16.7112C10.1017 16.7273 10.0836 16.7402 10.0636 16.7491C10.0435 16.7579 10.0218 16.7625 9.99984 16.7625C9.9779 16.7625 9.9562 16.7579 9.93612 16.7491C9.91604 16.7402 9.89801 16.7273 9.88317 16.7112L8.07484 14.9028C8.01629 14.8448 7.94689 14.7989 7.87061 14.7678C7.79432 14.7366 7.71264 14.7207 7.63023 14.7211C7.54782 14.7215 7.46629 14.7381 7.3903 14.77C7.31431 14.8019 7.24534 14.8485 7.18734 14.907C7.0702 15.0253 7.00484 15.1852 7.00562 15.3516C7.006 15.434 7.02262 15.5156 7.05451 15.5916C7.08641 15.6675 7.13296 15.7365 7.19151 15.7945L8.99151 17.6028C9.26194 17.8645 9.62352 18.0108 9.99984 18.0108C10.3762 18.0108 10.7377 17.8645 11.0082 17.6028V17.5945Z"
                            fill="#1A1A1A" />
                    </svg>
                    <span class="text-xs text-neutral-10 font-medium">
                        Télécharger le rapport
                    </span>

                </Button>

            </section>
        </div>

        <!-- transaction filter -->
        <div class="flex xl:justify-between flex-col  my-4 ">
            <section class="flex  flex-col  md:flex-row my-5 gap-5 justify-between w-full ">
                <div class="h-10  w-full">

                    <DashboardTabs v-model="tabsValue" class="w-full "></DashboardTabs>

                </div>

                <div class="gap-3  w-full  md:w-[60%] 2xl:w-[50%]  flex justify-start lg:justify-end">

                    <CommonDatesFilter :update-handler="updateData" v-model="dates"></commonDatesFilter>

                </div>
            </section>
            <section class="xl:flex grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-2 " v-if="isFetchedProviders">


                <CommonSelect v-model="filters.method" :default-width="width >= 1366 ? 'w-fit' : 'w-full'"
                    class=" w-full" title="Filtre par methode" :elements="[
                        { name: 'Filtre par methode', value: 'all' },
                        { name: 'GET', value: 'GET' },
                        { name: 'POST', value: 'POST' },
                        { name: 'PUT', value: 'PUT' },
                        { name: 'DELETE', value: 'DELETE' },
                    ]">
                </CommonSelect>


                <CommonSelect v-model="statusModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" class=" w-full"
                    title="Filtre par statut" :elements="[
                        { name: 'Filtre par statut', value: 'all' },
                        { name: 'Non resolu', value: '0' },
                        { name: 'resolu', value: '1' },
                    ]">
                </CommonSelect>

                <CommonSelect v-model="limitModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'"
                    title="Lignes par page"
                    :elements="[{ name: 'Lignes par page', value: '10' }, { name: '20', value: '20' }, { name: '50', value: '50' }, { name: '100', value: '100' }]">
                </CommonSelect>

            </section>
            <section class="flex gap-4 my-5 ">
                <SearchBar :is-loading="isFetching && filters.q !== undefined" v-model="filters.q"></SearchBar>
                <SearchBar :is-loading="isFetching && filters.trace_id !== undefined" v-model="filters.trace_id"
                    placeholder="Rechercher par trace id"></SearchBar>
                <SearchBar :is-loading="isFetching && filters.user_phone !== undefined" v-model="filters.user_phone"
                    placeholder="Rechercher par numéro de telephone"></SearchBar>
                <SearchBar :is-loading="isFetching && filters.path !== undefined" v-model="filters.path"
                    placeholder="Rechercher par path"></SearchBar>


            </section>
        </div>


        <!-- Transactions table -->
        <div class=" w-full ">
            <CommonDataTable :page-size="limitModel ? parseInt(limitModel) : 10" ref="my-table"
                :default-page="filters.page" :total="operationLogsData?.total ?? 0" :columns="operationLogsColumn"
                :data="operationLogsData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage"
                @next-page="nextPage">
            </CommonDataTable>
        </div>







    </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import { operationLogsColumn } from '@/components/main/operationLogs/tables/operationLogsColumn';
import notificationIcon from '@/components/svg/notificationIcon.vue';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/users/SearchBar.vue';
import { useOperationLogsFiltersQuery } from '@/composables/queries/useOperationLogQueries';
import { useProvidersFiltersQuery } from '@/composables/queries/useProviderQueries';

import CommonDatesFilter from '@/components/common/commonDatesFilter.vue';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useOperationLogFiltersStore } from '@/stores/useOperatorLogFilterStore';
import {
    CalendarDate
} from '@internationalized/date';
import { useWindowSize } from '@vueuse/core';
import type { DateRange } from "radix-vue";
import { onBeforeMount, ref, useTemplateRef, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import DashboardTabs from '@/components/main/dashboard/dashboardTabs.vue';


const { data: operationLogsData, isFetched, refetch, isFetching } = useOperationLogsFiltersQuery();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();


const filters = useOperationLogFiltersStore()
let date = new Date()
const tabsValue = ref("0");
// const { page } = storeToRefs(useTransactionFiltersStore())

const { data: providersData, isFetched: isFetchedProviders, refetch: refetchProviders } = useProvidersFiltersQuery(false);


const dates = ref({
    start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>

const route = useRoute();
const { width, height } = useWindowSize()

const updateData = () => {

    const startDate = dates.value.start!.toDate('Africa/Abidjan')
    const endDate = dates.value.end!.toDate('Africa/Abidjan')
    filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
}




const tableRef = useTemplateRef('my-table')

onBeforeMount(async () => {

    await refetchProviders();

})

const [statusModel, statusModifiers] = defineModel('status', {
    set(value: string) {
        if (value == "all") {
            filters.status = undefined;
        } else {
            filters.status = parseInt(value)
        }

        return value
    },

    default: undefined,
})

// const [typeModel, typeModifiers] = defineModel('type', {
//     set(value: string) {
//         if (value == "all") {
//             filters.type = undefined;
//         } else {
//             filters.type = value;
//         }
//         return value
//     },
//     default: undefined,
// })

// const [payerProviderModel, payerProviderModifiers] = defineModel('payerProvider', {
//     set(value: string) {
//         if (value == "all") {
//             filters.type = undefined;
//         } else {
//             filters.payer_provider = value;
//         }
//         return value
//     },
//     default: undefined,
// })

const [limitModel, limitModifiers] = defineModel('limitProvider', {
    type: String,

    set(value: string) {
        filters.limit = parseInt(value);
        return value
    },

    default: undefined,
})

watch(tabsValue, (n, o) => {
    if (n == "") return;
    // yesterday
    if (n == "1") {
        dates.value = {
            start:
                new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).subtract({ days: parseInt("1") }),
            end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).subtract({ days: parseInt("1") }),
        }

    } else {
        dates.value = {
            start:
                new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).subtract({ days: parseInt(n) }),
            end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
        }

    }

    filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
    startLoadingSkeleton();

})



const nextPage = async () => {
    filters.page = filters.page + 1;
    startLoadingSkeleton();
    refetch();

}
const goToPage = async (page: number) => {

    filters.page = page
    startLoadingSkeleton();
    refetch();


}

const prevPage = async () => {

    filters.page = filters.page - 1;
    startLoadingSkeleton();
    refetch();

}



</script>

<style scoped></style>