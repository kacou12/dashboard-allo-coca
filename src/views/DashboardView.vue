<template>
  <div class="px-4 w-full ">
    <!-- Titre du tableau de bord -->
    <header class="mb-6">
      <h1 class="text-xl font-bold font-merriweathersans">Tableau de bord</h1>
      <p class="text-sm text-[#808080]">Bienvenue, {{ fullName() }}</p>
    </header>


    <!-- wallet account section -->
    <BannerWallet :show-action-buttons="true"></BannerWallet>

    <section class="flex flex-col md:flex-row gap-2 md:items-center justify-between my-3">
      <div class="flex flex-wrap items-center justify-between gap-2">

        <p class="text-[18px]  font-semibold">Dernières Transactions</p>
        <div>
          <span class="text-xs font-medium px-[5px] py-[1px]  rounded-xl border text-[#633DA5] border-[#633DA5]"><span
              v-if="isFetched">{{ transactionsData!.total }}</span>
            Transactions</span>
        </div>
      </div>

      <div>

        <CustomButton @click="() => { router.push({ name: AppRoute.TRANSACTIONS_HISTORY.name }) }" type="outline">
          Voir tous
        </CustomButton>
      </div>
    </section>

    <!-- transaction filter -->
    <section class="flex xl:justify-between flex-col my-4">
      <section class="xl:flex xl:flex-wrap grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-2 "
        v-if="isFetchedProviders">
        <CommonSelect v-model="statusModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" class=" w-full"
          title="Filtre par statut" :elements="[
            { name: 'Filtre par statut', value: 'all' },
            { name: 'En attente', value: 'Pending' },
            { name: 'En cours', value: 'Processing' },
            { name: 'Echouée', value: 'Failed' },
            { name: 'Réussi', value: 'Successful' }]">
        </CommonSelect>


        <CommonSelect v-model="limitModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" title="Lignes par page"
          :elements="[{ name: 'Lignes par page', value: '10' }, { name: '20', value: '20' }, { name: '50', value: '50' }, { name: '100', value: '100' }]">
        </CommonSelect>

        <CommonSelect v-model="typeModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'"
          title="Filtre par type de transaction" :elements="[
            { name: 'Filtre par type de transaction', value: 'all' },
            { name: 'Achat de gift card', value: 'giftcard' },
            // { name: 'Award', value: 'award' },
            { name: 'Transfert d\'argent', value: 'trensfert_argent' }]">
        </CommonSelect>


        <CommonSelect v-model="beneficiaryProviderModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'"
          title="Filtre par reseau beneficiaire"
          :elements="[{ name: 'Filtre par reseau beneficiaire', value: 'all' }, ...providersData!.items.map((provider) => ({ name: provider.name, value: provider.id }))]">
        </CommonSelect>


      </section>
      <section class="xl:w-[19%] my-5 ">
        <SearchBar :is-loading="isFetching && filters.q !== undefined" v-model="filters.q"></SearchBar>
      </section>
    </section>

    <!-- Transactions table -->
    <section class=" w-full ">

      <CommonDataTable :page-size="limitModel ? parseInt(limitModel) : 10" ref="my-table" :default-page="filters.page"
        :total="transactionsData?.total ?? 0" :columns="recentsTransactionsColumns"
        :data="transactionsData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage" @next-page="nextPage">
      </CommonDataTable>
    </section>

  </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import { recentsTransactionsColumns } from '@/components/main/recentTransactions/tables/TransactionsColumn';
import SearchBar from '@/components/users/SearchBar.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoaderStore } from "@/stores/useLoaderStore";
import { useCountryFiltersQuery } from '@/composables/queries/useCountryQueries';
import { useProvidersFiltersQuery } from '@/composables/queries/useProviderQueries';
import { useTransactionsFiltersQuery } from '@/composables/queries/useTransactionQueries';
import { useTransactionFiltersStore } from '@/stores/useTransactionFilterStore';
import { useWindowSize } from '@vueuse/core';
import { onBeforeMount, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CustomButton from '@/components/buttons/customButton.vue';
import BannerWallet from '@/components/bannerWallet.vue';
import { AppRoute } from '@/constants/app-route';

const { user, fullName } = useAuthStore();


const { data: transactionsData, isFetched, refetch, isFetching } = useTransactionsFiltersQuery();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();
const { isFetched: isFetchedCounty, data: countriesData, isSuccess } = useCountryFiltersQuery();


const filters = useTransactionFiltersStore()
// const { page } = storeToRefs(useTransactionFiltersStore())

const { data: providersData, isFetched: isFetchedProviders, refetch: refetchProviders } = useProvidersFiltersQuery(false);

const route = useRoute();
const router = useRouter();
const { width, height } = useWindowSize()



const tableRef = useTemplateRef('my-table')

onBeforeMount(async () => {

  await refetchProviders();

})

const [statusModel,] = defineModel('status', {
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

const [beneficiaryProviderModel, beneficiaryProviderModifiers] = defineModel('beneficiaryProvider', {
  set(value: string) {
    if (value == "all") {
      filters.beneficiary_provider = '';
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
const [beneficiaryCountryProviderModel, beneficiaryCountyProviderModifiers] = defineModel('beneficiaryCountryProvider', {
  set(value: string) {
    if (value == "all") {
      filters.beneficiary_country_iso_code = '';
    } else {
      filters.beneficiary_country_iso_code = value;
    }
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
  // refetch();

}
const goToPage = async (page: number) => {

  filters.page = page
  startLoadingSkeleton();
  // refetch();


}

const prevPage = async () => {

  filters.page = filters.page - 1;
  startLoadingSkeleton();
  refetch();

}


</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>