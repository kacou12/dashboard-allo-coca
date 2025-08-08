<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CustomButton :padding-y="2" type="outline">
                <div v-if="!isUpdating" class="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.1988 11.9587C10.1454 12.0211 10.0803 12.0723 10.007 12.1094C9.93384 12.1465 9.85402 12.1688 9.77217 12.1749C9.69032 12.1811 9.60806 12.1711 9.53011 12.1454C9.45216 12.1197 9.38005 12.0788 9.31793 12.0252L7.98832 10.8701V15.1082C7.98832 15.2735 7.92265 15.432 7.80577 15.5489C7.68889 15.6658 7.53036 15.7315 7.36506 15.7315C7.19977 15.7315 7.04124 15.6658 6.92436 15.5489C6.80748 15.432 6.74181 15.2735 6.74181 15.1082V10.8285L5.20445 12.0418C5.09635 12.1292 4.96119 12.1762 4.82219 12.1748C4.72753 12.1745 4.63418 12.1526 4.54923 12.1109C4.46428 12.0691 4.38996 12.0085 4.3319 11.9338C4.22903 11.8019 4.18187 11.635 4.20051 11.4689C4.21915 11.3027 4.3021 11.1504 4.43162 11.0446L6.97449 9.00033C7.00208 8.97889 7.03295 8.96205 7.0659 8.95047L7.14069 8.90892C7.20139 8.90118 7.26282 8.90118 7.32351 8.90892H7.36506C7.44272 8.90784 7.51955 8.92491 7.58944 8.95878L7.66423 9.00033C7.70016 9.01467 7.73377 9.03427 7.76395 9.0585L10.1323 11.1111C10.2437 11.2206 10.3117 11.3667 10.3239 11.5225C10.3362 11.6782 10.2917 11.8331 10.1988 11.9587ZM18.9576 13.5542C18.9664 14.9685 18.4142 16.3287 17.422 17.3365C16.4297 18.3443 15.0783 18.9177 13.6641 18.9308H6.33462C4.92035 18.9177 3.569 18.3443 2.57674 17.3365C1.58448 16.3287 1.03226 14.9685 1.04112 13.5542V6.44083C1.03226 5.02654 1.58448 3.66641 2.57674 2.65858C3.569 1.65074 4.92035 1.0774 6.33462 1.06423H11.6614C11.7193 1.05637 11.778 1.05637 11.8359 1.06423H11.8857C11.954 1.09006 12.0162 1.12966 12.0686 1.18057L18.7166 7.93664C18.792 8.01445 18.8462 8.11035 18.8738 8.21514C18.9015 8.31993 18.9017 8.43007 18.8745 8.53496C18.8792 8.57638 18.8792 8.6182 18.8745 8.65962L18.9576 13.5542ZM12.3095 5.68462C12.3073 6.24598 12.527 6.78547 12.9209 7.18551C13.3147 7.58555 13.8507 7.81373 14.412 7.8203H16.8302L12.2846 3.22485L12.3095 5.68462ZM17.736 13.5542V9.08343H14.412C13.5222 9.06813 12.6743 8.70278 12.0521 8.06655C11.4299 7.43033 11.0835 6.57452 11.088 5.68462V2.3606H6.33462C5.25824 2.36937 4.22894 2.80312 3.47092 3.56736C2.71291 4.33161 2.28759 5.36442 2.28763 6.44083V13.5542C2.28324 14.0901 2.38445 14.6215 2.58546 15.1182C2.78647 15.6149 3.08335 16.0672 3.45916 16.4492C3.83496 16.8311 4.28232 17.1354 4.77569 17.3444C5.26906 17.5535 5.79879 17.6634 6.33462 17.6677H13.6641C14.1999 17.6634 14.7296 17.5535 15.223 17.3444C15.7164 17.1354 16.1637 16.8311 16.5395 16.4492C16.9153 16.0672 17.2122 15.6149 17.4132 15.1182C17.6143 14.6215 17.7155 14.0901 17.7111 13.5542H17.736Z"
                            fill="#633DA5" />
                    </svg>
                    <p>Importer le tableau</p>
                </div>
                <div v-else>
                    <p>Changer de tableau</p>
                </div>
            </CustomButton>
        </template>

        <template #title>
            <span>Charger votre tableau</span>
        </template>
        <template #content class="">
            <!-- file select -->
            <ExcelFileField name="file_url" v-model="formState.excelFile"></ExcelFileField>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button :disabled="!formState.excelFile || isConverting" type="submit"
                    class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                    {{ isConverting ? 'Conversion...' : 'Ajouter' }}
                </Button>
            </div>
        </template>
    </CommonModal>
</template>

<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { supplyDepositSchema } from '@/services/supply-transactions/supply-transaction-schema';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import * as XLSX from 'xlsx';
import ExcelFileField from './excelFileField.vue';
import { massPaymentSchema } from '@/services/mass-payment/mass-payment-schema';

const toast = useToast();
const { startLoading } = useLoaderStore();

const emit = defineEmits<{
    (e: 'loadData', excelFile: File): void
}>();

const { isUpdating } = defineProps({
    isUpdating: {
        type: Boolean,
        required: false,
        default: false
    }
})



const open = ref(false);
const isConverting = ref(false);

const initialFormState = {
    excelFile: undefined as File | undefined,
} as const;
const formState = ref({
    ...initialFormState
});


const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(massPaymentSchema)
});

const onSubmit = handleSubmit(() => {
    // Add password validation here
    emit('loadData', formState.value.excelFile!);
    open.value = false;
});

</script>