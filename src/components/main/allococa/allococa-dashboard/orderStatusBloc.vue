<template>
    <div>
        <!-- background-color':${getTransactionStatusData} -->
        <span
            :style="{ backgroundColor: getTransactionStatusData(orderStatusConfigEnumData)?.color, color: getTransactionStatusData(orderStatusConfigEnumData)?.textColor }"
            class="text-xs text-center font-medium px-2 py-[1px] rounded-2xl ">
            {{ getTransactionStatusData(orderStatusConfigEnumData)?.name }}</span>
    </div>
</template>

<script setup lang="ts">
import type { DashboardOrderResponse } from '@/services/allococa/dashboard/dashboard-alpha-type';
import { orderStatusConfigEnumData, type OrderResponse } from '@/services/allococa/orders/order-type';
import type { StatusConfigEnum } from '@/services/global.type';
import type { PropType } from 'vue';

const getTransactionStatusData = (dataConfigEnums: StatusConfigEnum[]) => {
    for (let index = 0; index < dataConfigEnums.length; index++) {
        const itemEnum = dataConfigEnums[index];
        if (orderTransaction.status.toLowerCase() === itemEnum.value.toLowerCase()) {
            return itemEnum;
        }

    }
}

const { orderTransaction } = defineProps({
    orderTransaction: {
        type: Object as PropType<OrderResponse | DashboardOrderResponse>,
        required: true
    }
})

</script>

<style scoped></style>