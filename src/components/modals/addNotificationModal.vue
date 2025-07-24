<template>

    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Créer une notification">
            </CommonButton>
        </template>

        <template #title>
            <span>Nouvelle notification</span>
        </template>

        <template #content>

            <!-- First section  -->
            <section class="space-y-2">
                <p class="text-sm text-neutral-20">Titre de la notification</p>
                <!-- <Input type="text" id="title" placeholder="Titre" v-model="notificationState.title" class=""
                              required /> -->
                <InputField v-model="notificationState.title" placeholder="Titre" name="title" />
            </section>

            <section class="space-y-2">
                <p class="text-sm text-neutral-20">Message principal</p>
                <!-- <Textarea v-model="notificationState.message" placeholder="Message de la notification"></Textarea> -->
                <TextareaField v-model="notificationState.message" placeholder="Message" name="message" />
            </section>

            <section class="space-y-2">
                <p class="flex-1 text-neutral-20">Activer la notification</p>

                <div class="flex gap-3 w-full max-w-[512px] relative">
                    <CommonSwitch v-model="notificationState.show_to_users"></CommonSwitch>
                </div>
            </section>

        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1 text-sm rounded-lg bg-primary font-normal" variant="default">
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
import { useCreateNotificationMutation } from '@/composables/queries/useNotificationQueries';
import type { NotificationRequest } from '@/services/notifications/notification-type';
import { useCountryStore } from '@/stores/useCountryStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import CommonSwitch from '../common/commonSwitch.vue';

import InputField from '@/components/vee-validate/InputField.vue';
import { notificationSchema } from '@/services/notifications/notification-schema';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import TextareaField from '../vee-validate/TextareaField.vue';
import { watch } from 'vue';

const open = ref(false);
const toast = useToast();


const { currentCountry } = storeToRefs(useCountryStore());


const createNotification = async () => {
    const testCountry = currentCountry.value;
    const test = { ...notificationState.value };
    test.countries = [currentCountry.value!.id];


    await addNotificationHandler(test);
    open.value = false;
    toast.success("La notification a bien été ajoutée");

}


const { mutateAsync: addNotificationHandler } = useCreateNotificationMutation();

const notificationState = ref<NotificationRequest>(
    {
        message: "",
        title: "",
        show_to_users: true,
        countries: []
    }
);

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(notificationSchema)
});

const onSubmit = handleSubmit(async ({ title, message }) => {
    // alert("submit")
    // console.log("submit", email, password);
    await createNotification();
    resetForm();
});


watch(notificationState.value, (n, o) => {
    // console.log('====================================');
    // console.log(n);
    // console.log('====================================');
})






</script>