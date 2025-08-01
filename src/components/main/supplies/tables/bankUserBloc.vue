<template>
    <div class="flex gap-2  justify-between items-center ">

        <div class="flex items-center  gap-2 font-worksans cursor-pointer w-full">

            <img class=" w-11 h-11 rounded-full" :src="supplyTransaction.sender.avatar_url" alt="User"
                @error="setAltImg" />

            <section class="flex flex-col gap-1 w-full ">
                <p class="text-sm text-neutral-10 font-medium line-clamp-1"> {{
                    supplyTransaction.sender.name
                }}</p>
                <div
                    class="flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:flex-wrap gap-2 w-[90%]">
                    <p class="text-sm text-neutral-20 ">IID: {{ supplyTransaction.sender.id }}</p>

                </div>
            </section>


        </div>

        <CommonClipBoard :data-to-copy="supplyTransaction.sender.id ?? 'erreur back-end'"></CommonClipBoard>

    </div>
</template>

<script setup lang="ts">
import CommonClipBoard from '@/components/common/commonClipBoard.vue';
import type { SupplyTransactionResponse } from '@/services/supply-transactions/supply-transaction-type';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';

const { supplyTransaction } = defineProps({
    supplyTransaction: {
        type: Object as PropType<SupplyTransactionResponse>,
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