<template>
    <div class="flex items-center">
        <span :class="statusClasses" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
            <div :class="dotClasses" class="w-1.5 h-1.5 rounded-full mr-1.5"></div>
            {{ statusText }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InvoiceTransactionResponse } from '@/services/invoice-transaction/invoice-transaction-type'

interface Props {
    invoiceTransaction: InvoiceTransactionResponse
}

const props = defineProps<Props>()

const statusConfig = computed(() => {
    switch (props.invoiceTransaction.status) {
        case 'PENDING':
            return {
                text: 'En attente',
                classes: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
                dotClasses: 'bg-yellow-600'
            }
        case 'PROCESSING':
            return {
                text: 'En cours',
                classes: 'bg-blue-100 text-blue-800 border border-blue-200',
                dotClasses: 'bg-blue-600'
            }
        case 'PAID':
            return {
                text: 'Payée',
                classes: 'bg-green-100 text-green-800 border border-green-200',
                dotClasses: 'bg-green-600'
            }
        case 'FAILED':
            return {
                text: 'Échouée',
                classes: 'bg-red-100 text-red-800 border border-red-200',
                dotClasses: 'bg-red-600'
            }
        case 'OVERDUE':
            return {
                text: 'En retard',
                classes: 'bg-orange-100 text-orange-800 border border-orange-200',
                dotClasses: 'bg-orange-600'
            }
        case 'CANCELLED':
            return {
                text: 'Annulée',
                classes: 'bg-gray-100 text-gray-800 border border-gray-200',
                dotClasses: 'bg-gray-600'
            }
        default:
            return {
                text: props.invoiceTransaction.status,
                classes: 'bg-gray-100 text-gray-800 border border-gray-200',
                dotClasses: 'bg-gray-600'
            }
    }
})

const statusText = computed(() => statusConfig.value.text)
const statusClasses = computed(() => statusConfig.value.classes)
const dotClasses = computed(() => statusConfig.value.dotClasses)
</script>