<template>



    <div v-if="data.total_gift_card_broup_by_brand && data.total_gift_card_broup_by_brand.length > 0"
        class="bg-white p-5 rounded-xl shadow border border-neutral-70 flex flex-col justify-between gap-6 font-worksans ">
        <section class="flex justify-between items-end xl:h-[150px] h-[100px] space-x-3">
            <!-- chart doughnut -->
            <div class="max-w-[30%] xl:w-[150px]  h-full flex items-center" v-if="data.total > 0">
                <!-- <doughnut-chart :data="card.chartData" :options="chartOptions" /> -->
                <doughnut-chart class="mb-2 " :data="chartData" :options="chartOptions" />
            </div>
            <!-- informations transaction -->
            <div class="flex h-full flex-col w-full xl:justify-between justify-around pt-2">

                <article class="flex justify-between  w-full">
                    <p class="font-medium text-[16px]">{{ title }}</p>
                    <!-- <MoreVertical class="w-4 h-4" /> -->
                </article>

                <div>
                    <article class="mb-2">
                        <p class="text-sm font-medium text-neutral-20">{{ subTitle }}</p>
                    </article>

                    <article class="flex justify-between items-center">
                        <p class="font-merriweathersans font-bold text-lg xl:text-[28px]">{{ isMoney ?
                            formatPrice(data.total) : data.total }}
                        </p>
                        <CommonBadge v-if="currentPercentage != 0" :type="isUp ? 'up' : 'down'"
                            :value="currentPercentage.toFixed(2)"></CommonBadge>
                    </article>
                </div>

            </div>
        </section>

        <section v-if="data.total == 0">
            <div class="my-2 h-[1px] bg-neutral-70 mx-4"></div>

            <p class="text-sm font-medium text-neutral-20 mx-5 text-center">Aucune carte cadeau trouvée</p>
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
    Chart as ChartJS,
    Legend,
    Title,
    Tooltip,
    type ChartData,
    type ChartOptions
} from 'chart.js';
import { Doughnut as DoughnutChart } from "vue-chartjs";

import CommonBadge from '@/components/common/commonBadge.vue';
import { formatPrice, generateColor } from '@/lib/utils';
import type { CustomGiftCardDataBloc } from '@/services/dashboard/dashboard-alpha-type';
import { computed, onBeforeUnmount, ref, type PropType } from 'vue';
import { storeToRefs } from 'pinia';
import { useLoaderStore } from '@/stores/useLoaderStore';
import FadeSlideAnimation from '@/components/animations/fadeSlideAnimation.vue';

ChartJS.register(

    ArcElement,
    Title,
    Tooltip,
    Legend


);

setTimeout(() => {

    ChartJS.register(customDoughnutPlugin);

}, 50);




const { data, giftCardDataColor, isLoadingFilters } = defineProps({
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
    showNetworkDetails: {
        type: Boolean,
        required: false,
        default: true
    },
    data: {
        type: Object as PropType<CustomGiftCardDataBloc>,
        required: true
    },
    giftCardDataColor: {
        type: Object as PropType<{ name: string, color: string }[]>,
        required: true
    },
    isLoadingFilters: {
        type: Boolean,
        required: true,
    }
});


const isRegister = ref(false);

setTimeout(() => {
    isRegister.value = true
}, 200)


// const { isLoading, isLoadingSkeleton } = storeToRefs(useLoaderStore());

// const isLoadingData = computed(() => {
//     return isLoading.value || isLoadingSkeleton.value || isLoadingFilters
// })

const customDoughnutPlugin = {
    id: 'customDoughnutPluginNetwork',
    afterDraw: (chart: ChartJS) => {
        if (data.total == 0) {
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
            const radiusMultipliers = [1];
            // const radiusMultipliers = createDecreasingArray({ numberOfElements: data.total_gift_card_broup_by_brand.length });

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




const currentChartDataValues = computed<number[]>(() => {
    if (!isRegister.value) return [];
    return data.total_gift_card_broup_by_brand?.map((d) => {

        return Math.round((d.sum_or_total * 100) / data.total)
    }) as number[]
})




const currentPercentage = computed(() => {
    // percentage of difference
    if (data.total == 0 && data.previous_period_stats?.total == 0) {
        return 0;
    }
    else if (data.current_period_stats?.total == 0 && data.previous_period_stats?.total != 0) {
        return 0;
    }

    else if (data.previous_period_stats?.total == 0 && data.total != 0) {
        return 100
    }

    return (Math.abs(data.total - data.previous_period_stats!.total) * 100) / data.previous_period_stats!.total;

})

const isUp = computed(() => {
    return data.total - data.previous_period_stats!.total > 0 ? true : false;
})



// onBeforeMount(() => {


// })



const chartData
    = computed<ChartData<"doughnut", number[], CustomDataPoint>>(() => {

        return {
            datasets: [

                {

                    borderWidth: 0,

                    // data: [99],

                    data: currentChartDataValues.value,

                    backgroundColor:
                        giftCardDataColor.map((d) => d.color)
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



const arrayTooltips = ref(
    data.total_gift_card_broup_by_brand!.map((d, index) => {
        return {
            id: index.toString(),
            amount: d.sum_or_total.toString(), //partie
            color: giftCardDataColor[index].color,
            label: d.brand == "" ? "No brand name" : d.brand,
            percentage: Math.round((d.sum_or_total * 100) / data.total).toString(),
            value: data.total //total
        };
    })

    // {
    //     id: "4",
    //     amount: "11450551",
    //     color: "#1DC8FF",
    //     label: "Wave",
    //     percentage: "55",
    //     value: 23450551
    // }
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

                    const test = arrayTooltips.value[dataPoint.dataIndex];
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
                        <p class="font-medium text-neutral-20">${formatPrice(parseInt(test.amount))
                        }  / ${formatPrice(test.value)} </p>
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

const currentData = computed(() => {
    return data.total_gift_card_broup_by_brand.length;
})





</script>

<style scoped>
.card {
    width: 300px;
}
</style>