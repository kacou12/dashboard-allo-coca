<template>
    <section class="flex items-center justify-end mb-5">

        <div class="flex space-x-3">
            <!-- Bouton Ajouter des fonds -->
            <button @click="handleAddFunds"
                class="flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus class="w-4 h-4 mr-2" />
                Ajouter des fonds à votre portefeuille
            </button>

            <!-- Bouton Envoyer un paiement -->
            <!-- <button @click="handleSendPayment"
                class="flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
                <Send class="w-4 h-4 mr-2" />
                Transfert unique
            </button> -->
            <TransactionTransfertStepperModal></TransactionTransfertStepperModal>

        </div>
    </section>
    <section class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <!-- Header avec boutons d'action -->
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center space-x-3">
                <!-- Icon du portefeuille -->
                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Wallet class="w-5 h-5 text-orange-600" />
                </div>
                <div>
                    <p class="text-sm text-gray-600 mb-1">Solde disponible</p>
                    <p class="text-3xl font-bold text-gray-900">{{ formattedBalance }}</p>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Wallet, Plus, Send } from 'lucide-vue-next'
import TransactionTransfertStepperModal from './transactions-transfert-stepper/transactionTransfertStepperModal.vue';

interface Props {
    balance?: number
}

const props = withDefaults(defineProps<Props>(), {
    balance: 0
})

const emit = defineEmits<{
    addFunds: []
    sendPayment: []
}>()

// Formatage du solde avec séparateurs de milliers
const formattedBalance = computed(() => {
    return `${props.balance.toLocaleString()} XOF`
})

const handleAddFunds = () => {
    emit('addFunds')
}

const handleSendPayment = () => {
    emit('sendPayment')
}
</script>