<template>
    <div class="px-4 bg-white">


        <header class="flex justify-between items-center mb-14">
            <CommonBreadcrumb
                :links="[{ title: 'Transactions récentes', route: AppRoute.TRANSACTIONS_HISTORY.name }, { title: `${userData?.firstname} ${userData?.lastname}`, route: AppRoute.TRANSACTIONS_HISTORY_USER.name, params: { 'id': route.params.id! as string } }]">
            </CommonBreadcrumb>
        </header>

        <section class="my-7 ">
            <div class="flex items-center gap-2 font-worksans cursor-pointer">

                <img class="w-11 h-11 rounded-full" v-if="isFetchedUser" :src="defaultImage" alt="User" />
                <section class="flex flex-col gap-1" v-if="isFetchedUser">
                    <article class="flex gap-3 items-center">
                        <p class="text-sm text-neutral-10 font-[700] text-[20px] font-merriweathersans">{{
                            userData?.firstname }} {{ userData?.lastname }}
                        </p>
                        <div>
                            <span v-if="isFetchedTransactions"
                                class="text-xs font-medium px-[5px] py-[1px]  rounded-xl border text-[#633DA5] border-[#633DA5]">{{
                                    transactionsData?.total }} Transactions</span>
                        </div>
                    </article>
                    <p class="text-sm text-neutral-20 font-worksans">{{ userData?.phone }}</p>
                </section>


            </div>
        </section>



        <!-- transaction filter -->
        <div class="flex xl:justify-between flex-col  my-4 ">
            <section class="xl:flex grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-2 ">
                <CommonSelect v-model="statusModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" class=" w-full"
                    title="Filtre par statut" :elements="[
                        { name: 'Tout', value: 'all' },
                        { name: 'En attente', value: 'Pending' },
                        { name: 'En cours', value: 'Processing' },
                        { name: 'Echouée', value: 'Failed' },
                        { name: 'Réussi', value: 'Successful' }]">
                </CommonSelect>

                <CommonSelect v-model="limitModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'"
                    title="Lignes par page"
                    :elements="[{ name: 'Lignes par page', value: '10' }, { name: '20', value: '20' }, { name: '50', value: '50' }, { name: '100', value: '100' }]">
                </CommonSelect>
                <CommonSelect v-model="typeModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'"
                    title="Filtre par type de transaction" :elements="[
                        { name: 'Tout', value: 'all' },
                        { name: 'Achat de gift card', value: 'giftcard' },
                        { name: 'Award', value: 'award' },
                        { name: 'Transfert d\'argent', value: 'trensfert_argent' }]">
                </CommonSelect>
                <CommonSelect v-if="isFetchedProviders" v-model="payerProviderModel"
                    :default-width="width >= 1366 ? 'w-fit' : 'w-full'" title="Filtre par reseau debité"
                    :elements="providersData!.items.map((provider) => ({ name: provider.name, value: provider.id }))">
                </CommonSelect>
                <CommonSelect v-if="isFetchedProviders" v-model="beneficiaryProviderModel"
                    :default-width="width >= 1366 ? 'w-fit' : 'w-full'" title="Filtre par reseau beneficiaire"
                    :elements="providersData!.items.map((provider) => ({ name: provider.name, value: provider.id }))">
                </CommonSelect>
            </section>
            <section class="xl:w-[19%] my-5 ">
                <SearchBar :is-loading="isFetching && filters.q !== undefined" v-model="filters.q"></SearchBar>
            </section>
        </div>

        <!-- Transactions table -->
        <CommonDataTable :page-size="limitModel ? parseInt(limitModel) : 10" :default-page="filters.page"
            :total="transactionsData?.total ?? 0" :columns="userRecentsTransactionsColumn"
            :data="transactionsData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage" @next-page="nextPage">
        </CommonDataTable>


    </div>
</template>

<script setup lang="ts">
import CommonBreadcrumb from '@/components/common/commonBreadcrumb.vue';
import CommonDataTable from '@/components/common/commonDataTable.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import { userRecentsTransactionsColumn } from '@/components/main/recentTransactions/tables/userTransactionsColumn';
import SearchBar from '@/components/users/SearchBar.vue';
import { useProvidersFiltersQuery } from '@/composables/queries/useProviderQueries';
import { useTransactionsFiltersQuery } from '@/composables/queries/useTransactionQueries';
import { useUserQuery } from '@/composables/queries/useUserQueries';
import { AppRoute } from '@/constants/app-route';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useTransactionFiltersStore } from '@/stores/useTransactionFilterStore';
import { useWindowSize } from '@vueuse/core';
import { computed, onBeforeMount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { data: transactionsData, isFetched: isFetchedTransactions, isLoading, isSuccess, isFetching } = useTransactionsFiltersQuery(route.params.id as string);
const { data: userData, isFetched: isFetchedUser, refetch: refetchUser } = useUserQuery(route.params.id as string);
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();
const filters = useTransactionFiltersStore()

const { data: providersData, isFetched: isFetchedProviders, refetch: refetchProviders } = useProvidersFiltersQuery(false);



const { width, height } = useWindowSize()

onBeforeMount(async () => {
    await Promise.all([
        refetchProviders(),
        refetchUser()
    ]);

})

const defaultImage = computed(() => {
    if (isFetchedUser) {

        return new URL(`/src/assets/images/avatar/${userData.value!.avatar.split(".")[0]}.png`, import.meta.url).href;
    }
    return '';
});

const [statusModel, statusModifiers] = defineModel('status', {
    set(value: string) {
        if (value == "all") {
            filters.status = undefined;
        } else {
            filters.status = value;
        }
        return value
    },
    //   get(v) {
    //     return v;
    //   },
    default: undefined,
})
const [typeModel, typeModifiers] = defineModel('type', {
    set(value: string) {
        if (value == "all") {
            filters.type = undefined;
        } else {
            filters.type = value;
        }
        return value
    },
    //   get(v) {
    //     return v;
    //   },
    default: undefined,
})
const [payerProviderModel, payerProviderModifiers] = defineModel('payerProvider', {
    set(value: string) {
        if (value == "all") {
            filters.type = undefined;
        } else {
            filters.payer_provider = value;
        }
        return value
    },
    //   get(v) {
    //     return v;
    //   },
    default: undefined,
})
const [beneficiaryProviderModel, beneficiaryProviderModifiers] = defineModel('beneficiaryProvider', {
    set(value: string) {
        if (value == "all") {
            filters.beneficiary_provider = undefined;
        } else {
            filters.beneficiary_provider = value;
        }
        return value
    },
    //   get(v) {
    //     return v;
    //   },
    default: undefined,
})

const [limitModel, limitModifiers] = defineModel('limitProvider', {
    type: String,

    set(value: string) {
        filters.limit = parseInt(value);
        return value
    },
    //   get(v) {
    //     return v;
    //   },
    default: undefined,
})


const nextPage = async () => {
    filters.page = filters.page + 1;
    startLoadingSkeleton();

}
const goToPage = async (page: number) => {

    filters.page = page
    startLoadingSkeleton();

}

const prevPage = async () => {

    filters.page = filters.page - 1;
    startLoadingSkeleton();

}

</script>

<style scoped></style>