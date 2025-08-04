<template>
    <div class="flex items-center gap-2">
        <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
        </div>
        <div class="flex flex-col min-w-0">
            <span class="text-sm font-medium text-gray-900 truncate">
                {{ invoiceTransaction.invoiceNumber }}
            </span>
            <span class="text-xs text-gray-500">
                Facture {{ servicePrefix }}
            </span>
        </div>
        <button @click="copyToClipboard" class="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copier le numéro">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InvoiceTransactionResponse } from '@/services/invoice-transaction/invoice-transaction-type'

interface Props {
    invoiceTransaction: InvoiceTransactionResponse
}

const props = defineProps<Props>()

const servicePrefix = computed(() => {
    switch (props.invoiceTransaction.service) {
        case 'CIE':
            return 'Électricité'
        case 'SODECI':
            return 'Eau'
        case 'Canal+':
            return 'TV'
        default:
            return props.invoiceTransaction.service
    }
})

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(props.invoiceTransaction.invoiceNumber)
        // Vous pouvez ajouter une notification toast ici
        console.log('Numéro de facture copié !')
    } catch (err) {
        console.error('Erreur lors de la copie:', err)
    }
}
</script>