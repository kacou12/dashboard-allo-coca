<template>
    <div class="bg-white p-4 rounded-xl shadow border border-neutral-70
     flex gap-4 w-full">
        <section>


            <img width="48" height="48" :src="serviceAvailability.provider!.image_url" alt=""
                class="bg-cover rounded-lg">
            <!-- <img width="48" height="48" src="@/assets/images/logos/moov.png" alt=""> -->
            <!-- <img width="48" height="48" v-else-if="network === 'mtn'" src="@/assets/images/logos/mtn.png" alt="">
            <img width="48" height="48" v-else-if="network === 'wave'" src="@/assets/images/logos/wave.png" alt="">
            <img width="48" height="48" v-else-if="network === 'Giftcard'" src="@/assets/images/logos/gift.png" alt=""> -->
        </section>

        <div class="space-y-3">

            <section>
                <div class="flex gap-2 ">
                    <!-- icon zctive or inactive -->
                    <div class="w-2 h-2 mt-1 rounded-full bg-success-500"></div>

                    <div class=" ">
                        <p class="text-xs  text-neutral-20 font-normal">Prélèvement</p>
                        <p class="text-sm text-neutral-10 font-semibold">{{ serviceAvailability.cashout_issuer?.name ??
                            "non defini" }}</p>
                    </div>
                </div>
            </section>

            <section>
                <div class="flex gap-2">
                    <!-- icon zctive or inactive -->
                    <div class="w-2 h-2 mt-1  rounded-full bg-success-500"></div>

                    <div class="">
                        <p class="text-xs text-neutral-20 font-normal">Dépot</p>
                        <p class="text-sm text-neutral-10 font-semibold">{{ serviceAvailability.cashin_issuer?.name ??
                            "non defini" }}</p>
                    </div>
                </div>
            </section>

        </div>


    </div>
</template>

<script setup lang="ts">
import type { ServiceAvailabilityResponse } from '@/services/providers/provider-type';
import type { PropType } from 'vue';


const { serviceAvailability } = defineProps({
    serviceAvailability: {
        type: Object as PropType<ServiceAvailabilityResponse>,
        required: true
    }
})

</script>

<style scoped></style>