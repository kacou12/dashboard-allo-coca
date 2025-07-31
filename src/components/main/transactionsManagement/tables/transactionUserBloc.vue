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