<template>
    <div class="flex items-center gap-3">
        <div class="flex-shrink-0">
            <img :src="serviceInfo.image_url" :alt="serviceInfo.name" class="w-8 h-8 rounded-md object-contain"
                :style="{ backgroundColor: serviceInfo.color + '20' }" />
        </div>
        <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-900">
                {{ serviceInfo.name }}
            </span>
            <span class="text-xs text-gray-500">
                {{ invoiceTransaction.service }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InvoiceTransactionResponse } from '@/services/invoice-transaction/invoice-transaction-type'
import { InvoiceServiceEnum } from '@/services/invoice-transaction/invoice-transaction-constants'

interface Props {
    invoiceTransaction: InvoiceTransactionResponse
}

const props = defineProps<Props>()

const serviceInfo = computed(() => {
    switch (props.invoiceTransaction.service) {
        case 'CIE':
            return InvoiceServiceEnum.CIE
        case 'SODECI':
            return InvoiceServiceEnum.SODECI
        case 'Canal+':
            return InvoiceServiceEnum.CANAL_PLUS
        default:
            return {
                name: props.invoiceTransaction.service,
                image_url: '/default-service.png',
                color: '#6B7280'
            }
    }
})
</script>