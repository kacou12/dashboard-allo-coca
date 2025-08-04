<template>

    <CommonModal v-model:open="open" backgroudColor="bg-neutral-80" :showDivider="false">
        <template #trigger>
            <div class="p-1 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 13.1337C9.37906 13.1337 8.77206 12.9496 8.25577 12.6046C7.73947 12.2596 7.33707 11.7693 7.09945 11.1956C6.86182 10.622 6.79965 9.9907 6.92079 9.38169C7.04193 8.77268 7.34094 8.21327 7.78001 7.7742C8.21909 7.33513 8.7785 7.03612 9.38751 6.91498C9.99652 6.79384 10.6278 6.85601 11.2014 7.09363C11.7751 7.33126 12.2655 7.73366 12.6104 8.24995C12.9554 8.76625 13.1395 9.37324 13.1395 9.99419C13.1372 10.8261 12.8057 11.6234 12.2174 12.2116C11.6292 12.7999 10.8319 13.1314 10 13.1337ZM10 8.16279C9.63778 8.16279 9.2837 8.2702 8.98253 8.47144C8.68136 8.67267 8.44662 8.9587 8.30801 9.29334C8.1694 9.62799 8.13313 9.99622 8.20379 10.3515C8.27446 10.7067 8.44888 11.0331 8.70501 11.2892C8.96113 11.5453 9.28746 11.7197 9.64271 11.7904C9.99797 11.8611 10.3662 11.8248 10.7008 11.6862C11.0355 11.5476 11.3215 11.3128 11.5227 11.0117C11.724 10.7105 11.8314 10.3564 11.8314 9.99419C11.8314 9.50847 11.6384 9.04265 11.295 8.69919C10.9515 8.35574 10.4857 8.16279 10 8.16279ZM10 18.1134C7.63675 18.0051 5.38923 17.0591 3.65988 15.4448C1.75872 13.7791 0.625 11.7384 0.625 9.99419C0.625 6.12209 5.53488 1.875 10 1.875C14.4651 1.875 19.375 6.23546 19.375 9.99419C19.375 13.936 14.5523 18.1134 10 18.1134ZM10 3.18314C6.31105 3.18314 1.93314 6.87209 1.93314 9.99419C1.93314 11.3547 2.92733 13.064 4.54942 14.4593C6.03824 15.8512 7.96564 16.6808 10 16.8052C14.1512 16.8052 18.0669 12.968 18.0669 9.99419C18.0669 7.17733 13.8983 3.18314 10 3.18314Z"
                        fill="#666666" />
                </svg>
            </div>

        </template>

        <template #title>
            <h2>detail paiement de facture </h2>
        </template>
        <template #content class=" ">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">Détails de la facture</h3>
                        <p class="text-sm text-gray-500">{{ invoiceTransaction.invoiceNumber }}</p>
                    </div>
                </div>
                <button @click="" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Content -->
            <div class="space-y-6">
                <!-- Service Info -->
                <div class="bg-gray-50 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-gray-900 mb-3">Informations du service</h4>
                    <div class="flex items-center gap-3">
                        <img :src="serviceInfo.image_url" :alt="serviceInfo.name"
                            class="w-12 h-12 rounded-lg object-contain"
                            :style="{ backgroundColor: serviceInfo.color + '20' }" />
                        <div>
                            <p class="font-medium text-gray-900">{{ serviceInfo.name }}</p>
                            <p class="text-sm text-gray-500">{{ invoiceTransaction.service }}</p>
                        </div>
                    </div>
                </div>

                <!-- Invoice Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-4">
                        <div>
                            <label class="text-sm font-medium text-gray-500">Numéro de facture</label>
                            <p class="text-sm text-gray-900 font-mono">{{ invoiceTransaction.invoiceNumber }}</p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">Montant</label>
                            <p class="text-lg font-semibold text-gray-900">{{ formattedAmount }}</p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">Statut</label>
                            <div class="mt-1">
                                <InvoiceStatusBloc :invoiceTransaction="invoiceTransaction" />
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="text-sm font-medium text-gray-500">Date d'échéance</label>
                            <p class="text-sm text-gray-900">{{ formattedDueDate }}</p>
                        </div>
                        <div v-if="invoiceTransaction.paymentDate">
                            <label class="text-sm font-medium text-gray-500">Date de paiement</label>
                            <p class="text-sm text-gray-900">{{ formattedPaymentDate }}</p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">Devise</label>
                            <p class="text-sm text-gray-900">{{ invoiceTransaction.currency }}</p>
                        </div>
                    </div>
                </div>

                <!-- Actions -->

            </div>
        </template>

        <template #footer>
            <div class="  py-3 w-full rounded-b-xl">
                <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                    <button @click=""
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        Fermer
                    </button>

                    <button v-if="canPay" @click="handlePayInvoice" :disabled="isProcessing"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isProcessing">Traitement...</span>
                        <span v-else>Payer la facture</span>
                    </button>

                    <button @click="downloadInvoice"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Télécharger
                    </button>
                </div>
            </div>

        </template>

    </CommonModal>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InvoiceTransactionResponse } from '@/services/invoice-transaction/invoice-transaction-type'
import { InvoiceServiceEnum } from '@/services/invoice-transaction/invoice-transaction-constants'
import CommonModal from '@/components/common/commonModal.vue'
import InvoiceStatusBloc from './InvoiceStatusBloc.vue'

interface Props {
    invoiceTransaction: InvoiceTransactionResponse
}
const open = ref(false);
const props = defineProps<Props>()


const isProcessing = ref(false)


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

const formattedAmount = computed(() => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
    }).format(props.invoiceTransaction.amount)
})

const formattedDueDate = computed(() => {
    return new Date(props.invoiceTransaction.dueDate).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
})

const formattedPaymentDate = computed(() => {
    if (!props.invoiceTransaction.paymentDate) return ''
    return new Date(props.invoiceTransaction.paymentDate).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
})

const canPay = computed(() => {
    return ['PENDING', 'FAILED', 'OVERDUE'].includes(props.invoiceTransaction.status)
})

const handlePayInvoice = async () => {
    // if (!canPay.value) return

    // isProcessing.value = true
    // try {
    //     await payInvoiceMutation.mutateAsync({
    //         invoiceId: props.invoiceTransaction.id,
    //         paymentData: {
    //             amount: props.invoiceTransaction.amount,
    //             service: props.invoiceTransaction.service,
    //             invoiceNumber: props.invoiceTransaction.invoiceNumber
    //         }
    //     })

    //     // Afficher une notification de succès
    //     console.log('Facture payée avec succès!')
    //     closeModal()
    // } catch (error) {
    //     console.error('Erreur lors du paiement:', error)
    // } finally {
    //     isProcessing.value = false
    // }
}

const downloadInvoice = () => {
    // Logique pour télécharger la facture
    console.log('Téléchargement de la facture:', props.invoiceTransaction.invoiceNumber)
}
</script>