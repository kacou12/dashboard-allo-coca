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

        <!-- Contenu principal -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6  ">
            <!-- Cards principales -->

            <FadeSlideAnimation mode="out-in">
                <div v-if="isLoadingData" class=" rounded-xl shadow 0 font-worksans">
                    <div class="animate-pulse bg-gray-200 h-[409px] rounded-xl"></div>
                </div>
                <dashboardDoughnutCard :sub-title="`Transaction ${blocCommonText}`" v-else :data="collectedBloc"
                    title="Montant total collecté">
                </dashboardDoughnutCard>
            </FadeSlideAnimation>

            <FadeSlideAnimation mode="out-in">
                <div v-if="isLoadingData" class=" rounded-xl shadow 0 font-worksans">
                    <div class="animate-pulse bg-gray-200 h-[409px] rounded-xl"></div>
                </div>
                <dashboardDoughnutCard :sub-title="`Transaction ${blocCommonText}`" v-else :data="transferedBloc"
                    title="Montant total transferé">
                </dashboardDoughnutCard>
            </FadeSlideAnimation>



            <FadeSlideAnimation mode="out-in">


                <div v-if="isLoadingData" class=" rounded-xl shadow 0 font-worksans">
                    <div class="animate-pulse bg-gray-200 h-[192px] rounded-xl"></div>

                </div>

                <DashboardDoughnutWithoutNetworkCard v-else :is-loading-filters="isLoadingFilters"
                    :gift-card-data-color="giftCardDataColor"
                    :sub-title="`Montant total de cartes cadeaux  ${blocCommonText}`" :data="giftCardAmountBloc"
                    title="Montant total de cartes cadeaux" :show-network-details="false">
                </DashboardDoughnutWithoutNetworkCard>
            </FadeSlideAnimation>






            <FadeSlideAnimation mode="out-in">


                <div v-if="isLoadingData" class=" rounded-xl shadow 0 font-worksans">
                    <div class="animate-pulse bg-gray-200 h-[192px] rounded-xl"></div>

                </div>

                <DashboardDoughnutWithoutNetworkCard v-else :is-loading-filters="isLoadingFilters"
                    :gift-card-data-color="giftCardDataColor" :data="giftCardCountBloc" :is-money="false"
                    title="Nombre total de cartes cadeaux" :sub-title="`Nombre  de cartes cadeaux  ${blocCommonText}`"
                    :show-network-details="false">
                </DashboardDoughnutWithoutNetworkCard>
            </FadeSlideAnimation>



        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            <DashboardUserCard title="Nombre total de transferts d'argent"
                :preview_count="dashboardData?.previous_period_stats.count_transferts_txns"
                :count="dashboardData?.current_period_stats.count_transferts_txns"></DashboardUserCard>
            <!-- :amount="dashboardData?.current_period_stats.count_transferts_txns"></DashboardUserCard> -->

            <div>

                <CommonBarStatut title="Nombre total de transactions" :items="transactionRepartitionData">
                </CommonBarStatut>
            </div>

        </section>

        <!-- Trafic des utilisateurs par reseau -->
        <section class="">
            <UserTrafficByNetworkCard :data="dashboardData!.count_txns_group_by_type_and_month" v-if="isFetched"
                class="my-8">
            </UserTrafficByNetworkCard>

        </section>



        <!-- Status de transactions -->
        <section class="flex flex-col lg:flex-row h-[455px] gap-4  my-5 ">
            <div class=" lg:w-[60%]">

                <FadeSlideAnimation class="h-full" mode="out-in">
                    <div v-if="isLoadingData" class=" rounded-xl shadow 0 font-worksans">
                        <div class="animate-pulse bg-gray-200 h-[455px]  rounded-xl"></div>
                    </div>
                    <DashboardTransactionsChart v-else :data="dashboardData!.count_txns_group_by_provider_and_type">
                    </DashboardTransactionsChart>
                </FadeSlideAnimation>


            </div>
            <div class="lg:w-[40%]">

                <FadeSlideAnimation class="h-full" mode="out-in">
                    <div v-if="isLoadingData" class=" rounded-xl shadow 0 font-worksans">
                        <div class="animate-pulse bg-gray-200  h-[455px] rounded-xl"></div>
                    </div>
                    <DashboardRecentTransactions v-else :transactions="dashboardData!.txns_recents">
                    </DashboardRecentTransactions>
                </FadeSlideAnimation>

            </div>
        </section>



    </div>
</template>

<script setup lang="ts">
import UserTrafficByNetworkCard from "@/components/aggregatorSwitch/userTrafficByNetworkCard.vue";
import FadeSlideAnimation from "@/components/animations/fadeSlideAnimation.vue";
import CommonBarStatut from "@/components/common/commonBarStatut.vue";
import CommonDatesFilter from "@/components/common/commonDatesFilter.vue";
import dashboardDoughnutCard from "@/components/main/dashboard/dashboardDoughnutCard.vue";
import DashboardDoughnutWithoutNetworkCard from "@/components/main/dashboard/dashboardDoughnutWithoutNetworkCard.vue";
import DashboardRecentTransactions from "@/components/main/dashboard/dashboardRecentTransactions.vue";
import DashboardTabs from "@/components/main/dashboard/dashboardTabs.vue";
import DashboardTransactionsChart from "@/components/main/dashboard/dashboardTransactionsChart.vue";
import DashboardUserCard from "@/components/main/dashboard/dashboardUserCard.vue";
import { useDashBoardFiltersQuery } from "@/composables/queries/useDashboardQueries";
import { TransactionStatusEnum } from "@/interfaces/datatable.interface";
import type { LocalPurChasingCardType } from "@/interfaces/giftCard.interface";
import { generateColor } from "@/lib/utils";
import type { CustomChartDataBloc, CustomGiftCardDataBloc, Status } from "@/services/dashboard/dashboard-alpha-type";
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

const transferedBloc = computed<CustomChartDataBloc>(() => {
    const data: CustomChartDataBloc = {
        sum_txns: dashboardData.value?.current_period_stats.sum_transfered_txns || 0,
        sum_txns_group_by_provider: dashboardData.value?.sum_transfered_txns_group_by_provider || [],
        current_period_stats: {
            count_txns: dashboardData.value?.current_period_stats.count_transferts_txns || 0,
            sum_txns: dashboardData.value?.current_period_stats.sum_transfered_txns || 0
        },
        previous_period_stats: {
            count_txns: dashboardData.value?.previous_period_stats.count_transferts_txns || 0,
            sum_txns: dashboardData.value?.previous_period_stats.sum_transfered_txns || 0
        }
    }
    return data;
})


const giftCardAmountBloc = computed<CustomGiftCardDataBloc>(() => {
    const data: CustomGiftCardDataBloc = {
        total: dashboardData.value?.current_period_stats.sum_giftcard_txns || 0,
        total_gift_card_broup_by_brand: dashboardData.value?.total_amount_gift_cards_group_by_brand.map((item) => { return { brand: item.brand, sum_or_total: item.total_amount } }) || [],
        current_period_stats: {
            total: dashboardData.value?.current_period_stats.sum_giftcard_txns || 0,

            // calculated_total: dashboardData.value?.current_period_stats.sum_giftcard_txns || 0
        },
        previous_period_stats: {
            total: dashboardData.value?.previous_period_stats.sum_giftcard_txns || 0,
            // calculated_total: dashboardData.value?.previous_period_stats.sum_giftcard_txns || 0
        }

    }
    return data;
})

const defaultGiftCardColor = [
    {
        name: "apple",
        color: "#000000"
    },
    {
        name: "xbox",
        color: "#22C55E"
    },
    {
        name: "playstation",
        color: "#3B82F6"
    },
    {
        name: "netflix",
        color: "#EF4444"
    }
]

const getColorTootip = (name: string) => {
    const finded = defaultGiftCardColor.find((d) => d.name == name);
    return finded == undefined ? generateColor() : finded.color;
}


const giftCardDataColor = computed(() => {
    const dataColor: { name: string, color: string }[] = []
    dashboardData.value?.total_amount_gift_cards_group_by_brand.forEach((d, index) => {
        dataColor.push({
            name: d.brand,
            color: getColorTootip(d.brand)
        })
    });
    return dataColor;
})
const giftCardCountBloc = computed<CustomGiftCardDataBloc>(() => {
    const data: CustomGiftCardDataBloc = {
        total: dashboardData.value?.current_period_stats.count_giftcard_txns || 0,
        total_gift_card_broup_by_brand: dashboardData.value?.count_gift_cards_group_by_brand.map((item) => { return { brand: item.brand, sum_or_total: item.count } }) || [],
        current_period_stats: {
            total: dashboardData.value?.current_period_stats.count_giftcard_txns || 0
        },
        previous_period_stats: {
            total: dashboardData.value?.previous_period_stats.count_giftcard_txns || 0
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

const transactionRepartitionData = computed<LocalPurChasingCardType[]>(() => {
    if (!dashboardData.value) return [];
    return [
        { id: 1, subscriptionType: "Refusé", subscriptionCount: dashboardData.value!.count_txns_group_by_status.find((item: Status) => item.status == TransactionStatusEnum.FAILED.value)?.count_txns ?? 0, color: "#000000" },
        { id: 2, subscriptionType: "En cours ", subscriptionCount: dashboardData.value!.count_txns_group_by_status.find((item: Status) => item.status == TransactionStatusEnum.PROCESSING.value)?.count_txns ?? 0, color: "#3b82f6" },
        { id: 3, subscriptionType: "En attente", subscriptionCount: dashboardData.value!.count_txns_group_by_status.find((item: Status) => item.status == TransactionStatusEnum.PENDING.value)?.count_txns ?? 0, color: "#eab308" },
        { id: 3, subscriptionType: "Réussi", subscriptionCount: dashboardData.value!.count_txns_group_by_status.find((item: Status) => item.status == TransactionStatusEnum.SUCCESS.value)?.count_txns ?? 0, color: "#22C55E" },
    ]
})

</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>