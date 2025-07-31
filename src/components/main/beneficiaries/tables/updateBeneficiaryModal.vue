<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <div class="cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.8204 11.1191C8.84443 11.1191 7.89038 10.8297 7.0789 10.2875C6.26741 9.74529 5.63494 8.97462 5.26145 8.07295C4.88796 7.17127 4.79024 6.1791 4.98064 5.22188C5.17105 4.26467 5.64102 3.38542 6.33113 2.6953C7.02124 2.00519 7.9005 1.53522 8.85771 1.34482C9.81492 1.15442 10.8071 1.25214 11.7088 1.62562C12.6104 1.99911 13.3811 2.63159 13.9233 3.44307C14.4656 4.25456 14.755 5.2086 14.755 6.18457C14.755 6.83259 14.6273 7.47426 14.3793 8.07295C14.1314 8.67164 13.7679 9.21562 13.3097 9.67383C12.8514 10.1321 12.3075 10.4955 11.7088 10.7435C11.1101 10.9915 10.4684 11.1191 9.8204 11.1191ZM9.8204 2.5463C9.10045 2.54459 8.39618 2.75651 7.79673 3.15525C7.19728 3.55399 6.72961 4.12161 6.45292 4.78626C6.17622 5.45092 6.10293 6.18272 6.24234 6.88905C6.38175 7.59537 6.72757 8.24446 7.23605 8.75414C7.74453 9.26383 8.39279 9.6112 9.09878 9.75229C9.80477 9.89337 10.5367 9.82183 11.2021 9.54671C11.8674 9.2716 12.4361 8.80528 12.8363 8.20678C13.2364 7.60828 13.45 6.90452 13.45 6.18457C13.4478 5.22183 13.0649 4.29905 12.3849 3.61748C11.705 2.93591 10.7831 2.55086 9.8204 2.5463ZM2.76854 18.2228C3.26978 15.25 6.30311 13.0377 9.8204 13.0377C10.4456 13.0369 11.0688 13.1064 11.6784 13.2451C11.7634 13.2702 11.8527 13.2776 11.9407 13.2668C12.0287 13.2561 12.1136 13.2274 12.1901 13.1825C12.2666 13.1376 12.333 13.0776 12.3853 13.006C12.4377 12.9344 12.4747 12.8529 12.4943 12.7664C12.5138 12.6799 12.5154 12.5903 12.499 12.5032C12.4825 12.4161 12.4484 12.3333 12.3986 12.2599C12.3489 12.1865 12.2846 12.1241 12.2098 12.0765C12.135 12.0289 12.0512 11.9972 11.9636 11.9833C11.2613 11.8171 10.5421 11.733 9.8204 11.7327C5.67225 11.7327 2.10311 14.4204 1.48953 18.0068C1.46443 18.1761 1.50637 18.3484 1.60644 18.4872C1.70651 18.6261 1.85681 18.7203 2.02533 18.75H2.13768C2.28757 18.7486 2.43236 18.6954 2.54739 18.5992C2.66241 18.5031 2.74057 18.3701 2.76854 18.2228ZM12.8192 18.0414C12.6482 18.0415 12.4789 18.0072 12.3215 17.9403C12.1641 17.8735 12.0218 17.7756 11.9031 17.6525C11.7679 17.5038 11.6693 17.3256 11.6152 17.132C11.5612 16.9384 11.5533 16.7349 11.592 16.5377L11.8513 15.3105C11.9164 15.0009 12.073 14.7179 12.3006 14.4981L15.2562 11.7327C15.4098 11.5926 15.5898 11.4845 15.7857 11.4148C15.9815 11.345 16.1893 11.315 16.3969 11.3265C16.8156 11.3528 17.2083 11.5384 17.4945 11.8451L18.0562 12.45C18.3517 12.7492 18.5175 13.1529 18.5175 13.5735C18.5175 13.994 18.3517 14.3977 18.0562 14.6969L15.1006 17.4537C14.8635 17.6768 14.5601 17.8163 14.2364 17.8512L12.992 18.0241L12.8192 18.0414ZM16.276 12.6315C16.2154 12.6296 16.1566 12.6513 16.1118 12.692L13.1908 15.4488C13.1567 15.4817 13.1328 15.5237 13.1216 15.5698L12.8624 16.8056L14.055 16.5722C14.1036 16.5667 14.1491 16.5455 14.1846 16.5117L17.1315 13.7549C17.1825 13.6979 17.2107 13.6241 17.2107 13.5475C17.2107 13.471 17.1825 13.3972 17.1315 13.3401L16.5611 12.7352C16.5325 12.7038 16.4978 12.6785 16.4592 12.6607C16.4206 12.6429 16.3789 12.633 16.3364 12.6315H16.276Z"
                        fill="#666666" />
                </svg>

            </div>
        </template>

        <template #title>
            <span>Modification du bénéficiaire</span>
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
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import type { RoleResponse } from '@/services/admin/admin-type';
import { userToAdminSchema } from '@/services/users/user-schema';
import { useCountryStore } from '@/stores/useCountryStore';
import { toTypedSchema } from '@vee-validate/zod';
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

const { beneficiary } = defineProps({
    beneficiary: {
        type: Object,
        required: true
    }
});

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(userToAdminSchema)
});

const userData = ref({
    fullName: beneficiary.first_name + ' ' + beneficiary.last_name,
    phone: beneficiary.phone,
    paymentMethod: beneficiary.payment_method,
    description: beneficiary.description
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