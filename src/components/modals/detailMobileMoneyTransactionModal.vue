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

        </template>
        <template #content class=" ">
            <!-- First section  -->
            <div class="space-y-2">

                <section class="flex flex-col gap-2 p-3 rounded-xl bg-white">
                    <div class="flex justify-between items-center">
                        <TransactionPaymentNetwork></TransactionPaymentNetwork>
                        <p class="text-neutral-10 font-bold text-xl font-merriweathersans">10 450 F CFA</p>
                    </div>
                    <div>
                        <p class="text-neutral-40 text-sm">Envoie à 0107565605 (Alexandre)</p>
                    </div>

                </section>
                <section class="detailPayment p-3 rounded-xl space-y-3  bg-white">

                    <h2 class="text-[16px] font-medium text-neutral-10">Details transaction</h2>
                    <!-- border-dashed -->
                    <div class="divide-y divide-neutral-70 divide-dashed space-y-3">

                        <article class="space-y-3 border-dashed ">

                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Montant envoyer</p>
                                <p class="flex-1 text-neutral-10 font-medium">10.000 F CFA</p>
                            </div>
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Frais</p>
                                <p class="flex-1 text-neutral-10 font-medium">450 F CFA</p>
                            </div>
                        </article>

                        <article class="space-y-3 pt-3">
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Total payer</p>
                                <p class="flex-1 text-neutral-10 font-medium">10.450 F CFA</p>
                            </div>
                        </article>

                        <article class="space-y-3 pt-3">
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Numéro débité</p>
                                <p class="flex-1 text-neutral-10 font-medium">0787995058</p>
                            </div>
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Réseau</p>
                                <p class="flex-1 text-neutral-10 font-medium">Wave</p>
                            </div>
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Statut</p>
                                <p class="flex-1 text-neutral-10 font-medium">Effectuer</p>
                            </div>
                        </article>

                        <article class="space-y-3 pt-3">

                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Numéro bénéficiaire</p>
                                <p class="flex-1 text-neutral-10 font-medium">0107565605</p>
                            </div>
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Réseau</p>
                                <p class="flex-1 text-neutral-10 font-medium">Orange</p>
                            </div>
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Status</p>
                                <p class="flex-1 text-neutral-10 font-medium">En cours</p>
                            </div>
                        </article>

                        <article class="space-y-3 pt-3">

                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Date et heure</p>
                                <p class="flex-1 text-neutral-10 font-medium">04/04/2023 à 10h30</p>
                            </div>
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">ID transaction </p>
                                <p class="flex-1 text-neutral-10 font-medium">XDZ87OL534</p>
                            </div>
                        </article>
                    </div>

                </section>
            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Fermer
                </Button>
                <Button class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                    Voir le profil
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonModal from '@/components/common/commonModal.vue'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import TransactionPaymentNetwork from '../main/recentTransactions/tables/transactionPaymentNetwork.vue';

const open = ref(false);
defineProps({
    id: {
        type: String,
        required: true

    }
})
</script>