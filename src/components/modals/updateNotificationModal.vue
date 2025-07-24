<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Modifier"></CommonButton>
        </template>

        <template #title>
            <span>Modification de la notification</span>
        </template>
        <template #content>

            <div class="space-y-3">
                <!-- First section  -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Titre de la notification</p>
                    <InputField v-model="notificationState.title" placeholder="Titre" name="title" />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Message principalt</p>
                    <TextareaField v-model="notificationState.message" placeholder="Message" name="message" />

                </section>
                <!-- <section class="space-y-2">
                    <p class="flex-1 text-neutral-20">Activer la notification</p>

                    <div class="flex gap-3 w-full max-w-[512px] relative">
                        <CommonSwitch v-model="notificationState.show_to_users"></CommonSwitch>
                    </div>
                </section> -->

            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1  text-sm rounded-lg bg-primary font-normal" variant="default">
                    Modifier
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { useUpdateNotificationMutation } from '@/composables/queries/useNotificationQueries';
import type { NotificationResponse, NotificationUpdatePayload } from '@/services/notifications/notification-type';
import { useCountryStore } from '@/stores/useCountryStore';
import { storeToRefs } from 'pinia';
import { ref, type PropType } from 'vue';
import { useToast } from 'vue-toastification';
import InputField from '../vee-validate/InputField.vue';


import TextareaField from '@/components/vee-validate/TextareaField.vue';
import { notificationSchema } from '@/services/notifications/notification-schema';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

const { notification } = defineProps({
    notification: {
        type: Object as PropType<NotificationResponse>,
        required: true
    }
})

const open = ref(false);
const toast = useToast();
const { currentCountry } = storeToRefs(useCountryStore());
const { mutateAsync: updateNotificationHandler } = useUpdateNotificationMutation(notification.id);

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(notificationSchema)
});

const notificationState = ref<NotificationUpdatePayload>(
    {
        message: notification.message,
        title: notification.title,
        // show_to_users: notification.show_to_users,
        countries: []
    }
);

const updateNotification = async () => {

    const newNotificationState = { ...notificationState.value };
    newNotificationState.countries = [currentCountry.value!.id];


    await updateNotificationHandler(newNotificationState);
    open.value = false;
    toast.success("La notification a bien été modifiée");

}



const onSubmit = handleSubmit(({ title, message }) => {
    // alert("submit")
    // console.log("submit", email, password);
    updateNotification();
});


</script>