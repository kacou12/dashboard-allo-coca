<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Ajout des settings"></CommonButton>
        </template>

        <template #title>
            <span>Ajout du setting</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <!-- First section  -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Frais</p>
                    <div class="flex gap-3 w-full relative">
                        <Input class="pr-14" id="fees" v-model.number="settingsState.fees" placeholder="25" required />
                        <span
                            class="absolute end-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                            %
                        </span>
                    </div>
                </section>


                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">limite quotidienne d'utilisateurs non-vérifié</p>
                    <Input class="pr-14" id="unverified_user_daily_limit"
                        v-model.number="settingsState.unverified_user_daily_limit" placeholder="63" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">limite mois utilisateur non vérifié</p>
                    <Input type="title" id="unverified_user_monthly_limit" placeholder="Frais"
                        v-model.number="settingsState.unverified_user_monthly_limit" class="" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">limite d'utilisateurs vérifiés par jour</p>
                    <Input type="title" id="verified_user_daily_limit" placeholder="56"
                        v-model.number="settingsState.verified_user_daily_limit" class="" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Limite mensuelle d'utilisateurs vérifiés</p>
                    <Input type="title" id="verified_user_monthly_limit" placeholder="56"
                        v-model.number="settingsState.verified_user_monthly_limit" class="" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Disponibilité des cartes cadeaux</p>
                    <CommonBigSwitch v-model="settingsState.giftcard_availability"></CommonBigSwitch>
                </section>




            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="createSettingsHandler" class="flex-1  text-sm rounded-lg bg-primary font-normal"
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
import { useCreateSettingsMutation } from '@/composables/queries/useSettingsQueries';
import type { SettingsRequest } from '@/services/settings/settings-type';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Input } from '../ui/input';
import CommonBigSwitch from '../common/commonBigSwitch.vue';

const open = ref(false);
const toast = useToast();

const { mutateAsync: createSettings } = useCreateSettingsMutation();


const settingsState = ref<SettingsRequest>(
    {
        fees: 0,
        international_fee: 0,
        unverified_user_daily_limit: 0,
        unverified_user_monthly_limit: 0,
        verified_user_daily_limit: 0,
        verified_user_monthly_limit: 0,
        giftcard_availability: false
    }
);

const createSettingsHandler = async () => {
    const payload = { ...settingsState.value };


    await createSettings(payload);
    settingsState.value = {
        fees: 0,
        international_fee: 0,
        unverified_user_daily_limit: 0,
        unverified_user_monthly_limit: 0,
        verified_user_daily_limit: 0,
        verified_user_monthly_limit: 0,
        giftcard_availability: false
    }
    open.value = false;
    toast.success("Les settings ont bien été ajoutées");

}


</script>