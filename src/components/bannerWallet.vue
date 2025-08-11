<template>
    <section class="flex items-center justify-end mb-5">


    </section>
    <section
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:justify-between items-start">

        <!-- Header avec boutons d'action -->
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center space-x-3">
                <!-- Icon du portefeuille -->
                <div class="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Wallet class="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                </div>
                <div>
                    <p class="text-sm text-gray-600 mb-1">Solde disponible</p>
                    <p class="text-lg md:text-3xl font-bold text-gray-900">{{ formattedBalance }}</p>
                </div>
            </div>

        </div>

        <div class="flex flex-col items-center space-y-3 md:space-y-0 md:flex-row md:space-x-3  w-full md:w-fit">
            <!-- Bouton Ajouter des fonds -->
            <Button v-if="showActionButtons" @click="$router.push({ name: AppRoute.SUPPLY.name })"
                class="flex items-center px-4 rounded-lg w-full md:w-fit">
                <Plus class="w-4 h-4 mr-2" />
                <p class="text-wrap">Approvisionner</p>
            </Button>

            <TransactionTransfertStepperModal v-if="showActionButtons"></TransactionTransfertStepperModal>

        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Wallet, Plus, Send } from 'lucide-vue-next'
import TransactionTransfertStepperModal from './transactions-transfert-stepper/transactionTransfertStepperModal.vue';
import { AppRoute } from '@/constants/app-route';
import Button from './ui/button/Button.vue';

interface Props {
    balance?: number
    showActionButtons?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    balance: 0,
    showActionButtons: false

})

const emit = defineEmits<{
    addFunds: []
    sendPayment: [],

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