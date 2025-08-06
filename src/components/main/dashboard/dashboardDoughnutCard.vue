<template>

    <div :key="componentKey"
        class="bg-white p-5 rounded-lg shadow border border-neutral-70  gap-6 font-worksans h-full">

        <p class="font-medium">Flux de trésorerie</p>
        <section
            class="flex flex-col sm:flex-row sm:justify-between  sm:items-end xl:h-[180px] w-[180px] sm:h-[100px] sm:space-x-3">
            <!-- chart doughnut -->
            <div class="sm:h-full  w-full" v-if="data.sum_txns_group_by_provider!.length > 0">

                <doughnut-chart ref="doughnutRef" class="" :data="chartData" :options="chartOptions" />
            </div>

        </section>
        <section class="mt-4">

            <div class="flex items-center gap-1">
                <div class="w-2 h-2 rounded-full bg-[#F44336]" />
                <span class="text-[14px]  text-[#1A1A1A]">
                    Sorties
                </span>
            </div>
            <div class="flex items-center gap-1">
                <div class="w-2 h-2 rounded-full  bg-[#4CAF50]" />
                <span class="text-[14px] text-[#1A1A1A]">
                    Entrées
                </span>
            </div>
        </section>




    </div>


</template>

<script setup lang="ts">

interface CustomDataPoint {
    id: string;
    value: number;
    label: string;
    amount: string;
    percentage: string;
    color: string;
}
import {
    ArcElement,
    Chart,
    Chart as ChartJS,
    Legend,
    Title,
    Tooltip,
    type ChartData,
    type ChartOptions
} from 'chart.js';

import { Doughnut as DoughnutChart } from "vue-chartjs";



import CommonBadge from '@/components/common/commonBadge.vue';
import type { CustomChartDataBloc } from '@/services/dashboard/dashboard-alpha-type';
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref, useTemplateRef, watch, type PropType } from 'vue';
import { getProviderColor } from '@/services/auth/auth-util';
import { createDecreasingArray, formatPrice } from '@/lib/utils';
import { templateRef } from '@vueuse/core';

ChartJS.register(

    ArcElement,
    Title,
    Tooltip,
    Legend

);


setTimeout(() => {

    ChartJS.register(customDoughnutPlugin);

}, 100);


const customDoughnutPlugin = {
    id: 'customDoughnutPlugin',

    afterDraw: (chart: ChartJS) => {
        if (data.sum_txns == 0) {
            return;
        }
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        const GAP_ANGLE = 0.02;

        if (!meta.data || (meta.data! as Array<any>).length == 0) return;

        ctx.save();
        // ctx .clearRect(0, 0, chart.width, chart.height);
        const firstDatapoint = meta.data[0];
        ctx.beginPath();
        // @ts-ignore
        ctx.arc(firstDatapoint.x, firstDatapoint.y, firstDatapoint.outerRadius + 1, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        meta.data.forEach((datapoint: any, index) => {
            // const radiusMultipliers = [0.85, 0.90, 0.95, 1];
            const radiusMultipliers = createDecreasingArray({ numberOfElements: data.sum_txns_group_by_provider!.length });

            const { x, y } = datapoint;
            const innerRadius = datapoint.innerRadius * radiusMultipliers[index];
            const outerRadius = datapoint.outerRadius;
            const startAngle = datapoint.startAngle + GAP_ANGLE;
            const endAngle = datapoint.endAngle - GAP_ANGLE;

            ctx.beginPath();
            ctx.arc(x, y, outerRadius, startAngle, endAngle);
            ctx.arc(x, y, innerRadius, endAngle, startAngle, true);
            ctx.closePath();

            // Appliquer le style
            // @ts-ignore
            ctx.fillStyle = chart.data.datasets[0].backgroundColor![index] as string;
            ctx.fill();
        });

        ctx.restore();
    }
};

// ChartJS.register(customDoughnutPlugin);



// const doughnutRef = templateRef<HTMLCanvasElement>('doughnutRef', null);
const isRegister = ref(false);
const componentKey = ref(0);

const doughnutRef = ref();




setTimeout(() => {
    isRegister.value = true
}, 200)


const currentChartDataValues = computed<number[]>(() => {
    if (!isRegister.value) return [];
    return data.sum_txns_group_by_provider?.map((d) => {

        return Math.round((d.sum_txns * 100) / data.sum_txns)
    }) as number[]
})



watch(isRegister, () => {

    componentKey.value += 1;
    // chartInstance.update();


}, { once: true })











const { data } = defineProps({
    title: {
        type: String,
        required: false,
        default: "Envoi d'argent inter reseau"
    },
    subTitle: {
        type: String,
        required: true,
        // default: "Transaction de la journée"
    },
    isMoney: {
        type: Boolean,
        required: false,
        default: true
    },
    amount: {
        type: Number,
        required: false,
        default: 23450551
    },
    percentage: {
        type: Number,
        required: false,
        default: 5
    },
    data: {
        type: Object as PropType<CustomChartDataBloc>,
        required: true
    }

});

const currentData = computed(() => {
    return data.sum_txns_group_by_provider!.length;
})

// watch(currentData, () => {
//     // if (data.sum_txns > 0) {
//     ChartJS.register(customDoughnutPlugin);
//     // }

// }, { immediate: true })




// data.sum_txns_group_by_provider
const chartData
    = computed<ChartData<"doughnut", number[], CustomDataPoint>>(() => {

        return {
            datasets: [

                {

                    borderWidth: 0,


                    data: currentChartDataValues.value,

                    backgroundColor:
                        data.sum_txns_group_by_provider!.map((d, index) => {
                            return getProviderColor(d.provider.name)!;
                        })
                    // [
                    //     "#005CA8",
                    //     "#1DC8FF",
                    //     "#F58220",
                    //     "#FFC403",
                    // ]
                    ,
                    circumference: 360,

                },
            ],
        }

    })

const arrayTooltips = ref(
    data.sum_txns_group_by_provider!.map((d, index) => {
        return {
            id: index.toString(),
            amount: d.sum_txns.toString(), //partie
            color: getProviderColor(d.provider.name),
            label: d.provider,
            percentage: Math.round((d.sum_txns * 100) / data.sum_txns).toString(),
            value: data.sum_txns //total
        };


    })

);


const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    aspectRatio: 1,

    // elements: {
    //     arc: {
    //         spacing: 0,
    //         borderRadius: 0
    //     }
    // },

    plugins: {

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

                    const providerData = arrayTooltips.value[dataPoint.dataIndex];
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
                        <div style="background-color: ${providerData.color};" class="w-2 h-2 rounded-full"></div>
                        <p class="font-bold">${providerData.label.name}</p>
                    </section>
                    <section>
                        <p class="font-medium text-neutral-20">${formatPrice(parseInt(providerData.amount))}  / ${formatPrice(providerData.value)} </p>
                    </section>
                    <section class="font-medium  text-neutral-20">
                        <p>soit ${providerData.percentage}%</p>
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

        legend: {

            display: true,
            position: "top",
        },
    },
};

onBeforeUnmount(() => {
    // Nettoyer le plugin quand le composant est détruit
    ChartJS.unregister(customDoughnutPlugin);


});

onMounted(() => {

    data.sum_txns_group_by_provider?.map((d) => {

        return Math.round((d.sum_txns * 100) / data.sum_txns)
    }) as number[];

    const results = data.sum_txns_group_by_provider?.map((d) => {

        return Math.round((d.sum_txns * 100) / data.sum_txns)
    }) as number[];

    const uno = results;


})




</script>

<style scoped></style>