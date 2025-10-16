<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Créer un compte"></CommonButton>
        </template>

        <template #title>
            <span>Création de compte</span>
        </template>
        <template #content class=" ">
            <form @submit.prevent="onSubmit">

                <!-- First section  -->
                <div class="space-y-2 ">

                    <section class="flex gap-2">
                        <article class="flex-1">

                            <div>
                                <p class="flex-1 text-neutral-20 ">Nom complet</p>
                            </div>
                            <div class="flex gap-3 w-full max-w-[512px]  ">
                                <!-- <Input type="firstNmae" id="firstName" v-model="dataState.firstname"
                                    placeholder="First name" class=""  /> -->

                                <InputField class="w-full" v-model="dataState.name" placeholder="First name"
                                    name="name" />

                            </div>
                        </article>

                    </section>

                    <section class=" ">
                        <div>
                            <p class="flex-1 text-neutral-20">Adresse électronique</p>
                        </div>
                        <div class="flex gap-3 w-full max-w-[512px]   relative">
                            <InputField type="email" name="email" v-model="dataState.email" placeholder="email"
                                class="w-full pl-9" />

                        </div>
                    </section>


                    <section class=" ">
                        <div>
                            <p class="flex-1 text-neutral-20">numéro de téléphone</p>
                        </div>
                        <div class="flex gap-3 w-full max-w-[512px] relative">

                            <InputField class="pl-14" v-model="dataState.phone" placeholder="numéro de téléphone"
                                name="phone" />


                        </div>
                    </section>


                </div>
            </form>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    Créer maintenant
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import type { AdminRequest } from '@/services/admin/admin-type';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

import { clientSchema } from '@/services/allococa/clients/client-schema';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import InputField from '../vee-validate/InputField.vue';
import { useCreateAdminMutation } from '@/composables/queries/allococa/useAllococaAdminsQueries';

const toast = useToast();

const { startLoading, stopLoading, startLoadingSkeleton } = useLoaderStore();
const { mutateAsync: createAdminAsync } = useCreateAdminMutation();


const open = ref(false);


const addNewAdmin = async () => {
    const payload: AdminRequest = {
        name: dataState.value.name,
        role: "admin",
        email: dataState.value.email,
        phone: dataState.value.phone,

    };  // dataState.email,
    // createAdmin(payload);

    try {
        startLoading();

        await createAdminAsync(payload);
        open.value = false;
        dataState.value = {
            name: "",
            role: "admin",
            email: "",
            phone: "",
        }

        toast.success('Admin created successfully');


    } catch (err) {

    } finally {

    }


}


const dataState = ref({
    name: "",
    role: "admin",
    email: "",
    phone: "",


});

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(clientSchema)
});

const onSubmit = handleSubmit(({ }) => {
    addNewAdmin();
});
</script>