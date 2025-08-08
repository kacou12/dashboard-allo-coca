<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" title="Faire le paiement">
            </CommonButton>
        </template>

        <template #title>
            <span>Paiement en cours</span>
        </template>
        <template #content class="">
            <section v-if="localStep == 1" class="space-y-4 flex flex-col items-center py-7 ">

                <div class="relative flex items-center justify-center">

                    <div
                        class="absolute w-[110px] h-[110px] border-4 border-gray-200 border-t-primary-50 rounded-full animate-spin">
                    </div>

                    <div class="w-[100px] h-[100px] flex items-center rounded-full justify-center bg-neutral-80 z-10">
                        <img src="@/assets/images/salutingFace.png" alt="" />
                    </div>
                </div>

                <h2 class="font-bold text-[20px]">En cours</h2>
                <p class="font-worksans text-neutral-20">Vos paiements sont en cours de traitement</p>
            </section>
            <section v-else-if="localStep == 2" class="space-y-4 flex flex-col items-center py-7 ">

                <div class="relative flex items-center justify-center">


                    <div class="w-[100px] h-[100px] flex items-center rounded-full justify-center bg-neutral-80 z-10">
                        <img src="@/assets/images/huggingFace.png" alt="" />
                    </div>
                </div>

                <h2 class="font-bold text-[20px]">Bravo</h2>
                <p class="font-worksans text-neutral-20 text-center">Vos paiements ont été effectués avec succès,merci
                    de nous faire
                    confiance !</p>
            </section>
        </template>

        <template #footer>
            <div class="flex items-center justify-end p-4">

                <CommonButton v-if="localStep == 2" type="default" @action="goToDescriptionStep"
                    title="Ajouter une description">
                </CommonButton>
            </div>
        </template>
    </CommonModal>
</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const { startLoading } = useLoaderStore();
const open = ref(false);
const emit = defineEmits<{
    (e: 'addDescription'): void
}>();
const localStep = ref(1);

const { } = defineProps({

})

watch(localStep, (n, o) => {
    if (n == 1) {
        setTimeout(() => {
            localStep.value = 2;
        }, 5000);
    }

}, { immediate: true })

const goToDescriptionStep = () => {
    open.value = false;
    localStep.value = 1;
    emit('addDescription');
}

</script>
<style scoped></style>