<template>
    <div class="flex items-center gap-2">
        <div class="flex-shrink-0">
            <div :class="iconContainerClasses" class="w-8 h-8 rounded-md flex items-center justify-center">
                <svg class="w-4 h-4" :class="iconClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        </div>
        <div class="flex flex-col">
            <span :class="dateClasses" class="text-sm font-medium">
                {{ formattedDate }}
            </span>
            <span :class="statusTextClasses" class="text-xs">
                {{ statusText }}
            </span>
        </div>
        <div v-if="isOverdue" class="flex-shrink-0">
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
                {{ overdueDays }} j
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InvoiceTransactionResponse } from '@/services/invoice-transaction/invoice-transaction-type'

interface Props {
    invoiceTransaction: InvoiceTransactionResponse
}

const props = defineProps<Props>()

const dueDate = computed(() => new Date(props.invoiceTransaction.dueDate))
const today = computed(() => new Date())

const isOverdue = computed(() => {
    return dueDate.value < today.value && props.invoiceTransaction.status !== 'PAID'
})

const overdueDays = computed(() => {
    if (!isOverdue.value) return 0
    const diffTime = today.value.getTime() - dueDate.value.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

const isDueSoon = computed(() => {
    const diffTime = dueDate.value.getTime() - today.value.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays >= 0 && props.invoiceTransaction.status !== 'PAID'
})

const formattedDate = computed(() => {
    return dueDate.value.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
})

const statusText = computed(() => {
    if (props.invoiceTransaction.status === 'PAID') {
        return 'Payée'
    }
    if (isOverdue.value) {
        return `En retard de ${overdueDays.value} jour${overdueDays.value > 1 ? 's' : ''}`
    }
    if (isDueSoon.value) {
        const diffTime = dueDate.value.getTime() - today.value.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays === 0) return "Échue aujourd'hui"
        return `Échue dans ${diffDays} jour${diffDays > 1 ? 's' : ''}`
    }
    return 'À venir'
})

const iconContainerClasses = computed(() => {
    if (props.invoiceTransaction.status === 'PAID') {
        return 'bg-green-100'
    }
    if (isOverdue.value) {
        return 'bg-red-100'
    }
    if (isDueSoon.value) {
        return 'bg-orange-100'
    }
    return 'bg-gray-100'
})

const iconClasses = computed(() => {
    if (props.invoiceTransaction.status === 'PAID') {
        return 'text-green-600'
    }
    if (isOverdue.value) {
        return 'text-red-600'
    }
    if (isDueSoon.value) {
        return 'text-orange-600'
    }
    return 'text-gray-600'
})

const dateClasses = computed(() => {
    if (props.invoiceTransaction.status === 'PAID') {
        return 'text-green-900'
    }
    if (isOverdue.value) {
        return 'text-red-900'
    }
    if (isDueSoon.value) {
        return 'text-orange-900'
    }
    return 'text-gray-900'
})

const statusTextClasses = computed(() => {
    if (props.invoiceTransaction.status === 'PAID') {
        return 'text-green-600'
    }
    if (isOverdue.value) {
        return 'text-red-600'
    }
    if (isDueSoon.value) {
        return 'text-orange-600'
    }
    return 'text-gray-500'
})
</script>