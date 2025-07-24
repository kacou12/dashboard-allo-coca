<template>

    <div class=" p-4 bg-white rounded-lg shadow  ">
        <div class="flex justify-between items-center mb-4 mr-4">
            <h3 class="text-sm lg:text-lg font-medium text-gray-900">{{ title }}</h3>
            <!-- <button class="text-gray-400 hover:text-gray-600">
                <span class="sr-only">Options</span>
                <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.66667 1.25C2.17293 1.25 2.58333 1.66041 2.58333 2.16667C2.58333 2.67293 2.17293 3.08333 1.66667 3.08333C1.16041 3.08333 0.75 2.67293 0.75 2.16667C0.75 1.66041 1.16041 1.25 1.66667 1.25Z"
                        fill="#999999" stroke="#999999" stroke-width="1.5" />
                    <path
                        d="M3.33333 8C3.33333 7.07952 2.58714 6.33333 1.66667 6.33333C0.746192 6.33333 0 7.07952 0 8C0 8.92047 0.746192 9.66666 1.66667 9.66666C2.58714 9.66666 3.33333 8.92047 3.33333 8Z"
                        fill="#999999" />
                    <path
                        d="M3.33333 13.8333C3.33333 12.9129 2.58714 12.1667 1.66667 12.1667C0.746192 12.1667 0 12.9129 0 13.8333C0 14.7538 0.746192 15.5 1.66667 15.5C2.58714 15.5 3.33333 14.7538 3.33333 13.8333Z"
                        fill="#999999" />
                </svg>

            </button> -->
        </div>

        <!-- Barre de progression -->
        <div class="h-2 w-full flex  overflow-hidden space-x-1">
            <div v-for="(item, index) in items" :key="index" :style="{
                width: `${calculatePercentage(item.subscriptionCount)}%`,
                backgroundColor: item.color
            }" class="transition-all duration-300 rounded-[2px]" />
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


interface Props {
    title: string
    items: LocalPurChasingCardType[]
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Carte la plus vendue',
    items: () => []
})

const total = computed(() => {
    return props.items.reduce((sum, item) => sum + item.subscriptionCount, 0)
})

const calculatePercentage = (value: number): number => {
    if (total.value === 0) return 0
    return (value / total.value) * 100
}



</script>

<style scoped>
.card {
    width: 300px;
}
</style>