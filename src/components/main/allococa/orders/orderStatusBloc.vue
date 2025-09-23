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
import type { DashboardOrderResponse } from '@/services/allococa/dashboard/dashboard-alpha-type';
import { OrderStatusConfigEnum, type OrderResponse } from '@/services/allococa/orders/order-type';
import type { PropType } from 'vue';

const getTransactionStatusData: () => { value: string; name: string; color: string; textColor: string; } | undefined = () => {
    for (const [key, value] of Object.entries(OrderStatusConfigEnum)) {
        if (orderTransaction.status.toLowerCase() === value.value.toLowerCase()) {
            return value;
        }
    }
}

const { orderTransaction } = defineProps({
    orderTransaction: {
        type: Object as PropType<OrderResponse>,
        required: true
    }
})

</script>

<style scoped></style>