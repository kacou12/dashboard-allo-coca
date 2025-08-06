<template>

    <div class=" p-4 bg-white rounded-lg shadow  ">
        <div class="flex justify-between items-center mb-4 mr-4">
            <h3 class="text-sm  font-medium text-[#666666]">{{ title }}</h3>

        </div>

        <section class="flex items-center justify-between">

            <div class="my-5 flex items-center gap-1">
                <p class="text-[32px] font-bold font-merriweathersans">{{ isMoney ? formatPrice(total) : total }}
                </p>
                <span class="text-[20px] font-bold font-merriweathersans mt-1" v-if="!isMoney">trs</span>
            </div>
            <CommonBadge v-if="currentPercentage != 0" :type="isUp ? 'up' : 'down'"
                :value="currentPercentage.toFixed(2)"></CommonBadge>
        </section>

        <!-- Barre de progression -->
        <div class="h-2 w-full flex  overflow-hidden space-x-1">
            <!-- <div v-for="(item, index) in items" :key="index" :style="{
                width: `${calculatePercentage(item.subscriptionCount)}%`,
                backgroundColor: item.color
            }" class="transition-all duration-300 rounded-[2px]"></div> -->

            <TooltipProvider>
                <Tooltip v-for="(item, index) in items" :key="index">
                    <TooltipTrigger as-child>
                        <div :style="{
                            width: `${calculatePercentage(item.subscriptionCount)}%`,
                            backgroundColor: item.color
                        }" class="transition-all duration-300 rounded-[2px] cursor-pointer"></div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <div>
                            <div class="p-4 ">
                                <div class="flex items-center mb-2">
                                    <div class="w-2 h-2 mr-2 bg-orange-500 rounded-full"></div>
                                    <h3 class="text-lg font-semibold text-gray-800">Approvisionnement</h3>
                                </div>
                                <p class="text-gray-600">
                                    {{ formattedCurrent }} F CFA / {{ formattedTotal }} F CFA
                                </p>
                                <p class="text-gray-500">
                                    soit {{ percentage }}%
                                </p>
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>



        </div>

        <!-- Légende -->
        <div class="mt-4 flex flex-wrap gap-4">
            <div v-for="(item, index) in items" :key="index" class="flex items-center">
                <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: item.color }" />
                <span class="text-xs  text-[#1A1A1A]">
                    {{ item.subscriptionType }} ({{ item.subscriptionCount }})
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { MoreVertical } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import statusBarChart from '@/components/common/statusBarChart.vue';
import commonBadge from '@/components/common/commonBadge.vue';
import type { LocalPurChasingCardType } from '@/interfaces/giftCard.interface';
import { formatPrice } from '@/myUtils';
import CommonBadge from '@/components/common/commonBadge.vue';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface Props {
    title: string
    items: LocalPurChasingCardType[],
    isMoney?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Carte la plus vendue',
    items: () => [],
    isMoney: false
})

const total = computed(() => {
    return props.items.reduce((sum, item) => sum + item.subscriptionCount, 0)
})

const calculatePercentage = (value: number): number => {
    if (total.value === 0) return 0
    return (value / total.value) * 100
}


const currentPercentage = computed(() => {
    // percentage of difference
    // if (data.total == 0 && data.previous_period_stats?.total == 0) {
    //     return 0;
    // }
    // else if (data.current_period_stats?.total == 0 && data.previous_period_stats?.total != 0) {
    //     return 0;
    // }

    // else if (data.previous_period_stats?.total == 0 && data.total != 0) {
    //     return 100
    // }

    // return (Math.abs(data.total - data.previous_period_stats!.total) * 100) / data.previous_period_stats!.total;

    return 5;
})

const isUp = computed(() => {
    // return data.total - data.previous_period_stats!.total > 0 ? true : false;
    return true;

})



// const total = 24000000;
const current = 14000000;

const percentage = computed(() => {
    return Math.round((current / total.value) * 100);
});

const formattedCurrent = computed(() => {
    return new Intl.NumberFormat('fr-FR').format(current);
});

const formattedTotal = computed(() => {
    return new Intl.NumberFormat('fr-FR').format(total.value);
});

</script>

<style scoped>
.card {
    width: 300px;
}
</style>