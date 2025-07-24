<template>
    <div class="text-sm px-6 space-y-5 pb-5 border-b-[1px] border-neutral-200">
        <!-- User Information Section -->
        <!-- <section class="user-informations space-y-3">
            <h2 class="text-[16px] font-semibold text-neutral-10">Informations utilisateur</h2>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Nom</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.user.lastname }}</p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Prénom</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.user.firstname }}</p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Numéro de télephone</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.user.phone }}</p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Date d'inscription</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ formatRelativeDate(new
                    Date(transaction.user.created_at)) }}</p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Date de naissance</p>
                <p class="flex-1 text-neutral-10 font-medium">
                    {{ transaction.user.birthdate }}

                </p>

            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">ID utiliateur</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.user_id }}</p>
            </div>
        </section> -->

        <!-- Transaction Details Section -->
        <section class="transaction-details space-y-3">
            <h2 class="text-[16px] font-semibold text-neutral-10">Détails de la Transaction</h2>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Type de transaction</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.type }}</p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Montant reçu</p>
                <p class="flex-1 text-neutral-10 font-medium">
                    {{ formatPrice(transaction.amount, transaction.currency) }}
                </p>
            </div>

            <div class="flex">
                <p class="flex-1 text-neutral-20">Numéro du béneficiaire</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.beneficiary_phone }} ({{
                    transaction.beneficiary_provider?.name }})</p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">frais</p>
                <p class="flex-1 text-neutral-10 font-medium">
                    {{ formatPrice(transaction.fees, transaction.currency) }}
                </p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Montal total</p>
                <p class="flex-1 text-neutral-10 font-medium">
                    {{ formatPrice(transaction.fees + transaction.amount, transaction.currency) }}
                </p>
            </div>

            <div class="flex">
                <p class="flex-1 text-neutral-20">Statut de prélevement</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.payment_status }}</p>
            </div>


        </section>

        <!-- Payer Information Section -->
        <section class="payer-informations space-y-3">
            <h2 class="text-[16px] font-semibold text-neutral-10">Informations de l'expéditeur</h2>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Nom</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.payer_name }}</p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Numéro de télephone</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.payer_phone }} ({{
                    transaction.payer_provider?.name }})</p>
            </div>
            <!-- <div class="flex">
                <p class="flex-1 text-neutral-20">Pays</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.payer_country_code }}</p>
            </div> -->
        </section>

        <!-- Beneficiary Information Section -->
        <!-- <section class="beneficiary-informations space-y-3">
            <h2 class="text-[16px] font-semibold text-neutral-10">Informations du bénéficiaire</h2>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Nom</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.beneficiary_name }}</p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Numéro de télephone</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.beneficiary_phone }}</p>
            </div>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Pays</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.beneficiary_country_iso_code }}</p>
            </div>
        </section> -->

        <!-- Transaction History Section -->
        <section class="historique space-y-3">
            <h2 class="text-[16px] font-semibold text-neutral-10">Historique de la transaction</h2>
            <div class="flex">
                <p class="flex-1 text-neutral-20">Date</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ formatRelativeDate(new Date(transaction.created_at)) }}
                    <!-- <p class="flex-1 text-neutral-10 font-medium">{{ formatRelativeDate(new Date()) }} -->
                </p>
            </div>

            <div class="flex">
                <p class="flex-1 text-neutral-20">Statut final</p>
                <p class="flex-1 text-neutral-10 font-medium">{{ transaction.status }}</p>
            </div>
            <!-- <div class="flex"> -->
            <div class="flex" v-if="transaction.failed_reason">
                <p class="flex-1 text-neutral-20">Raison de l'echec</p>
                <div :class="{ 'overflow-y-scroll': transaction.failed_reason }" class="flex-1 max-h-20 ">

                    <p class="flex-1 text-neutral-10 font-medium">{{ transaction.failed_reason }}
                    </p>
                    <!-- <p class="flex-1 text-neutral-10 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Nemo consequatur, repudiandae, minima quae tempora dicta labore minus odio velit explicabo
                        aperiam est magnam at quod atque? Doloribus omnis magni impedit.</p> -->
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