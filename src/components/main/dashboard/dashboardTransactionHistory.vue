<template>
    <div class=" max-w-[712px] h-full">
        <!-- day section -->
        <section v-if="transactions.length > 0" class="space-y-2 py-3 divide-y divide-neutral-80"
            v-for="transaction in transactions">

            <div class="space-y-4">
                <article class="flex justify-between ">
                </article>
            </div>
        </section>
        <section v-else class="h-full flex items-center justify-center">
            <p class="text-sm font-normal text-neutral-40">Aucune transaction</p>
        </section>

    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import type { TransactionResponse } from '@/services/transactions/transaction-type';
const { transactions } = defineProps({
    transactions: {
        type: Array as PropType<TransactionResponse[]>,
        required: true,
        // default: () => usertransactionsData
    }
});


</script>

<style scoped></style>