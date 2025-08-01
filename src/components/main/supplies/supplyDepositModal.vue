<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CustomButton :padding-y="2" type="default">
                Approvisionner
            </CustomButton>
        </template>

        <template #title>
            <span>Approvisionnement</span>
        </template>
        <template #content class="">
            <!-- First section  -->
            <div class="space-y-4">

                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Montant</p>
                    </div>
                    <div class=" w-full">
                        <InputField type="number" v-model="formState.amount" name="amount" id="amount"
                            placeholder="100000" class="py-2 pr-12" required>
                        </InputField>



                    </div>
                </section>


                <!-- file select -->
                <FileField name="file_url" v-model="formState.file_url"></FileField>


            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button :disabled="!formState.file_url" type="submit"
                    class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                    Terminer
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import FileField from '@/components/vee-validate/fileField.vue';
import InputField from '@/components/vee-validate/InputField.vue';
import { supplyDepositSchema } from '@/services/supply-transactions/supply-transaction-schema';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { toTypedSchema } from '@vee-validate/zod';
import { useFileDialog } from '@vueuse/core';
import { ArrowUpCircle } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const { startLoading } = useLoaderStore();

const { files, open: openSelectFile, reset: resetFile, onCancel, onChange } = useFileDialog({
    accept: 'image/*,application/pdf', // Set to accept only image files
    multiple: false,
});

// const { mutateAsync: depositRequest } = useDepositRequestMutation();


const open = ref(false);



const initialFormState = {
    amount: undefined,
    file_url: undefined,
} as const;
const formState = ref({
    ...initialFormState
})

const [amountModel,] = defineModel('status', {
    set(value: string) {

        return value
    },
    default: undefined,
})



watch(open, (newValue) => {
    if (newValue) {
        formState.value = { ...initialFormState };
        resetFile();
    }
});


const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(supplyDepositSchema)
});

const onSubmit = handleSubmit(({ }) => {
    depositRequestHandler();
});

const depositRequestHandler = async () => {
    // formState.value.file_url = files.value!.item!(0)!;

    // startLoading();
    // await depositRequest(formState.value);
    // open.value = false;
    // toast.success("La demande d'approvisionnement a bien été soumise");
}


</script>