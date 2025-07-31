<template>
    <div class="flex gap-2  justify-between items-center ">

        <div class="flex items-center  gap-2 font-worksans cursor-pointer w-full ">

            <!-- <img class="w-[32px] h-[32px] rounded-full" :src="defaultImage" alt="User" @error="setAltImg" /> -->
            <img class="w-[32px] h-[32px]" v-if="beneficiary.network === 'Orange'" src="@/assets/images/logos/moov.png"
                alt="">
            <img class="w-[32px] h-[32px]" v-else-if="beneficiary.network === 'Moov'"
                src="@/assets/images/logos/moov.png" alt="">
            <img class="w-[32px] h-[32px]" v-else-if="beneficiary.network === 'MTN'" src="@/assets/images/logos/mtn.png"
                alt="">
            <img class="w-[32px] h-[32px]" v-else-if="beneficiary.network === 'Wave'"
                src="@/assets/images/logos/wave.png" alt="">

            <section class="flex flex-col gap-1 w-full ">
                <p class="text-sm text-neutral-10 font-medium line-clamp-1">{{ beneficiary.first_name }} {{
                    beneficiary.last_name
                }}</p>
                <div
                    class="flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:flex-wrap gap-2 w-[90%]">
                    <p class="text-sm text-neutral-20 "> {{ formatPhoneNumber(beneficiary.phone) }}</p>

                </div>
            </section>


        </div>

        <CommonClipBoard :data-to-copy="beneficiary.id ?? 'erreur back-end'"></CommonClipBoard>

    </div>
</template>

<script setup lang="ts">
import CommonClipBoard from '@/components/common/commonClipBoard.vue';
import { formatPhoneNumber } from '@/myUtils';
import type { BeneficiaryResponse } from '@/services/beneficiaries/beneficiary-type';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';

const { beneficiary } = defineProps({
    beneficiary: {
        type: Object as PropType<BeneficiaryResponse>,
        required: true
    }

})

// const defaultImage = new URL(`/src/assets/images/avatar/${transaction.user.avatar.split(".")[0]}.png`, import.meta.url).href;

const router = useRouter();

const setAltImg = (event: any) => {
    event.target.src = new URL(`/src/assets/images/default_user.png`, import.meta.url).href
}



</script>

<style scoped></style>