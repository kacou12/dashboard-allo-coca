<template>

    <!-- <form @submit.prevent="$router.push({ name: 'dashboard' })"> -->
    <form @submit.prevent="onSubmit">
        <div class="mb-4">
            <label class="block text-neutral-20 text-sm font-medium mb-2" for="email">
                Email
            </label>
            <!-- <Input type="email" id="email" v-model="email" placeholder="Enter votre email"
                class="shadow appearance-none border  rounded-lg w-full py-2 px-3 text-neutral-20 placeholder:text-neutral-40 leading-tight focus:outline-none focus:ring focus:ring-primary-40 h-[44px] border-neutral-60"
                required /> -->
            <InputField v-model="email" placeholder="Entrer votre email sendchap" name="email" />
        </div>
        <div class=" ">
            <label class="block text-neutral-20 text-sm font-medium mb-2" for="password">
                Mot de passe
            </label>
            <!-- <div class="relative">
                <Input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                    placeholder="Mot de passe"
                    class="rounded-lg shadow appearance-none border   w-full py-2 px-3 text-neutral-20 placeholder:text-neutral-40 leading-tight focus:outline-none focus:ring focus:ring-primary-40  h-[44px] border-neutral-60"
                    required />
                <button type="button" class="absolute inset-y-0 right-2 text-neutral-20"
                    @click="togglePasswordVisibility">
                    <span v-if="showPassword">👁️</span>
                    <span v-else>👁️‍🗨️</span>
                </button>
            </div> -->
            <PasswordField v-model="password" placeholder="Mot de passe" name="password" />
        </div>
        <!-- <RouterLink :to="{ name: AppRoute.LOST_PASSWORD.name }"
            class=" text-primary text-sm cursor-pointer font-medium hover:underline text-[15px]">
            Mot de passe oublier
        </RouterLink> -->
        <div class="mb-6 mt-6 flex items-center">
            <input type="checkbox" id="rememberMe" v-model="rememberMe"
                class="mr-2 rounded text-primary-40 focus:ring-primary-40" />
            <label for="rememberMe" class="text-[#1A1A1A] text-sm">
                Se souvenir pendant 30 jours
            </label>
        </div>


        <CustomButton :is-loading="loading"
            class="hover:bg-primary-40  font-worksans rounded-lg text-white font-normal   text-[15px] py-[22px] px-4  w-full   focus:outline-none focus:ring focus:ring-primary-60">
            Se connecter
        </CustomButton>
    </form>
</template>

<script setup lang="ts">

import { AppRoute } from '@/constants/app-route';
import { loginSchema } from '@/services/auth/auth-schema';
import { fetchAdminPoliciesByRoleId, loginWithCredential } from '@/services/auth/auth-service';
import type { LoginForm } from '@/services/auth/auth-type';
import { useMutation } from '@tanstack/vue-query';

import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import CustomButton from '../buttons/customButton.vue';

import InputField from '@/components/vee-validate/InputField.vue';
import PasswordField from '@/components/vee-validate/PasswordField.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useCountryStore } from '@/stores/useCountryStore';


const rememberMe = ref(false)

// const password = ref(import.meta.env.PROD ? '' : 'e4zJNfZx');
// const email = ref(import.meta.env.PROD ? '' : 'jwt@sendchap.ci');

const password = ref(import.meta.env.PROD ? '' : 'WA4VENEx');
const email = ref(import.meta.env.PROD ? '' : 'admin@sendchap.ci');


// const password = ref(import.meta.env.PROD ? '' : '8YpQItTa');
// const email = ref(import.meta.env.PROD ? '' : 'yann@sendchap.ci');

// const password = ref();
// const email = ref();

onMounted(() => {
    // console.log('====================================');
    // console.log("mode: ", import.meta.env.PROD);
    // console.log('====================================');
})



const route = useRoute();
const router = useRouter();
const { setUser, setAdminPolicies } = useAuthStore();
const toast = useToast();
const { setCurrentCountry } = useCountryStore();

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(loginSchema)
});

const {
    isPending: loading,
    isError,
    error,
    mutate,
    mutateAsync
} = useMutation({
    mutationFn: (credential: LoginForm) => loginWithCredential(credential),
    onSuccess: async (response) => {
        if (response) {
            // const roles = await fetchAdminPoliciesByRoleId(response.data!.user.role.id);
            setUser(response.data!.user);
            // setAdminPolicies(roles!);

            router.push({ name: AppRoute.DASHBOARD.name, replace: true }).then(() => {

                toast.success(`Welcome ${response.data!.user.firstname}!`);
            });

        }
    },

});

const onSubmit = handleSubmit(({ email, password }) => {
    // alert("submit")
    // console.log("submit", email, password);
    mutate({ email, password });
});



</script>

<style scoped></style>