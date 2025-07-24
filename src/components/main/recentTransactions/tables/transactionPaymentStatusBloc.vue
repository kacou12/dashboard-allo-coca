<template>
    <div class='flex justify-left w-fit  
      border-neutral-80 border-[1px] text-center py-1 px-1 rounded-sm items-center'>
        <section class="flex gap-2 items-center">
            <span class="relative flex size-3" v-if="transaction.payment_status.toLowerCase().includes('fail')">
                <span
                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-error-dark opacity-75"></span>
                <span class="relative inline-flex size-3 rounded-full bg-error-dark"></span>
            </span>
            <span v-else-if="transaction.payment_status.toLowerCase().includes('succ')"
                class=" inline-flex size-3 rounded-full bg-success-500"></span>
            <span> {{ transaction.payment_status }} </span>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { TransactionResponse } from '@/services/transactions/transaction-type';
import type { PropType } from 'vue';


defineProps({
    transaction: {
        type: Object as PropType<TransactionResponse>,
        required: true
    }
})

</script>

<style scoped></style>