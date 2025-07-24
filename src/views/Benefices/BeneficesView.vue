<template>
    <div class="px-4 bg-white">
        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">
                <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Vos bénéfices
                    Sendchap</h1>
                <!-- <p class="text-neutral-30 text-sm font-normal">Commissions facturées aux utilisateurs et aux partenaires
                </p> -->
            </div>

            <div>
                <notification-icon></notification-icon>
            </div>
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

        <FadeSlideAnimation mode="out-in">

            <section v-if="benefitsData" class="grid grid-cols-3 w-full gap-5 mb-5 md:w-[70%] md:mx-auto">

                <!-- total -->
                <!-- kdo -->
                <!-- transfert -->
                <!-- <div v-if="id == 1" class="w-10 h-10 rounded-full bg-[#f4edfc] flex justify-center items-center">
                    <Database class="text-[#AB7AE6]"></Database>
                </div>
                <div v-else-if="id == 2" class="w-10 h-10 rounded-full bg-[#e4f3db] flex justify-center items-center">
                    <ArrowDownLeftIcon class="text-[#5fd71d]"></ArrowDownLeftIcon>
                </div>
                <div v-else-if="id == 3" class="w-10 h-10 rounded-full bg-[#d1e6f3] flex justify-center items-center">
                    <ArrowUpRightIcon class="text-[#0084CE]"></ArrowUpRightIcon>
                </div> -->

                <CommonStatisticCard :right-text="blocCommonText" :amount="benefitsData.total_profit.toString()"
                    sub-title="Benefice des transferts d'argent" title="Transferts d'argent" :id="3">

                    <template #icon>

                        <div class="w-10 h-10 rounded-full bg-[#d1e6f3] flex justify-center items-center">
                            <ArrowUpRightIcon class="text-[#0084CE]"></ArrowUpRightIcon>
                        </div>
                    </template>
                </CommonStatisticCard>
                <CommonStatisticCard :right-text="blocCommonText" :amount="benefitsData.giftcard_amount.toString()"
                    sub-title="Benefice des cartes cadeaux" title="Cartes cadeaux" :id="2">
                    <template #icon>

                        <div class="w-10 h-10 rounded-full bg-[#e4f3db] flex justify-center items-center">
                            <!-- <ArrowDownLeftIcon class="text-[#5fd71d]"></ArrowDownLeftIcon>
                              -->
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.492 2.11658L12.1564 1.35075C11.1592 1.12498 10.1158 1.22654 9.1808 1.64037C8.24584 2.05421 7.46912 2.75828 6.96576 3.64824L4.2343 4.4396C3.64089 4.60903 3.08677 4.89395 2.60372 5.27801C2.12066 5.66206 1.71818 6.13771 1.41935 6.67765C1.12052 7.2176 0.93123 7.81123 0.862325 8.42449C0.793421 9.03776 0.846262 9.65859 1.01782 10.2514L2.48991 15.3569C2.77304 16.3353 3.36543 17.1957 4.17842 17.8093C4.99141 18.4229 5.98126 18.7566 6.99979 18.7606C7.43904 18.7651 7.8769 18.7107 8.3017 18.5989L11.816 17.5863C12.2353 17.4571 12.6336 17.2679 12.9988 17.0247H13.1605C14.2326 17.0228 15.2724 16.6573 16.1101 15.9881C16.9477 15.3189 17.5338 14.3855 17.7725 13.3402L19.0488 7.78372C19.3263 6.56071 19.1078 5.27758 18.4411 4.21536C17.7745 3.15315 16.714 2.39846 15.492 2.11658V2.11658ZM7.95282 17.3736C7.5193 17.5033 7.06427 17.5452 6.61434 17.497C6.16442 17.4487 5.72863 17.3112 5.33247 17.0925C4.93631 16.8739 4.58774 16.5784 4.30713 16.2234C4.02652 15.8684 3.81951 15.461 3.69822 15.0251L2.22613 9.91953C2.09996 9.48792 2.06057 9.03559 2.11023 8.58867C2.15988 8.14175 2.29761 7.7091 2.51544 7.31571C2.73245 6.91645 3.02721 6.56469 3.38234 6.28117C3.73747 5.99766 4.14577 5.78812 4.58318 5.66492L6.42968 5.12884L5.20435 10.4641C4.92437 11.6906 5.14258 12.9781 5.81106 14.0438C6.47954 15.1096 7.54364 15.8664 8.76971 16.1483L10.6843 16.5822L7.95282 17.3736ZM17.815 7.50291L16.5386 13.0594C16.3623 13.8282 15.9288 14.5138 15.3099 15.0028C14.691 15.4917 13.9237 15.7547 13.1349 15.7483H12.8626C12.6965 15.7458 12.5311 15.7258 12.3691 15.6888L9.02498 14.9229C8.13053 14.7181 7.35393 14.1666 6.86573 13.3897C6.37753 12.6127 6.21764 11.6737 6.42117 10.779L7.69755 5.22244C7.7443 5.04528 7.80403 4.87179 7.87624 4.70338C7.90096 4.63385 7.92936 4.56568 7.96133 4.49916V4.49916C8.29406 3.79077 8.86075 3.21867 9.56595 2.87924C10.2712 2.53981 11.0718 2.45378 11.833 2.63565L15.1771 3.40147C16.0688 3.59917 16.8463 4.14107 17.3403 4.90922C17.8343 5.67737 18.005 6.60958 17.815 7.50291V7.50291Z"
                                    fill="#1A1A1A" />
                            </svg>

                        </div>
                    </template>
                </CommonStatisticCard>
                <CommonStatisticCard :right-text="blocCommonText" :amount="benefitsData.total_fees.toString()"
                    sub-title="Benefice total" title="Total" :id="1">
                    <template #icon>
                        <div class="w-10 h-10 rounded-full bg-[#f4edfc] flex justify-center items-center">
                            <Database class="text-[#AB7AE6]"></Database>
                        </div>
                    </template>
                </CommonStatisticCard>


                <!-- <CommonMiniCard :value="benefitsData.total_profit" title="Bénéfices totaux" :show-chart="false" :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.giftcard_fees" title="Frais cartes cadeaux" :show-chart="false"
                    :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.transfer_fees" title="Frais transferts d'argent" :show-chart="false"
                    :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.net_fees" title="Frais nets" :show-chart="false" :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.total_fees" title="Frais totaux" :show-chart="false" :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.average_conversion_rate" title="Taux de conversion moyen"
                    :show-chart="false" :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.giftcard_amount" title="Montant cartes cadeaux" :show-chart="false"
                    :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.giftcard_count" title="Nombre de cartes cadeaux" :show-chart="false"
                    :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.giftcard_euro_amount" title="Montant € cartes cadeaux"
                    :show-chart="false" :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.total_amount" title="Montant total" :show-chart="false" :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.total_cashin_fees" title="Frais entrée total" :show-chart="false"
                    :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.total_cashout_fees" title="Frais sortie total" :show-chart="false"
                    :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.total_transactions" title="Transactions totales" :show-chart="false"
                    :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.transfer_amount" title="Montant transferts" :show-chart="false"
                    :data="[]">
                </CommonMiniCard>
    
                <CommonMiniCard :value="benefitsData.transfer_count" title="Nombre de transferts" :show-chart="false"
                    :data="[]">
                </CommonMiniCard> -->
            </section>

            <section v-else class="grid grid-cols-3 w-full gap-5 mb-3 md:w-[70%] md:mx-auto">
                <div v-for="i in 15" :key="i" class="animate-pulse bg-gray-200 h-[200px] rounded"></div>
            </section>
        </FadeSlideAnimation>


        <div class="h-[1px] bg-neutral-70 my-5"></div>
    </div>
</template>

<script setup lang="ts">
import CommonMiniCard from '@/components/common/commonMiniCard.vue';
import notificationIcon from '@/components/svg/notificationIcon.vue';
import { useBenefitsFiltersQuery } from '@/composables/queries/useBenefitsQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useRoute } from 'vue-router';
import { computed, ref, watch, type Ref } from 'vue';
import DashboardTabs from '@/components/main/dashboard/dashboardTabs.vue';
import CommonDatesFilter from '@/components/common/commonDatesFilter.vue';
import {
    CalendarDate
} from '@internationalized/date';
import type { DateRange } from "radix-vue";
import CommonStatisticCard from '@/components/common/commonStatisticCard.vue';
import { ArrowDownLeftIcon, ArrowUpRightIcon, Database } from 'lucide-vue-next';
import moment from 'moment';
import FadeSlideAnimation from '@/components/animations/fadeSlideAnimation.vue';

const { data: benefitsData, isFetched, filters, isLoading, isSuccess, isFetching } = useBenefitsFiltersQuery();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();

const route = useRoute();

const tabsValue = ref("0");
let date = new Date()


const dates = ref({
    start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>

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

const updateData = () => {
    tabsValue.value = "";

    const startDate = dates.value.start!.toDate('Africa/Abidjan')
    const endDate = dates.value.end!.toDate('Africa/Abidjan')
    filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
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

})

// Gérer le chargement
watch([isLoading, isFetching], ([newIsLoading, newIsFetching]) => {
    if (newIsLoading || newIsFetching) {
        startLoadingSkeleton();
    } else {
        stopLoadingSkeleton();
    }
});

const nextPage = async () => {
    filters.page = filters.page + 1;
    startLoadingSkeleton();
}

const goToPage = async (page: number) => {
    filters.page = page;
    startLoadingSkeleton();
}

const prevPage = async () => {
    filters.page = filters.page - 1;
    startLoadingSkeleton();
}
</script>

<style scoped></style>