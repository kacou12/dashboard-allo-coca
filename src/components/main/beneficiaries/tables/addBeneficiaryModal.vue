<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CustomButton type="default" @action="() => { }">
                <div class="flex items-center gap-2">
                    <Plus></Plus>
                    Ajouter un bénéficiaire
                </div>
            </CustomButton>
        </template>

        <template #title>
            <span>Création d’un bénéficiaire</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <section class=" ">
                    <p class=" text-neutral-20 ">Nom complet</p>
                    <div class="flex gap-3 w-full ">
                        <InputField v-model="userData.fullName" name="firstname" placeholder="First name" class="" />
                    </div>
                </section>


                <section class=" ">

                    <p class=" text-neutral-20">Téléphone</p>
                    <div class="flex gap-3 w-full max-w-[712px] relative">
                        <InputField v-model="userData.phone" class="" name="phone" placeholder="numero de téléphone" />
                    </div>
                </section>


                <section class=" ">
                    <p class="flex-1 text-neutral-20">Type de paiement</p>

                    <SelectField name="payment_method" v-model="userData.paymentMethod" border-color="border-neutral-60"
                        default-width="w-full" class="w-full" title="Type de paiement" :elements="[{ name: 'Orange', value: 'orange' },
                        { name: 'Moov', value: 'moov' },
                        { name: 'MTN', value: 'mtn' },
                        { name: 'Wave', value: 'wave' },
                        ]">
                    </SelectField>

                </section>

                <section class=" ">

                    <p class=" text-neutral-20">Description du béneficiaire</p>
                    <div class="flex gap-3 w-full max-w-[712px] relative">
                        <TextareaField v-model="userData.description" class="" name="description"
                            placeholder="Description du bénéficiaire" />
                    </div>
                </section>



            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-5 py-5 w-full">


                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1  text-sm rounded-lg bg-primary font-normal" variant="default">
                    Valider
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import type { RoleResponse } from '@/services/admin/admin-type';
import { userToAdminSchema } from '@/services/users/user-schema';
import { useCountryStore } from '@/stores/useCountryStore';
import { toTypedSchema } from '@vee-validate/zod';
import { Plus } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

import InputField from '@/components/vee-validate/InputField.vue';
import SelectField from '@/components/vee-validate/selectField.vue';
import TextareaField from '@/components/vee-validate/TextareaField.vue';

const open = ref(false);
const toast = useToast();
const { currentCountry } = storeToRefs(useCountryStore());

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(userToAdminSchema)
});

const rolesData = ref<PaginationResponse<RoleResponse>>();
const userData = ref({
    fullName: undefined,
    phone: '',
    paymentMethod: '',
    description: undefined
});

const updateUserToAdminHandler = async () => {
    // const payload = {
    //     firstname: userData.value.firstname,
    //     lastname: userData.value.lastname,
    //     birthdate: userData.value.birthdate,
    //     email: userData.value.email,
    //     password: userData.value.password,
    //     avatar: userData.value.avatar,
    //     verification_status: "unverified",
    //     phone: userData.value.phone,
    //     phone_verified: true,
    //     email_verified: true,
    //     role_id: userData.value.role_id,
    //     country_id: currentCountry.value?.id,
    //     accepted_tos: false,
    //     referred_by: undefined,
    //     referral_code: undefined,
    //     withdrawn_amount: 0,
    //     reward_amount: 0,
    //     is_superuser: false,
    //     active: userData.value.active,
    //     pin_code: "",
    //     has_pin: true,
    //     one_signal_subs_id: ""
    // }
    // await updateUser({
    //     ...payload
    // });

    // open.value = false;
    // await router.push({ name: AppRoute.ADMINISTRATION.name });
    // toast.success("L'utilisateur a bien été ajouté en tant qu'administrateur");

};



const onSubmit = handleSubmit(async ({ lastname }) => {
    await updateUserToAdminHandler();
    resetForm();
});

</script>