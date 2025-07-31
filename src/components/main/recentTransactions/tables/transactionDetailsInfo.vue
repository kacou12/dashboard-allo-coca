<template>
    <div class="text-sm  space-y-3  border-neutral-200">


        <!-- Transaction Details Section -->
        <section class="transaction-details space-y-3">
            <h2 class="text-[16px] font-medium text-black font-worksans">Details transaction</h2>

            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">Type de transaction</p>
                <p class=" text-neutral-10 font-medium">{{ transaction.type }}</p>
            </div>
            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">Montant reçu</p>
                <p class=" text-neutral-10 font-medium">
                    {{ formatPrice(transaction.amount, transaction.currency) }}
                </p>
            </div>

            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">Numéro du béneficiaire</p>
                <p class=" text-neutral-10 font-medium">{{ transaction.beneficiary_phone }} ({{
                    transaction.beneficiary_provider?.name }})</p>
            </div>
            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">frais</p>
                <p class=" text-neutral-10 font-medium">
                    {{ formatPrice(transaction.fees, transaction.currency) }}
                </p>
            </div>
            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">Montal total</p>
                <p class=" text-neutral-10 font-medium">
                    {{ formatPrice(transaction.fees + transaction.amount, transaction.currency) }}
                </p>
            </div>

            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">Statut de prélevement</p>
                <p class=" text-neutral-10 font-medium">{{ transaction.payment_status }}</p>
            </div>


        </section>

        <!-- Payer Information Section -->
        <section class="payer-informations space-y-3">
            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">Nom</p>
                <p class=" text-neutral-10 font-medium">{{ transaction.payer_name }}</p>
            </div>
            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">Numéro de télephone</p>
                <p class=" text-neutral-10 font-medium">{{ transaction.payer_phone }} ({{
                    transaction.payer_provider?.name }})</p>
            </div>

        </section>


        <section class="historique space-y-3">
            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">Date</p>
                <p class=" text-neutral-10 font-medium">{{ formatRelativeDate(new Date(transaction.created_at)) }}
                    <!-- <p class=" text-neutral-10 font-medium">{{ formatRelativeDate(new Date()) }} -->
                </p>
            </div>

            <div class="flex iems-center justify-between">
                <p class=" text-neutral-40">Statut final</p>
                <p class=" text-neutral-10 font-medium">{{ transaction.status }}</p>
            </div>
            <!-- <div class="flex iems-center justify-between"> -->
            <div class="flex iems-center justify-between" v-if="transaction.failed_reason">
                <p class=" text-neutral-40">Raison de l'echec</p>
                <div :class="{ 'overflow-y-scroll': transaction.failed_reason }" class=" max-h-20 ">

                    <p class=" text-neutral-10 font-medium">{{ transaction.failed_reason }}
                    </p>
                </div>
            </div>
        </section>
    </div>

</template>

<script setup lang="ts">
import { formatPrice, formatRelativeDate } from '@/lib/utils';
import type { TransactionResponse } from '@/services/transactions/transaction-type';
import type { PropType } from 'vue';

defineProps({
    transaction: {
        type: Object as PropType<TransactionResponse>,
        required: true
    }
})


</script>

<style scoped></style>