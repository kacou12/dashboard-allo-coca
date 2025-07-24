<template>
    <div class="flex gap-2  justify-between items-center ">

        <div class="flex items-center  gap-2 font-worksans cursor-pointer w-full "
            @click="router.push({ name: AppRoute.TRANSACTIONS_HISTORY_USER.name, params: { id: transaction.user.id } })">

            <img class="w-11 h-11 rounded-full" :src="defaultImage" alt="User" @error="setAltImg" />

            <section class="flex flex-col gap-1 w-full ">
                <p class="text-sm text-neutral-10 font-medium line-clamp-1">{{ transaction.user.firstname }} {{
                    transaction.user.lastname
                }}</p>
                <div
                    class="flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:flex-wrap gap-2 w-[90%]">
                    <p class="text-sm text-neutral-20 ">{{ formatPhoneNumber(transaction.user.phone) }}</p>
                    <!-- transaction countries  show-->
                    <div class=" flex gap-1 items-center "
                        v-if="transaction.payer_country_iso_code != transaction.beneficiary_country_iso_code">
                        <img width="16" height="16"
                            :src="`https://flagcdn.com/w20/${transaction.payer_country_iso_code.toLowerCase()}.png`"
                            alt="">

                        <div class="">
                            <!-- success svg -->
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.6665 8H13.3332M13.3332 8L9.33317 12M13.3332 8L9.33317 4" stroke="#4CAF50"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <!-- <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00017 6.66657V6.66723M9.3335 7.9999V8.00057M8.00017 9.33323V9.3339M6.66683 7.9999V8.00057M12.6668 7.9999L8.00017 12.6666C7.69488 12.9781 7.33087 13.226 6.92918 13.396C6.52749 13.5659 6.09609 13.6546 5.65993 13.6568C5.22377 13.659 4.7915 13.5747 4.38811 13.4088C3.98472 13.2429 3.61823 12.9987 3.30981 12.6903C3.00139 12.3818 2.75718 12.0153 2.59128 11.612C2.42538 11.2086 2.3411 10.7763 2.3433 10.3401C2.34551 9.90398 2.43415 9.47258 2.60411 9.07089C2.77408 8.6692 3.02198 8.30519 3.3335 7.9999L8.00017 3.33323C8.62113 2.72469 9.45717 2.38579 10.3266 2.39018C11.196 2.39457 12.0286 2.7419 12.6434 3.35668C13.2582 3.97147 13.6055 4.80404 13.6099 5.67347C13.6143 6.5429 13.2754 7.37893 12.6668 7.9999Z"
                            stroke="#808080" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg> -->

                        </div>

                        <img width="16" height="16"
                            :src="`https://flagcdn.com/w20/${transaction.beneficiary_country_iso_code.toLowerCase()}.png`"
                            alt="">

                    </div>
                </div>
            </section>


        </div>

        <CommonClipBoard :data-to-copy="transaction.user.phone.trim() ?? 'erreur back-end'"></CommonClipBoard>

    </div>
</template>

<script setup lang="ts">
import { AppRoute } from '@/constants/app-route';
import { formatPhoneNumber } from '@/lib/utils';
import { UserCircleIcon } from 'lucide-vue-next'
import type { TransactionResponse } from '@/services/transactions/transaction-type';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import CommonClipBoard from '@/components/common/commonClipBoard.vue';

const { transaction } = defineProps({
    transaction: {
        type: Object as PropType<TransactionResponse>,
        required: true
    }
    // name: {
    //     type: String,
    //     required: false,
    //     default: "Philippe Jeans"
    // },
    // phone: {
    //     type: String,
    //     required: false,
    //     default: "+225 0787995058"
    // },


})

const defaultImage = new URL(`/src/assets/images/avatar/${transaction.user.avatar.split(".")[0]}.png`, import.meta.url).href;

const router = useRouter();

const setAltImg = (event: any) => {
    event.target.src = new URL(`/src/assets/images/default_user.png`, import.meta.url).href
}



</script>

<style scoped></style>