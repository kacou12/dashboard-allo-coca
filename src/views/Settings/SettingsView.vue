<template>
    <div class="px-4 bg-white">
        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">
                <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Vos settings
                    Sendchap</h1>
                <!-- <p class="text-neutral-30 text-sm font-normal">Commissions facturées aux utilisateurs et aux partenaires
                </p> -->
            </div>

            <div>
                <notification-icon></notification-icon>
            </div>
        </header>


        <div class="flex gap-4 mb-5 justify-end">
            <div>

                <AddSettingsModal v-if="!settingsData"></AddSettingsModal>
            </div>
            <div>

                <UpdateSettingsModal :settings="settingsData" v-if="settingsData"></UpdateSettingsModal>
            </div>


        </div>

        <main v-if="isFetched">

            <section v-if="settingsData" class="grid grid-cols-3 w-full gap-5 mb-5">
                <CommonMiniCard :value="settingsData!.fees.toString()"
                    :decimal-places="Number.isInteger(settingsData!.fees) ? undefined : settingsData!.fees.toString().split('.')[1].length"
                    :show-percentage-change="true" title="Frais" :show-chart="false" :data="[]">
                </CommonMiniCard>
                <CommonMiniCard :value="settingsData!.international_fee.toString()"
                    :decimal-places="Number.isInteger(settingsData!.international_fee) ? undefined : settingsData!.international_fee.toString().split('.')[1].length"
                    :show-percentage-change="true" title="Frais internationaux" :show-chart="false" :data="[]">
                </CommonMiniCard>

                <CommonMiniCard :value="settingsData!.unverified_user_daily_limit"
                    title="limite quotidienne d'utilisateurs non-vérifié" :show-chart="false" :data="[]">
                </CommonMiniCard>

                <CommonMiniCard :value="settingsData!.unverified_user_monthly_limit"
                    title="limite mois utilisateur non vérifié" :show-chart="false" :data="[]">
                </CommonMiniCard>

                <CommonMiniCard :value="settingsData!.verified_user_daily_limit"
                    title="limite d'utilisateurs vérifiés par jour" :show-chart="false" :data="[]">
                </CommonMiniCard>

                <CommonMiniCard :value="settingsData!.verified_user_monthly_limit"
                    title="Limite mensuelle d'utilisateurs vérifiés" :show-chart="false" :data="[]">
                </CommonMiniCard>
                <CustomMiniCard :value="settingsData!.giftcard_availability ? 'Oui' : 'Non'"
                    title="Disponibilité des cartes cadeaux" :show-chart="false" :data="[]">
                </CustomMiniCard>
            </section>
            <section v-else class="h-[500px]  flex justify-center items-center">

                <p class="text-sm text-neutral-20 ">Aucun settings veuillez en ajouter</p>
            </section>

        </main>
        <section v-else class="grid grid-cols-3 w-full gap-5 mb-3">
            <div v-for="i in 5" :key="i" class="animate-pulse bg-gray-200 h-24 rounded"></div>
        </section>




    </div>
</template>

<script setup lang="ts">
import CommonMiniCard from '@/components/common/commonMiniCard.vue';
import CustomMiniCard from '@/components/common/customMiniCard.vue';
import AddSettingsModal from '@/components/modals/addSettingsModal.vue';
import UpdateSettingsModal from '@/components/modals/updateSettingsModal.vue';
import notificationIcon from '@/components/svg/notificationIcon.vue';
import { useSettingsQuery } from '@/composables/queries/useSettingsQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { ref } from 'vue';

const { data: settingsData, isFetched } = useSettingsQuery()
const { startLoadingSkeleton, stopLoadingSkeleton, } = useLoaderStore();

var precision = (12.3456 + "").split(".")[1].length;
// const { isLoadingSkeleton } = storeToRefs(useLoaderStore());


// const settingsData = ref<SettingsResponse>();

// o
</script>

<style scoped></style>