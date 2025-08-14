<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="outline" @action="() => { }" title="Enregistrer en tant qu'admin">
            </CommonButton>
        </template>

        <template #title>
            <span>Ajout en tant qu'admin</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <section class=" ">
                    <p class=" text-neutral-20 ">Nom</p>
                    <div class="flex gap-3 w-full ">
                        <InputField v-model="userData.firstname" name="firstname" placeholder="First name" class="" />
                    </div>
                </section>

                <section class=" ">
                    <p class=" text-neutral-20 ">Prenoms</p>
                    <div class="flex gap-3 w-full ">
                        <InputField v-model="userData.lastname" name="lastname" placeholder="Last name" class="" />
                    </div>
                </section>

                <section class=" ">

                    <p class=" text-neutral-20">Authentification</p>
                    <div class="flex gap-3 w-full max-w-[712px] relative">
                        <InputField v-model="user.phone" class="" name="phone" placeholder="numero de téléphone" />
                    </div>
                </section>
                <section class=" ">

                    <p class="flex-1 text-neutral-20">Adresse électronique</p>
                    <CustomEmailInputField v-model="userData.email" name="email" placeholder="Email" />
                </section>

                <section class=" ">

                    <p class="flex-1 text-neutral-20">Date de naissance</p>
                    <div class="flex w-full flex-col">
                        <CommonDatePicker name="birthdate" v-model="birthDateModel"></CommonDatePicker>
                    </div>

                </section>

                <section class=" ">
                    <p class="flex-1 text-neutral-20">Choix du role</p>

                    <CommonSelect disabled v-model="userData.role_id" border-color="border-neutral-60"
                        default-width="w-full" class="w-full" title="Role" :elements="[{ name: 'super_admin', value: 'e464995c-43fc-416a-987d-067647883b84' }, { name: 'user', value: 'dbde9970-19c8-4555-9984-96c3ce0169ab' },
                        { name: 'support', value: 'a846add0-099e-4aa9-80cf-7a41a1a8e85c' }]">
                    </CommonSelect>

                </section>


                <section class=" ">
                    <p class="flex-1 text-neutral-20 ">Mot de passe</p>
                    <div class="flex gap-3 w-full ">
                        <InputField v-model="userData.password" name="password" placeholder="Mot de passe" class="" />
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
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { useUpdateUserMutation } from '@/composables/queries/useUserQueries';
import { AppRoute } from '@/constants/app-route';
import { convertDateToDateValue } from '@/lib/utils';
import router from '@/router';
import { userToAdminSchema } from '@/services/users/user-schema';
import type { UserResponse } from '@/services/users/user-type';
import { type DateValue } from '@internationalized/date';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { onBeforeMount, ref, type PropType } from 'vue';
import { useToast } from 'vue-toastification';
import CommonDatePicker from '../common/commonDatePicker.vue';
import { Input } from '../ui/input';
import CustomEmailInputField from '../vee-validate/CustomEmailInputField.vue';
import InputField from '../vee-validate/InputField.vue';
import type { RoleResponse } from '@/services/admin/admin-type';
import { fetchRoles } from '@/services/admin/admin-service';
import { storeToRefs } from 'pinia';
import { useCountryStore } from '@/stores/useCountryStore';
import CommonSelect from '../common/commonSelect.vue';

const open = ref(false);
const toast = useToast();
const { currentCountry } = storeToRefs(useCountryStore());
const { user } = defineProps({
    user: {
        type: Object as PropType<UserResponse>,
        required: true
    }
})

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(userToAdminSchema)
});

const { mutateAsync: updateUser } = useUpdateUserMutation(user.id)
const userData = ref({ ...user, password: undefined });

const [birthDateModel, birthDateModifiers] = defineModel<DateValue | undefined>(' birthDate', {
    set(value) {
        userData.value.birthdate = `${value?.year}-${value?.month != null && value?.month < 10 ? `0${value?.month}` : value?.month}-${value?.day != null && value?.day < 10 ? `0${value?.day}` : value?.day}`
        return value
    },
    get(v) {
        if (v === undefined) {
            const defaultDate = convertDateToDateValue(userData.value.birthdate);
            return defaultDate;
        }
        return v;
    },
    default: undefined,
})


const updateUserToAdminHandler = async () => {
    const payload = {
        firstname: userData.value.firstname,
        lastname: userData.value.lastname,
        birthdate: userData.value.birthdate,
        email: userData.value.email,
        password: userData.value.password,
        avatar: userData.value.avatar,
        verification_status: "unverified",
        phone: userData.value.phone,
        phone_verified: true,
        email_verified: true,
        role_id: userData.value.role_id,
        country_id: currentCountry.value?.id,
        accepted_tos: false,
        referred_by: undefined,
        referral_code: undefined,
        withdrawn_amount: 0,
        reward_amount: 0,
        is_superuser: false,
        active: userData.value.active,
        pin_code: "",
        has_pin: true,
        one_signal_subs_id: ""
    }
    await updateUser({
        ...payload
    });

    open.value = false;
    await router.push({ name: AppRoute.ADMINISTRATION.name });
    toast.success("L'utilisateur a bien été ajouté en tant qu'administrateur");

};



const onSubmit = handleSubmit(async ({ lastname }) => {
    await updateUserToAdminHandler();
    resetForm();
});


// onBeforeMount(async () => {

//     await fetchRoles().then((res) => {
//         rolesData.value = res!;
//         // userState.role_id = authUser.user.value?.role_id
//     })

// });

</script>