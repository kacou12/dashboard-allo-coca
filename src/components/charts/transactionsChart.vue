<template>

    <!-- <div class=""> -->
    <div class="flex justify-end text-sm ">
        <section class="flex flex-wrap sm:flex-nowrap sm:items-center gap-3  group ">
            <CustomButton :disabled="currentTypeTransactionFilter == 'all'"
                @click="currentTypeTransactionFilter = 'all'" type="outline">
                Globale
            </CustomButton>
            <CustomButton :disabled="currentTypeTransactionFilter == 'collected'"
                @click="currentTypeTransactionFilter = 'collected'" type="outline">
                Collecte
            </CustomButton>
            <CustomButton @click="currentTypeTransactionFilter = 'transferred'"
                :disabled="currentTypeTransactionFilter == 'transferred'" type="outline">
                Transfert
            </CustomButton>

        </section>

    </div>
    <div class="h-[314px]">


        <bar-chart
            :data="currentTypeTransactionFilter === 'collected' ? chartDataCollected : currentTypeTransactionFilter === 'all' ? mergedChartData : chartDataTransferred"
            :options="chartOptions"></bar-chart>
    </div>
    <!-- </div> -->

</template>

<script setup lang="ts">

import type { Collected, CountTxnsGroupByProviderAndType } from '@/services/dashboard/dashboard-alpha-type';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    type ChartData,
    type ChartOptions
} from 'chart.js';
import { computed, ref, type PropType } from 'vue';
import { Bar as BarChart } from 'vue-chartjs';
import CustomButton from '../buttons/customButton.vue';
import { formatPrice } from '@/lib/utils';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { chartDataCollected, chartDataTransferred, rawData } = defineProps({
    chartDataTransferred: {
        type: Object as PropType<ChartData<"bar">>,
        required: true
    },
    chartDataCollected: {
        type: Object as PropType<ChartData<"bar">>,
        required: true
    },
    mergedChartData: {
        type: Object as PropType<ChartData<"bar">>,
        required: true
    },
    rawData: {
        type: Object as PropType<CountTxnsGroupByProviderAndType>,
        required: true
    }
})

const currentTypeTransactionFilter = ref<'all' | 'collected' | 'transferred'>('all');
// to known what element bar is hover
const dataSetIndex = ref<number | undefined>();

const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Taux ',
                font: {
                    // size: 14,

                    family: "Work Sans"
                },
                // Rotation du texte si nécessaire

            }



        },
        x: {

            ticks: {
                // fontFamily: 'FontAwesome'
                font: {
                    family: "Work Sans"
                }
            },
            title: {
                display: true,
                text: 'Réseau',
                font: {
                    size: 14,
                    family: "Work Sans"
                },
                // Rotation du texte si nécessaire

            }

            // axis:

            //   barPercentage: 0.6, // set the bar width to 60% of the category width
            //   categoryPercentage: 0.8 // set the category width to 80% of the overall chart area
        }
    },




    plugins: {

        legend: {

            display: false
            // tooltip
        },


        tooltip: {
            enabled: false,  // Désactive le tooltip par défaut
            external: function (context) {
                // console.log("banaro")
                // Récupère l'élément tooltip
                let tooltipEl = document.getElementById('chartjs-tooltip');

                // Crée le tooltip s'il n'existe pas
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip';
                    tooltipEl.innerHTML = '<div></div>';
                    document.body.appendChild(tooltipEl);
                }

                // Cache le tooltip si le hover est terminé
                const tooltipModel = context.tooltip;
                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = '0';
                    return;
                }


                // Met à jour le contenu
                if (tooltipModel.body) {
                    const dataPoint = tooltipModel.dataPoints[0];
                    // console.log(`yep ${dataPoint.dataIndex}`);

                    const data = context.chart.data.datasets[0].data[dataPoint.dataIndex] as any;

                    dataSetIndex.value = dataPoint.datasetIndex;

                    const test = transformToTooltips.value[dataPoint.dataIndex];

                    // const data: CustomDataPoint = {
                    //     id: "1",
                    //     amount: "11450551",
                    //     color: "orange",
                    //     label: "Orange",
                    //     percentage: "55",
                    //     value: 23450551
                    // }

                    const innerHtml = `
                 <div class="text-xs bg-white rounded-md p-5 shadow-lg font-worksans">
                    <section class="flex gap-1 items-center">
                        <div style="background-color: ${test.color};" class="w-2 h-2 rounded-full"></div>
                        <p class="font-bold">${test.label}</p>
                    </section>
                    <section>
                        <p class="font-medium text-neutral-20">${formatPrice(data)}  / ${formatPrice(test.value)}</p>
                    </section>
                    <section class="font-medium  text-neutral-20">
                        <p>soit  ${test.percentage}%</p>
                    </section>
                 </div>`;

                    tooltipEl.querySelector('div')!.innerHTML = innerHtml;
                }

                // Positionne le tooltip
                const position = context.chart.canvas.getBoundingClientRect();
                const bodyFont = { size: 14 };

                tooltipEl.style.opacity = '1';
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 30 + 'px';
                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                tooltipEl.style.pointerEvents = '';
                tooltipEl.style.transition = 'all .3s ease';
            }
        },

    }

};

const generateHexColorForProvider = (provider: string) => {
    // Générer une couleur hexadécimale unique basée sur le nom du provider
    let hash = 0;
    for (let i = 0; i < provider.length; i++) {
        hash = provider.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Générer une couleur hexadécimale
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;

    // Assurer une luminosité et saturation suffisantes
    const adjustColor = (color: number) => Math.min(Math.max(color, 70), 200);

    return `#${adjustColor(r).toString(16).padStart(2, '0') +
        adjustColor(g).toString(16).padStart(2, '0') +
        adjustColor(b).toString(16).padStart(2, '0')
        }`;
}



const transformToTooltips = computed(() => {
    // const rawDataCollected = rawData.collected[0].;
    let currentRawData: Collected[] = [];

    // currentTypeTransactionFilter.value === 'collected' ? rawData.collected : rawData.transfered

    if (currentTypeTransactionFilter.value == 'collected') {
        currentRawData = rawData.collected;
    } else if (currentTypeTransactionFilter.value == 'transferred') {
        currentRawData = rawData.transfered;
    } else {
        currentRawData = [...rawData.collected, ...rawData.transfered];
    }


    if (dataSetIndex.value == 0) {
        currentRawData = currentRawData.filter(item => item.status.toLowerCase().includes('succ'));
    }
    if (dataSetIndex.value == 1) {

        currentRawData = currentRawData.filter(item => item.status.toLowerCase().includes('fail'));
    }



    // Calculer le total des transactions
    const totalTransactions = currentRawData.reduce((sum, item) => sum + item.count_txns, 0);

    // Regrouper par provider et calculer les totaux
    const providerTotals = currentRawData.reduce((acc: any, item) => {
        if (!acc[item.name_provider]) {
            acc[item.name_provider] = {
                total: 0,
                types: new Set()
            };
        }
        acc[item.name_provider].total += item.count_txns;
        acc[item.name_provider].types.add(item.status);
        return acc;
    }, {});

    // Transformer en tableau de tooltips
    const tooltips = Object.entries(providerTotals).map(([provider, data]: [string, any], index) => ({
        id: (index + 1).toString(),
        amount: data.total.toLocaleString(), // Formatage du montant
        color: generateHexColorForProvider(provider), // Génération dynamique de la couleur hexadécimale
        label: provider,
        percentage: ((data.total / totalTransactions) * 100).toFixed(2), // Pourcentage
        value: data.total,

        // types: Array.from(data.types) // Types de transactions pour ce provider
    }));

    return tooltips;
})


</script>