<template>
    <div>
        <!-- background-color':${getTransactionStatusData} -->
        <span
            :style="{ backgroundColor: getTransactionStatusData()!.color, color: getTransactionStatusData()!.textColor }"
            class="text-xs text-center font-medium px-2 py-[1px] rounded-2xl ">
            {{ getTransactionStatusData()!.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { TransactionStatusEnum } from '@/interfaces/datatable.interface';
import type { TransactionResponse } from '@/services/transactions/transaction-type';
import type { PropType } from 'vue';

const getTransactionStatusData: () => { value: string; name: string; color: string; textColor: string; } | undefined = () => {
    for (const [key, value] of Object.entries(TransactionStatusEnum)) {
        if (transaction.status.toLowerCase() === value.value.toLowerCase()) {
            return value;
        }
    }
}

const { transaction } = defineProps({
    transaction: {
        type: Object as PropType<TransactionResponse>,
        required: true
    }
})

</script>

<style scoped></style>