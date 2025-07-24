<template>
    <FadeSlideAnimation>
        <div v-if="isLoadingData" class=" rounded-xl shadow 0 font-worksans">
            <div class="animate-pulse bg-gray-200 h-[116px] rounded-xl"></div>

        </div>

        <div v-else class="bg-white p-4 rounded-lg shadow border border-neutral-70 flex flex-col justify-between gap-3">
            <section class="flex justify-between items-end">
                <h2 class="text-sm xl:text-base font-medium text-black">{{ title }}</h2>
                <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                    <span class="sr-only">Open menu</span>
                    <!-- <MoreVertical class="w-4 h-4" /> -->
                </Button>
            </section>

            <section class="flex justify-between  items-center">

                <div class="">
                    <span class="text-2xl lg:text-3xl font-bold font-merriweather">{{ count }}</span>
                </div>

                <CommonBadge v-if="currentPercentage != 0" :type="isUp ? 'up' : 'down'"
                    :value="currentPercentage.toFixed(2).toString()">
                </CommonBadge>


            </section>


        </div>
    </FadeSlideAnimation>



</template>

<script setup lang="ts">

import { Button } from '@/components/ui/button'; /* PartiallyEnd: #3632/scriptSetup.vue */
import { MoreVertical } from 'lucide-vue-next';
import CommonBadge from '@/components/common/commonBadge.vue';
import { computed } from 'vue';

import { storeToRefs } from 'pinia';
import { useLoaderStore } from '@/stores/useLoaderStore';
import FadeSlideAnimation from '@/components/animations/fadeSlideAnimation.vue';


const { isLoading, isLoadingSkeleton } = storeToRefs(useLoaderStore());

const isLoadingData = computed(() => {
    return isLoading.value || isLoadingSkeleton.value
})

const { count, preview_count } = defineProps({
    title: {
        type: String,
        required: false
    },
    count: {
        type: Number,
        required: false
    },
    preview_count: {
        type: Number,
        required: false
    }
    // subTitle: {
    //     type: String,
    //     required: true
    // },
    // percentage: {
    //     type: Number,
    //     required: true
    // }
})


const currentPercentage = computed(() => {
    if (!count || !preview_count) {
        return 0;
    }

    // percentage of difference

    if (count == 0 && preview_count == 0) {
        return 0;
    }
    else if (count == 0 && preview_count != 0) {
        return 0;
    }

    else if (preview_count == 0 && count != 0) {
        return 100
    }

    return (Math.abs(count - preview_count) * 100) / preview_count;

})

const isUp = computed(() => {
    if (!count || !preview_count) {
        return false;
    }
    return count - preview_count > 0 ? true : false;
})



</script>

<style scoped>
.card {
    width: 300px;
}
</style>