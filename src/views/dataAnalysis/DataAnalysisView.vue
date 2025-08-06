<template>
    <div class="px-4 w-full ">
        <!-- Titre du tableau de bord -->
        <header class="mb-6">
            <h1 class="text-xl font-bold font-merriweathersans">Analyse de données</h1>
            <p class="text-sm text-[#808080]">Suivez et analysez vos transactions avec des statistiques détaillées</p>
        </header>

        <!-- Filtres en haut -->
        <section class="flex  flex-col  md:flex-row my-5 gap-5 justify-between w-full ">
            <div class="h-10  w-full">

                <DashboardTabs v-model="tabsValue" class="w-full "></DashboardTabs>

            </div>

            <div class="gap-3  w-full  md:w-[60%] 2xl:w-[50%]  flex justify-start lg:justify-end">

                <CommonDatesFilter :update-handler="updateData" v-model="dates"></commonDatesFilter>

            </div>
        </section>
        <main class="space-y-5 ">

            <!-- Vue d'ensemble des transactions -->
            <section>
                <p class="font-semibold space-y-4">Vue d'ensemble des transactions</p>
                <article class="grid grid-cols-2 gap-5">
                    <!-- Cards principales -->
                    <SegmentationVerificationCard :is-money="true"
                        :title="`Montant total de transactions ${blocCommonText}`"
                        :items="amountTransactionRepartitionData" class="" :data="[]">
                    </SegmentationVerificationCard>
                    <SegmentationVerificationCard :title="`Nombre total de transactions ${blocCommonText}`"
                        :items="transactionRepartitionData" class="" :data="[]">
                    </SegmentationVerificationCard>


                </article>
            </section>

            <!-- Visualisation des données -->
            <section class="mt-4">
                <p class="font-semibold space-y-4">Visualisation des données</p>
                <article class="flex gap-5">

                    <div class="max-w-[280px] ">
                        <!-- <dashboardDoughnutCard :sub-title="`Transaction ${blocCommonText}`" v-if="isFetched"
                            :data="mock_collected_txns" title="Montant total collecté">
                        </dashboardDoughnutCard> -->
                        <dashboardDoughnutCard :sub-title="`Transaction ${blocCommonText}`" v-if="isFetched"
                            :data="collectedBloc" title="Montant total collecté">
                        </dashboardDoughnutCard>
                    </div>

                    <UserTrafficByNetworkCard :data="dashboardData!.count_txns_group_by_type_and_month" v-if="isFetched"
                        class="flex-1">
                    </UserTrafficByNetworkCard>
                    <!-- <UserTrafficByNetworkCard :data="mock_count_txns_group_by_type_and_month" v-if="isFetched"
                        class="flex-1">
                    </UserTrafficByNetworkCard> -->

                </article>
            </section>
        </main>







    </div>
</template>

<script setup lang="ts">
import UserTrafficByNetworkCard from "@/components/aggregatorSwitch/userTrafficByNetworkCard.vue";
import CommonDatesFilter from "@/components/common/commonDatesFilter.vue";
import dashboardDoughnutCard from "@/components/main/dashboard/dashboardDoughnutCard.vue";
import DashboardTabs from "@/components/main/dashboard/dashboardTabs.vue";
import SegmentationVerificationCard from "@/components/users/cards/segmentationVerificationCard.vue";
import { useDashBoardFiltersQuery } from "@/composables/queries/useDashboardQueries";
import type { CustomChartDataBloc } from "@/services/dashboard/dashboard-alpha-type";
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoaderStore } from "@/stores/useLoaderStore";
import {
    CalendarDate
} from '@internationalized/date';
import moment from "moment";
import { storeToRefs } from "pinia";
import type { DateRange } from "radix-vue";
import { computed, ref, watch, type Ref } from "vue";

const { user, fullName } = useAuthStore();

const { startLoadingSkeleton } = useLoaderStore();

const { isLoading, isLoadingSkeleton } = storeToRefs(useLoaderStore());

const { isFetched, data: dashboardData, filters, isLoading: isLoadingFilters } = useDashBoardFiltersQuery();

const isLoadingData = computed(() => {
    return isLoading.value || isLoadingSkeleton.value || isLoadingFilters.value
})

const transactionRepartitionData = computed(() => {
    // if (!canShowStats.value || !isFetched) return [];
    return [
        {
            id: 1, subscriptionType: "Approvisionnement",
            subscriptionCount: 80, color: "#FFB300"
        },
        {
            id: 3, subscriptionType: "Paiement de masse",
            subscriptionCount: 40, color: "#FF7043"
        },
        {
            id: 3, subscriptionType: "Paiement de facture",
            subscriptionCount: 120, color: "#26A69A"
        },
        {
            id: 4, subscriptionType: "Transfert unique",
            subscriptionCount: 120, color: "#3F51B5"
        },
    ]
})
const amountTransactionRepartitionData = computed(() => {
    // if (!canShowStats.value || !isFetched) return [];
    return [
        {
            id: 1, subscriptionType: "Approvisionnement",
            subscriptionCount: 55000, color: "#FFB300"
        },
        {
            id: 3, subscriptionType: "Paiement de masse",
            subscriptionCount: 150000, color: "#FF7043"
        },
        {
            id: 3, subscriptionType: "Paiement de facture",
            subscriptionCount: 100000, color: "#26A69A"
        },
        {
            id: 4, subscriptionType: "Transfert unique",
            subscriptionCount: 90000, color: "#3F51B5"
        },
    ]
})



const collectedBloc = computed<CustomChartDataBloc>(() => {
    const data: CustomChartDataBloc = {
        sum_txns: dashboardData.value?.current_period_stats.sum_collected_txns || 0,
        sum_txns_group_by_provider: dashboardData.value?.sum_collected_txns_group_by_provider || [],
        current_period_stats: {
            count_txns: dashboardData.value?.current_period_stats.count_collected_txns || 0,
            sum_txns: dashboardData.value?.current_period_stats.sum_collected_txns || 0

        },
        previous_period_stats: {
            count_txns: dashboardData.value?.previous_period_stats.count_collected_txns || 0,
            sum_txns: dashboardData.value?.previous_period_stats.sum_collected_txns || 0
        }
    }
    return data;
})




const tabsValue = ref("0");
let date = new Date()
// let momentDate = moment();

const blocCommonText = computed(() => {
    if (tabsValue.value == "0") {
        return " d'aujourd'hui"
    }
    if (tabsValue.value == "1") {
        return " d'hier"
    }
    if (tabsValue.value == "7") {
        return " sur les 7 derniers jours"
    }
    if (tabsValue.value == "30") {
        return " sur les 30 derniers jours"
    }

    return ` entre ${moment(dates.value.start!.toDate('Africa/Abidjan')).format('DD/MM/YYYY')} et ${moment(dates.value.end!.toDate('Africa/Abidjan')).format('DD/MM/YYYY')} `
})

const dates = ref({
    start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>

const updateData = () => {
    tabsValue.value = "";
    console.log("wataru");
    const startDate = dates.value.start!.toDate('Africa/Abidjan')
    const endDate = dates.value.end!.toDate('Africa/Abidjan')
    filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
    startLoadingSkeleton();
}


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

// const transactionRepartitionData = computed<LocalPurChasingCardType[]>(() => {
//     if (!dashboardData.value) return [];
//     return [
//         { id: 1, subscriptionType: "Refusé", subscriptionCount: dashboardData.value!.count_txns_group_by_status.find((item: Status) => item.status == TransactionStatusEnum.FAILED.value)?.count_txns ?? 0, color: "#000000" },
//         { id: 2, subscriptionType: "En cours ", subscriptionCount: dashboardData.value!.count_txns_group_by_status.find((item: Status) => item.status == TransactionStatusEnum.PROCESSING.value)?.count_txns ?? 0, color: "#3b82f6" },
//         { id: 3, subscriptionType: "En attente", subscriptionCount: dashboardData.value!.count_txns_group_by_status.find((item: Status) => item.status == TransactionStatusEnum.PENDING.value)?.count_txns ?? 0, color: "#eab308" },
//         { id: 3, subscriptionType: "Réussi", subscriptionCount: dashboardData.value!.count_txns_group_by_status.find((item: Status) => item.status == TransactionStatusEnum.SUCCESS.value)?.count_txns ?? 0, color: "#22C55E" },
//     ]
// })



</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>