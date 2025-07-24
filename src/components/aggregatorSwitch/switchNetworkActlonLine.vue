<template>
    <article class="flex justify-between items-center">
        <div class="flex justify-between items-center gap-2">
            <div>
                <img class="w-[32px] h-[32px]" :src="serviceAvailability.provider!.image_url" alt="">
                <!-- <img class="w-[32px] h-[32px]" v-else-if="network === 'moov'" src="@/assets/images/logos/moov.png"
                    alt="">
                <img class="w-[32px] h-[32px]" v-else-if="network === 'mtn'" src="@/assets/images/logos/mtn.png" alt="">
                <img class="w-[32px] h-[32px]" v-else-if="network === 'wave'" src="@/assets/images/logos/wave.png"
                    alt="">
                <img class="w-[32px] h-[32px]" v-else-if="network === 'Giftcard'" src="@/assets/images/logos/gift.png"
                    alt=""> -->
            </div>
            <p class="font-medium xs:text-xs text-sm">{{ serviceAvailability.provider!.name }}</p>
        </div>

        <!-- <CommonSwitch></CommonSwitch> -->
        <CommonBigSwitch v-model="isActive"></CommonBigSwitch>

    </article>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import CommonSwitch from '../common/commonSwitch.vue';
import CommonBigSwitch from '../common/commonBigSwitch.vue';
import type { ServiceAvailabilityResponse } from '@/services/providers/provider-type';

const isActive = defineModel({ type: Boolean, required: true });

defineProps({

    serviceAvailability: {
        type: Object as PropType<ServiceAvailabilityResponse>,
        required: true
    }

})

</script>

<style scoped></style>