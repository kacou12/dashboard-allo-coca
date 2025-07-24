<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Ajouter un provider"></CommonButton>
        </template>

        <template #title>
            <span>Nouveau provider</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <!-- First section  -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20"></p>
                    <Input type="title" id="title" placeholder="nom du provider" v-model="providerState.name" class=""
                        required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Lien de l'image du provider</p>
                    <Input v-model="providerState.image_url" placeholder="http://..." />


                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Choix des aggregateurs de collecte (cash out)</p>
                    <CommonMultiselect v-if="isFetched" v-model="providerState.cashout_issuer_used!"
                        :options="issuersData!.items.map((issuer) => ({ label: issuer.name, value: issuer.id }))"
                        placeholder="Choix des aggregateurs" :animation="0.5" :max-count="2" variant="default">
                    </CommonMultiselect>
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Choix des aggregateurs de transfert d'argent (cash in)</p>
                    <CommonMultiselect v-if="isFetched" v-model="providerState.cashin_issuer_used!"
                        :options="issuersData!.items.map((issuer) => ({ label: issuer.name, value: issuer.id }))"
                        placeholder="Choix des aggregateurs" :animation="0.5" :max-count="2" variant="default">
                    </CommonMultiselect>
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Instructions</p>
                    <Input v-model="providerState.instruction" placeholder="#150# " />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Type de validation</p>
                    <CommonSelect v-model="providerState.validation_type" border-color="border-neutral-60"
                        default-width="w-full" class="w-full" title="Type de validation"
                        :elements="[{ name: 'Link', value: 'link' }, { name: 'OTP', value: 'otp' }, { name: 'USSD', value: 'ussd' }]">
                    </CommonSelect>
                </section>
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Extras</p>

                    <ManageProviderExtras @update:items="updateItems" :extras="providerState.extra" />

                </section>


            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="createProviderHandler" class="flex-1  text-sm rounded-lg bg-primary font-normal"
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
import { useCreateProviderMutation } from '@/composables/queries/useProviderQueries';
import type { ProviderRequest } from '@/services/providers/provider-type';
import { useCountryStore } from '@/stores/useCountryStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Input } from '../ui/input';
import CommonSelect from '../common/commonSelect.vue';
import ManageProviderExtras from '../main/providers/manageProviderExtras.vue';
import CommonMultiselect from '../common/commonMultiselect.vue';
import { useIssuersFiltersQuery } from '@/composables/queries/useIssuerQueries';

const open = ref(false);
const toast = useToast();
const { currentCountry } = storeToRefs(useCountryStore());

const { mutateAsync: createProvider } = useCreateProviderMutation();

const { data: issuersData, isFetched } = useIssuersFiltersQuery(100);

const updateItems = (items: string[]) => {
    providerState.value.extra = items;
}


const providerState = ref<ProviderRequest>(
    {
        country_id: "",
        image_url: "",
        name: "",
        extra: [],
        instruction: "",
        validation_type: undefined,
        cashin_issuer_used: [],
        cashout_issuer_used: []
    }
);

const createProviderHandler = async () => {
    const payload = { ...providerState.value };
    payload.country_id = currentCountry.value!.id;


    await createProvider(payload);
    providerState.value = {
        country_id: "",
        image_url: "",
        name: "",
        extra: [],
        instruction: "",
        validation_type: undefined
    }
    open.value = false;
    toast.success("La notification a bien été ajoutée");

}


</script>