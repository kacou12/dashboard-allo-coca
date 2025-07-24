<template>

    <FadeSlideAnimation>
        <div v-if="isLoadingData" class=" rounded-xl shadow 0 font-worksans">
            <div class="animate-pulse bg-gray-200 h-[114px] rounded-xl"></div>

        </div>

        <div v-else class=" p-4 bg-white rounded-lg shadow min-h-[114px]">
            <div class="flex justify-between items-center mb-4 mr-4">
                <h3 class="text-sm lg:text-lg font-medium text-gray-900">{{ title }}</h3>

            </div>

            <!-- Barre de progression -->
            <div v-if="hasData" class="h-2 w-full flex  overflow-hidden space-x-1">
                <div v-for="(item, index) in items" :key="index" :style="{
                    width: `${calculatePercentage(item.subscriptionCount)}%`,
                    backgroundColor: item.color
                }" class="transition-all duration-300 rounded-[2px]" />
            </div>

            <!-- Légende -->
            <div v-if="hasData" class="mt-4 flex flex-wrap gap-4">
                <div v-for="(item, index) in items" :key="index" class="flex items-center">
                    <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: item.color }" />
                    <span class="text-xs  text-[#1A1A1A]">
                        {{ item.subscriptionType }} ({{ item.subscriptionCount }})
                    </span>
                </div>
            </div>



            <section v-if="!hasData">
                <div class="my-2 h-[1px] bg-neutral-70 mx-4"></div>
                <p class="text-sm font-medium text-neutral-20 mx-5 text-center">Aucune transaction trouvée</p>
            </section>

        </div>
    </FadeSlideAnimation>

</template>

<script setup lang="ts">
import type { LocalPurChasingCardType } from '@/interfaces/giftCard.interface';
import { computed } from 'vue';

import { storeToRefs } from 'pinia';
import { useLoaderStore } from '@/stores/useLoaderStore';
import FadeSlideAnimation from '@/components/animations/fadeSlideAnimation.vue';


const { isLoading, isLoadingSkeleton } = storeToRefs(useLoaderStore());

const isLoadingData = computed(() => {
    return isLoading.value || isLoadingSkeleton.value
})

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



const hasData = (computed(() => props.items.reduce((sum, item) => sum + item.subscriptionCount, 0) > 0));

const calculatePercentage = (value: number): number => {
    if (total.value === 0) return 0
    return (value / total.value) * 100
}
</script>