<template>
    <span v-if="operationLog.status === 0"
        class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Non
        resolu</span>
    <span v-if="operationLog.status === 1"
        class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">resolu</span>
</template>

<script setup lang="ts">
import type { OperationLogResponse } from '@/services/operation-logs/operation-log-type';
import type { PropType } from 'vue';

defineProps({
    operationLog: {
        type: Object as PropType<OperationLogResponse>,
        required: true,

    }
})

</script>

<style scoped></style>