<template>
    <div class="bg-white p-4 rounded-lg shadow border border-neutral-70 h-full">
        <section class="flex justify-between items-center">
            <h2 class="font-bold font-merriweathersans text-sm lg:text-xl ">Transaction récentes</h2>
            <!-- <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.99992 1.25C2.50618 1.25 2.91659 1.66041 2.91659 2.16667C2.91659 2.67293 2.50618 3.08333 1.99992 3.08333C1.49366 3.08333 1.08325 2.67293 1.08325 2.16667C1.08325 1.66041 1.49366 1.25 1.99992 1.25Z"
                    fill="#999999" stroke="#999999" stroke-width="1.5" />
                <path
                    d="M3.66659 7.99992C3.66659 7.07944 2.92039 6.33325 1.99992 6.33325C1.07944 6.33325 0.333252 7.07944 0.333252 7.99992C0.333252 8.92039 1.07944 9.66659 1.99992 9.66659C2.92039 9.66659 3.66659 8.92039 3.66659 7.99992Z"
                    fill="#999999" />
                <path
                    d="M3.66659 13.8334C3.66659 12.9129 2.92039 12.1667 1.99992 12.1667C1.07944 12.1667 0.333252 12.9129 0.333252 13.8334C0.333252 14.7539 1.07944 15.5001 1.99992 15.5001C2.92039 15.5001 3.66659 14.7539 3.66659 13.8334Z"
                    fill="#999999" />
            </svg> -->
            <DashboardTransactionsDropdown v-if="transactions.length > 0"></DashboardTransactionsDropdown>
        </section>

        <DashboardTransactionHistory :transactions></DashboardTransactionHistory>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import DashboardTransactionHistory from './dashboardTransactionHistory.vue';
import DashboardTransactionsDropdown from './dashboardTransactionsDropdown.vue';
import type { TransactionResponse } from '@/services/transactions/transaction-type';

defineProps({
    transactions: {
        type: Object as PropType<TransactionResponse[]>,
        required: true
    }
})



</script>

<style scoped></style>