<template>
    <div class="bg-white p-4 rounded-lg shadow border border-neutral-70 h-full">
        <section class="flex justify-between mx-5 ">
            <div class="flex flex-col gap-2 ">
                <h2 class="font-bold font-merriweathersans text-sm lg:text-xl ">Statut des transactions</h2>
                <p class="text-xs lg:text-sm text-neutral-20 font-normal ">Taux de réussite et d'échec des transactions
                </p>
            </div>


        </section>
        <div class="w-full h-[1px] bg-neutral-80 my-3"></div>
        <!-- <div class="h-[314px] bg-purple-400"> -->




        <section v-if="rawData.collected.length === 0 && rawData.transfered.length === 0"
            class="flex items-center justify-center h-full">
            <p class="text-sm  text-neutral-50 mx-5 text-center">Aucune transaction trouvée</p>
        </section>

        <TransactionsChart v-else :raw-data="data" :merged-chart-data="transformMergedChartData"
            :chart-data-collected="transformCollectedChartData" :chart-data-transferred="transformTransferredChartData">
        </TransactionsChart>



    </div>
</template>

<script setup lang="ts">
import TransactionsChart from '@/components/charts/transactionsChart.vue';
import type { CountTxnsGroupByProviderAndType } from '@/services/dashboard/dashboard-alpha-type';
import type { ChartData } from 'chart.js';
import { computed, ref, type PropType } from 'vue';


const { data: rawData } = defineProps({
    data: {
        type: Object as PropType<CountTxnsGroupByProviderAndType>,
        required: true
    }
})

// Fonction pour transformer les données brutes
const transformCollectedChartData = computed(() => {
    {
        // get collected type
        const filterData = rawData.collected;
        // Extraire les providers uniques
        const providers = [...new Set(filterData.map(item => item.name_provider))];

        // Préparer les données pour les transferts d'argent
        const successData = providers.map(provider => {
            const providerTransfers = filterData.filter(
                item => item.name_provider === provider && item.status.toLowerCase().includes("succ")
            );
            return providerTransfers.reduce((sum, item) => sum + item.count_txns, 0);
        });

        // Préparer les données pour les cartes cadeaux
        const failedData = providers.map(provider => {
            const providerGiftcards = filterData.filter(
                item => item.name_provider === provider && item.status.toLowerCase().includes("fail")
            );
            return providerGiftcards.reduce((sum, item) => sum + item.count_txns, 0);
        });

        // Créer la structure Chart.js
        const chartDataTransferred: ChartData<"bar"> = {
            labels: providers,
            datasets: [
                {
                    backgroundColor: '#4CAF50', // Vert
                    data: successData,
                    barThickness: 20,
                    borderRadius: 10,
                    borderWidth: 4,
                    borderColor: 'white'
                },
                {
                    backgroundColor: "#F44336", // Rouge
                    data: failedData,
                    barThickness: 20,
                    borderRadius: 10,
                    borderWidth: 4,
                    borderColor: 'white'
                }
            ]
        };

        return chartDataTransferred;
    }
})
const transformTransferredChartData = computed(() => {
    {
        // get collected type
        const filterData = rawData.transfered;
        // Extraire les providers uniques
        const providers = [...new Set(filterData.map(item => item.name_provider))];

        // Préparer les données pour les transferts d'argent
        const successData = providers.map(provider => {
            const providerTransfers = filterData.filter(
                item => item.name_provider === provider && item.status.toLowerCase().includes("succ")
            );
            return providerTransfers.reduce((sum, item) => sum + item.count_txns, 0);
        });

        // Préparer les données pour les cartes cadeaux
        const failedData = providers.map(provider => {
            const providerGiftcards = filterData.filter(
                item => item.name_provider === provider && item.status.toLowerCase().includes("fail")
            );
            return providerGiftcards.reduce((sum, item) => sum + item.count_txns, 0);
        });

        // Créer la structure Chart.js
        const chartDataTransferred: ChartData<"bar"> = {
            labels: providers,
            datasets: [
                {
                    backgroundColor: '#4CAF50', // Vert
                    data: successData,
                    barThickness: 20,
                    borderRadius: 10,
                    borderWidth: 4,
                    borderColor: 'white'
                },
                {
                    backgroundColor: "#F44336", // Rouge
                    data: failedData,
                    barThickness: 20,
                    borderRadius: 10,
                    borderWidth: 4,
                    borderColor: 'white'
                }
            ]
        };

        return chartDataTransferred;
    }
})

const transformMergedChartData = computed(() => {
    {
        // get collected type
        const filterData = rawData.collected.concat(rawData.transfered);
        // Extraire les providers uniques
        const providers = [...new Set(filterData.map(item => item.name_provider))];

        // Préparer les données pour les transferts d'argent
        const successData = providers.map(provider => {
            const providerTransfers = filterData.filter(
                item => item.name_provider === provider && item.status.toLowerCase().includes("succ")
            );
            return providerTransfers.reduce((sum, item) => sum + item.count_txns, 0);
        });

        // Préparer les données pour les cartes cadeaux
        const failedData = providers.map(provider => {
            const providerGiftcards = filterData.filter(
                item => item.name_provider === provider && item.status.toLowerCase().includes("fail")
            );
            return providerGiftcards.reduce((sum, item) => sum + item.count_txns, 0);
        });

        // Créer la structure Chart.js
        const chartDataTransferred: ChartData<"bar"> = {
            labels: providers,
            datasets: [
                {
                    backgroundColor: '#4CAF50', // Vert
                    data: successData,
                    barThickness: 20,
                    borderRadius: 10,
                    borderWidth: 4,
                    borderColor: 'white'
                },
                {
                    backgroundColor: "#F44336", // Rouge
                    data: failedData,
                    barThickness: 20,
                    borderRadius: 10,
                    borderWidth: 4,
                    borderColor: 'white'
                }
            ]
        };

        return chartDataTransferred;
    }
})

// const transformMergedChartData = computed(() => {




</script>

<style scoped></style>