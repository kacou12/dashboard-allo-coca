<template>
    <CommonModal v-model:open="open" backgroudColor="bg-neutral-80" :showDivider="false">
        <template #trigger>
            <article
                class="cursor-pointer hover:bg-neutral-80 transition-all  duration-300 flex items-center gap-2 border-[2px] shadow-sm border-[#F5F5F5] rounded-lg p-2">
                <img class="rounded-md w-[48px] h-[48px] bg-cover" :src="supplyBank.image" :alt="supplyBank.name" />
                <div class="min-w-[146px]">
                    <p class="font-semibold font-worksans text-sm text-neutral-10">
                        {{ supplyBank.name }}
                    </p>
                    <p class="text-sm text-[#4B5675]">{{ supplyBank.bankNumber }}</p>
                </div>
            </article>

        </template>

        <template #title>
            <h2>Paiement</h2>
        </template>
        <template #content class=" ">
            <!-- First section  -->
            <div class="space-y-2">

                <section class="flex flex-col gap-2 p-4 rounded-xl bg-white">
                    <div class="flex gap-3 items-center">
                        <img class="w-[33px] h-[33px] rounded-md" src="@/assets/images/banks/ecobank.png" alt="">
                        <!-- <p class="text-neutral-10 font-bold text-xl font-merriweathersans">{{
                            formatPrice(supplyTransaction.amount)

                            }} </p> -->
                    </div>

                </section>

                <!-- detail achat -->
                <div class="text-sm p-4 bg-white space-y-5 rounded-xl pb-5  border-neutral-200">

                    <section class="transaction-details space-y-3">
                        <h2 class="text-[16px] font-medium text-black font-worksans">Détails bancaire</h2>

                        <div class="flex iems-center justify-between">
                            <p class=" text-neutral-40">Titulaire du compte</p>
                            <p class=" text-neutral-10 font-medium">Sendchap Pro</p>
                        </div>
                        <div class="flex iems-center justify-between">
                            <p class=" text-neutral-40">Code Guichet</p>
                            <p class=" text-neutral-10 font-medium">
                                12345
                            </p>
                        </div>

                        <div class="flex iems-center justify-between">
                            <p class=" text-neutral-40">Code Banque</p>
                            <p class=" text-neutral-10 font-medium">AT123</p>
                        </div>
                        <div class="flex iems-center justify-between">
                            <p class=" text-neutral-40">Numéro de Compte</p>
                            <p class=" text-neutral-10 font-medium">
                                123456789012
                            </p>
                        </div>
                        <div class="flex iems-center justify-between">
                            <p class=" text-neutral-40">RIB</p>
                            <p class=" text-neutral-10 font-medium">
                                AT123456789012345678
                            </p>
                        </div>

                    </section>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Telecharger le RIB
                </Button>
                <!-- <Button type="submit" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    Approvisionner
                </Button> -->
                <SupplyDepositModal></SupplyDepositModal>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonModal from '@/components/common/commonModal.vue';
import Button from '@/components/ui/button/Button.vue';
import type { SupplyBank } from '@/services/supply-transactions/supply-transaction-type';
import { ref, type PropType } from 'vue';
import SupplyDepositModal from '../supplyDepositModal.vue';

const appleCard = new URL("/src/assets/images/gift/apple-card.png", import.meta.url).href;
const open = ref(false);

const { supplyBank } = defineProps({
    supplyBank: {
        type: Object as PropType<SupplyBank>,
        required: true
    }
})

</script>