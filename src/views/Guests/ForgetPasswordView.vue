<template>
    <!-- Mot de passe oublié lost-password-->
    <div class="flex items-center justify-center h-screen p-8
    bg-[url('/src/assets/images/bg-forget-password.jpg')]">
        <div class="bg-white p-8 rounded-xl shadow-md border w-full max-w-[422px]">
            <!-- Icône ou alerte -->
            <div class="flex justify-center mb-6">
                <div class="w-12 h-12 bg-neutral-80 text-neutral-10 rounded-full flex items-center justify-center">
                    <!-- <span class="text-2xl font-bold">!</span>
                      -->
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.4618 6.97664L14 15.75L12.5381 6.97664C12.5031 6.7645 12.5146 6.54727 12.5719 6.34004C12.6292 6.1328 12.731 5.94052 12.8701 5.77655C13.0092 5.61258 13.1823 5.48085 13.3774 5.3905C13.5725 5.30015 13.785 5.25336 14 5.25336C14.215 5.25336 14.4274 5.30015 14.6226 5.3905C14.8177 5.48085 14.9908 5.61258 15.1299 5.77655C15.269 5.94052 15.3707 6.1328 15.428 6.34004C15.4853 6.54727 15.4969 6.7645 15.4618 6.97664Z"
                            stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M14 23.3333C14.6444 23.3333 15.1667 22.811 15.1667 22.1667C15.1667 21.5223 14.6444 21 14 21C13.3557 21 12.8334 21.5223 12.8334 22.1667C12.8334 22.811 13.3557 23.3333 14 23.3333Z"
                            stroke="#1A1A1A" stroke-width="2" />
                    </svg>

                </div>
            </div>
            <!-- Titre et sous-titre -->
            <h1 class="text-[28px] font-bold text-center mb-2 font-merriweathersans">Mot de passe oublié ?</h1>
            <p class="text-[#666666] text-center mb-6 text-[16px] font-publicsans">
                Pas de problème, nous vous enverrons des instructions de réinitialisation.
            </p>
            <!-- Formulaire -->
            <form @submit.prevent="onSubmit">
                <div class="mb-4">
                    <label for="email"
                        class="block text-neutral-20 font-medium mb-1 text-sm font-publicsans">Email</label>
                    <!-- <input type="email" id="email" v-model="email" placeholder="Enter votre email"
                        class="shadow appearance-none border border-neutral-50 rounded w-full py-2 px-3 text-neutral-20 placeholder:text-neutral-40 leading-tight focus:outline-none focus:ring focus:ring-primary-40"
                        required /> -->
                    <InputField name="email"" type=" email" v-model="email" id="email" placeholder="Entrer votre email"
                        class="w-full" required />
                </div>
                <!-- <button type="submit"
                    class="bg-primary-40 text-white font-normal py-2 px-4 rounded w-full hover:bg-primary-50 focus:outline-none focus:ring focus:ring-primary-60">
                    Demande de réinitialisation
                </button> -->

                <CommonButton class="w-full" :padding-y="5" type="default" title="Demande de réinitialisation">
                </CommonButton>

            </form>
            <!-- Lien retour -->
            <div class="text-center mt-3">
                <CommonButton class="" type="link" title="Retour à la connexion"
                    @click.prevent="$router.push({ name: AppRoute.LOGIN.name })">
                </CommonButton>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
import CommonButton from "@/components/buttons/commonButton.vue";
import InputField from "@/components/vee-validate/InputField.vue";
import { useForgetPasswordMutation } from "@/composables/queries/useAuthQueries";
import { AppRoute } from "@/constants/app-route";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { z } from "zod";

const toast = useToast();

const email = ref("");
const router = useRouter()
const { startLoading, stopLoading } = useLoaderStore();
const { setEmailToResetingPassword } = useAuthStore();

const forgetPasswordSchema = z.object({
    email: z
        .string({ required_error: "L'email est obligatoire" })
        .email({ message: "L'email n'est pas valide" })
        .trim(),
})

const { mutateAsync: forgetPassword } = useForgetPasswordMutation();


const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(forgetPasswordSchema)
});

const forgetPasswordHandler = async () => {
    try {
        startLoading()
        await forgetPassword({
            email: email.value.toLowerCase()
        });

        // toast.success("Le mot de passe a été mis à jour avec succès");

        setEmailToResetingPassword(email.value)
        router.push({ name: AppRoute.VERIFY_EMAIL.name })
        resetForm();


    } catch (err) {

    }
    finally {
        stopLoading()
    }

};


const onSubmit = handleSubmit(async ({ }) => {
    await forgetPasswordHandler();

});





</script>

<style scoped>
/* Styles personnalisés si nécessaires */
</style>