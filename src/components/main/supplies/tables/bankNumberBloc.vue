<template>
    <div class="flex items-center gap-2">
        <!-- :src="supplyTransaction.beneficiary_bank.image_url ?? 'https://placehold.co/50x50'" -->
        <img class="w-[32px] h-[32px] rounded-sm" src="@/assets/images/banks/ecobank.png" alt="">
        <span class="text-sm text-neutral-20 ">{{ supplyTransaction.beneficiary_bank.accountNumberMasked }}</span>


        <CommonClipBoard :data-to-copy="supplyTransaction.beneficiary_bank.accountNumberMasked ?? 'erreur back-end'">
        </CommonClipBoard>

    </div>
</template>

<script setup lang="ts">
import CommonClipBoard from '@/components/common/commonClipBoard.vue';
import type { SupplyTransactionResponse } from '@/services/supply-transactions/supply-transaction-type';
import { type PropType } from 'vue';

const { supplyTransaction } = defineProps({
    supplyTransaction: {
        type: Object as PropType<SupplyTransactionResponse>,
        required: true
    }
})



</script>

<style scoped></style>