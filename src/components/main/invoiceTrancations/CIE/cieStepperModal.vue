<template>
    <CommonModal text-defaul-size="" :isPersisted="true" v-model:open="open" backgroudColor="bg-white"
        :showDivider="false">
        <template #trigger>
            <article
                class="cursor-pointer hover:bg-neutral-80 transition-all  duration-300 flex items-center gap-2 border-[2px] shadow-sm border-[#F5F5F5] rounded-lg p-2">
                <img class="rounded-md w-[48px] h-[48px] bg-cover" src="@/assets/images/invoices/cie.png" alt="canal" />
                <div class="min-w-[146px]">
                    <p class="font-semibold font-worksans text-sm text-neutral-10">
                        CIE
                    </p>
                    <p class="text-sm text-[#4B5675]">543210987654</p>
                </div>
            </article>
        </template>

        <template #title>
            <h2>Paiement de facture CIE</h2>
        </template>

        <template #content>
            <!-- stepper -->
            <section class="space-y-3" v-if="currentStep <= 3">
                <CommonStepperBar :steps-data="localStepsData" :steps-length="localStepsLength" v-model="currentStep">
                </CommonStepperBar>


                <div class="relative min-h-[350px]">
                    <Transition name="slide-fade" mode="out-in">
                        <CieSetIdentifierStepOne v-if="currentStep == 1" key="step1"></CieSetIdentifierStepOne>
                        <CieSelectInvoiceStepTwo v-model="transfertState.amount" v-else-if="currentStep == 2"
                            key="step2">
                        </CieSelectInvoiceStepTwo>
                        <CieInitPaymentStepThree :total-amount="15000" v-else-if="currentStep == 3" key="step3">
                        </CieInitPaymentStepThree>
                    </Transition>
                </div>
            </section>


            <section v-else class="space-y-4 flex flex-col items-center py-7 ">

                <div class="relative flex items-center justify-center">

                    <div
                        class="absolute w-[110px] h-[110px] border-4 border-gray-200 border-t-primary-50 rounded-full animate-spin">
                    </div>

                    <div class="w-[100px] h-[100px] flex items-center rounded-full justify-center bg-neutral-80 z-10">
                        <img src="@/assets/images/salutingFace.png" alt="" />
                    </div>
                </div>

                <h2 class="font-bold text-[20px]">En cours</h2>
                <p class="font-worksans">Votre transaction est en cours de traitement</p>
            </section>
        </template>

        <template #footer>
            <div v-if="currentStep < 4" class="py-3 w-full rounded-b-xl flex justify-between items-center px-3 gap-2">
                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                    @click="handlePrevStep">
                    {{ currentStep == 1 ? 'Fermer' : 'Retour' }}
                </Button>
                <Button @click="handleNextStep" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    {{ currentStep == 3 ? 'Valider' : 'Suivant' }}
                </Button>
            </div>
        </template>
    </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from '@/components/common/commonModal.vue';
import { reactive, ref, watch } from 'vue';
import CommonStepperBar from '@/components/common/commonStepperBar.vue';
import Button from '@/components/ui/button/Button.vue';
import CieInitPaymentStepThree from './cieInitPaymentStepThree.vue';
import CieSelectInvoiceStepTwo from './cieSelectInvoiceStepTwo.vue';
import CieSetIdentifierStepOne from './cieSetIdentifierStepOne.vue';

const open = ref(false);
const currentStep = ref<1 | 2 | 3>(1);
// const isSubmitting = ref(false);
const localStepsData = ref([
    {
        title: 'Identifiant',
        description: 'Selection du montant'
    },
    {
        title: 'Facture',
        description: 'Selectionner de la facture'
    },
    {
        title: 'Montant',
        description: 'Choix du montant'
    }
]);

const localStepsLength = ref(3);

const transfertState = reactive({
    amount: 0,

})

const handleNextStep = () => {
    if (currentStep.value < 4) {
        currentStep.value++;
    }
}

const handlePrevStep = () => {
    if (currentStep.value == 1) {
        return open.value = false;
    }
    currentStep.value--;
}

watch(open, (n, o) => {
    if (n == false) {
        currentStep.value = 1;
    }
})
</script>

<style scoped>
/* Transition slide-fade */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from {
    transform: translateX(30px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(-30px);
    opacity: 0;
}

/* Alternative: transition avec slide vertical */
.slide-vertical-enter-active,
.slide-vertical-leave-active {
    transition: all 0.3s ease;
}

.slide-vertical-enter-from {
    transform: translateY(20px);
    opacity: 0;
}

.slide-vertical-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

/* Alternative: transition fade simple */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes spin2 {
    0% {
        stroke-dasharray: 1, 800;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 400, 400;
        stroke-dashoffset: -200px;
    }

    100% {
        stroke-dasharray: 800, 1;
        stroke-dashoffset: -800px;
    }
}

.spin2 {
    transform-origin: center;
    animation: spin2 1.5s ease-in-out infinite,
        spin 0.9s linear infinite;
    animation-direction: alternate;
}
</style>