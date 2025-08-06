<template>
    <div class="space-y-4 bg-[#F5F5F5] p-4">
        <section class="mx-auto px-6 py-4 bg-white rounded-lg">
            <div class="space-y-4">
                <!-- Total à payer -->
                <div class="">
                    <p class="text-sm text-gray-600 mb-2">
                        identifiant du compteur
                    </p>
                    <p class="text-2xl font-bold text-gray-900">
                        55889225532366
                    </p>
                </div>
            </div>
        </section>

        <!-- Section paiement total - cliquable -->
        <section @click="selectPaymentType('full')"
            class="mx-auto p-6 bg-white rounded-lg cursor-pointer transition-all duration-200 border-2"
            :class="paymentType === 'full' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-gray-200'">
            <div class="space-y-4">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <!-- <p class="text-sm text-gray-600 mb-2">
                            Vous pouvez choisir de régler l'intégralité des
                        </p> -->
                        <h3 class="text-md font-medium text-gray-900">Paiement integral</h3>
                        <p class="text-2xl font-bold text-gray-900">
                            {{ formatPrice(totalAmount) }}
                        </p>
                    </div>
                    <!-- Radio button -->
                    <div class="ml-4">
                        <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                            :class="paymentType === 'full' ? 'border-purple-500' : 'border-gray-300'">
                            <div v-if="paymentType === 'full'" class="w-3 h-3 rounded-full bg-purple-500"></div>
                        </div>
                    </div>
                </div>

                <!-- Bouton paiement total -->
                <!-- <Button @click.stop="handleFullPayment" :disabled="paymentType !== 'full'"
                    class="w-full py-3 rounded-md font-medium transition-all" :class="paymentType === 'full'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'">
                    Payer Totalement
                </Button> -->

                <!-- Séparateur -->
                <!-- <div class="text-center text-sm text-gray-500">
                    Ou laisser un montant partiel
                </div> -->
            </div>
        </section>

        <!-- Section paiement partiel - cliquable -->
        <section @click="selectPaymentType('partial')"
            class="p-6 bg-white rounded-lg space-y-4 cursor-pointer transition-all duration-200 border-2"
            :class="paymentType === 'partial' ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:border-gray-200'">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-md font-medium text-gray-900">Paiement partiel</h3>
                <!-- Radio button -->
                <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    :class="paymentType === 'partial' ? 'border-purple-500' : 'border-gray-300'">
                    <div v-if="paymentType === 'partial'" class="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
            </div>

            <!-- Input montant partiel -->
            <div>
                <Input v-model="partialAmount" type="number" placeholder="Montant partiel"
                    :disabled="paymentType !== 'partial'" @click.stop
                    class="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    :class="paymentType === 'partial'
                        ? 'border-gray-300 bg-white'
                        : 'border-gray-200 bg-gray-100 cursor-not-allowed'" :max="totalAmount" min="0" step="0.01" />
            </div>

            <!-- Bouton paiement partiel -->
            <!-- <Button @click.stop="handlePartialPayment" :disabled="paymentType !== 'partial' || !isPartialAmountValid"
                class="w-full py-3 rounded-md font-medium transition-all" :class="paymentType === 'partial' && isPartialAmountValid
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'">
                Paiement partiel
            </Button> -->
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/myUtils'

interface PaymentData {
    amount: number
    type: 'full' | 'partial'
}

// Props
interface Props {
    totalAmount: number
}

const props = withDefaults(defineProps<Props>(), {
    totalAmount: 1895
})

// Emits
const emit = defineEmits<{
    payment: [data: PaymentData]
}>()

// State
const partialAmount = ref<number | string>('')
const paymentType = ref<'full' | 'partial'>('full')

// Computed
const isPartialAmountValid = computed(() => {
    const amount = Number(partialAmount.value)
    return amount > 0 && amount <= props.totalAmount
})

// Methods
const selectPaymentType = (type: 'full' | 'partial') => {
    paymentType.value = type
}

const handleFullPayment = () => {
    if (paymentType.value === 'full') {
        emit('payment', {
            amount: props.totalAmount,
            type: 'full'
        })
    }
}

const handlePartialPayment = () => {
    if (paymentType.value === 'partial') {
        const amount = Number(partialAmount.value)
        if (isPartialAmountValid.value) {
            emit('payment', {
                amount,
                type: 'partial'
            })
        }
    }
}
</script>