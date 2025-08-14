<template>
    <div class="px-4 w-full">
        <header class="mb-6">

            <section class="flex items-center gap-2">
                <button class="hidden xl:block p-2 -ml-2 mr-2" @click="toggleSidebarExpanded">
                    <svg viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round" class="h-6 w-6 transform"
                        :class="isSidebarExpanded ? 'rotate-180' : 'rotate-0'">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="4" y1="6" x2="14" y2="6" />
                        <line x1="4" y1="18" x2="14" y2="18" />
                        <path d="M4 12h17l-3 -3m0 6l3 -3" />
                    </svg>
                </button>
                <div class=" space-y-1">
                    <h1 class="text-xl font-bold font-merriweathersans">Paiement de factures</h1>
                    <p class="text-sm text-[#808080]">Payer vos factures en quelque clique</p>
                </div>

            </section>

        </header>

        <BannerWallet></BannerWallet>

        <section class="space-y-4 my-5">
            <p class="font-semibold">Choisissez votre société</p>
            <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-5">

                <CanalTransactionModal></CanalTransactionModal>

                <!-- <article
                    class="cursor-pointer hover:bg-neutral-80 transition-all  duration-300 flex items-center gap-2 border-[2px] shadow-sm border-[#F5F5F5] rounded-lg p-2">
                    <img class="rounded-md w-[48px] h-[48px] bg-cover" src="@/assets/images/invoices/sodeci.png"
                        alt="canal" />
                    <div class="min-w-[146px]">
                        <p class="font-semibold font-worksans text-sm text-neutral-10">
                            SODECI
                        </p>
                        <p class="text-sm text-[#4B5675]">443210987657</p>
                    </div>
                </article> -->

                <SodeciStepperModal></SodeciStepperModal>
                <CieStepperModal></CieStepperModal>
            </div>
        </section>

        <section class=" w-full">
            <!-- <Comp334></Comp334> -->
            <CommonDataTable :page-size="filters.limit" ref="my-table" :default-page="filters.page"
                :total="suppliesData?.total ?? 0" :columns="suppliesColumns" :data="suppliesData?.items ?? []"
                @go-to-page="goToPage" @prev-page="prevPage" @next-page="nextPage">
            </CommonDataTable>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BannerWallet from '@/components/bannerWallet.vue';
import CommonDataTable from '@/components/common/commonDataTable.vue';
import { suppliesColumns } from '@/components/main/supplies/tables/suppliesColumn';
import { useSupplyTransactionsFiltersQuery } from '@/composables/queries/useSupplyTransactionsQueries';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useSupplyFiltersStore } from '@/stores/useSupplyFilterStore';
import { useWindowSize } from '@vueuse/core';
import { useTemplateRef } from 'vue';
import { useRoute } from 'vue-router';
import type { SupplyBank } from '@/services/supply-transactions/supply-transaction-type';
import BankDetailModal from '@/components/main/supplies/tables/bankDetailModal.vue';
import CanalTransactionModal from '@/components/main/invoiceTrancations/canal/canalTransactionModal.vue';
import CieStepperModal from '@/components/main/invoiceTrancations/CIE/cieStepperModal.vue';
import Comp334 from '@/components/comp-334.vue';
import SodeciStepperModal from '@/components/main/invoiceTrancations/SODECI/sodeciStepperModal.vue';
import { inject } from 'vue';
import { sidebarStateKey } from '@/components/layouts/provide-state-key';

const { isSidebarExpanded, toggleSidebarExpanded } = inject(sidebarStateKey)!



// Définir le type pour une banque

// Déclarer la variable réactive pour les banques
const banks = ref<SupplyBank[]>([
    {
        id: 1,
        name: 'Ecobank',
        bankNumber: '543210987654',
        image: '/src/assets/images/banks/ecobank.png',
    },
    {
        id: 2,
        name: 'Société Générale',
        bankNumber: '543210987654',
        image: '/src/assets/images/banks/societe-generale.png',
    },
    {
        id: 3,
        name: 'Banque Atlantique',
        bankNumber: '543210987654',
        image: '/src/assets/images/banks/bank-generale.jpg',
    },
    {
        id: 4,
        name: 'Banque Générale',
        bankNumber: '543210987654',
        image: '/src/assets/images/banks/ecobank.png', // L'image Ecobank est utilisée ici comme exemple
    },
]);

const { user, fullName } = useAuthStore();

const {
    data: suppliesData,
    isFetched,
    refetch,
    isFetching,
} = useSupplyTransactionsFiltersQuery();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();

const filters = useSupplyFiltersStore();

const route = useRoute();
const { width, height } = useWindowSize();

const tableRef = useTemplateRef('my-table');

const nextPage = async () => {
    filters.page = filters.page + 1;
    startLoadingSkeleton();
    // refetch();
};
const goToPage = async (page: number) => {
    filters.page = page;
    startLoadingSkeleton();
    // refetch();
};

const prevPage = async () => {
    filters.page = filters.page - 1;
    startLoadingSkeleton();
    refetch();
};
</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>