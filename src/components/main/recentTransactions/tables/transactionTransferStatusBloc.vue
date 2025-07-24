<template>
    <div class='flex justify-left w-fit  
      border-neutral-80 border-[1px] text-center py-1 px-1 rounded-sm items-center'>
        <!-- <span class='flex w-[6px] h-[6px] me-1 bg-red-500 rounded-full'></span> -->
        <span> {{ transaction.transfer_status }} </span>
    </div>
</template>

<script setup lang="ts">
import type { GiftCardTransactionResponse } from '@/services/giftcard/giftcard-type';
import type { TransactionResponse } from '@/services/transactions/transaction-type';
import type { PropType } from 'vue';


defineProps({
    transaction: {
        type: Object as PropType<TransactionResponse | GiftCardTransactionResponse>,
        required: true
    }
})

</script>

<style scoped></style>