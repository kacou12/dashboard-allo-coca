<template>
    <div class="px-4 ">

        <header class=" flex items-center gap-2 text-white justify-between">
            <section class="spacep-y-1">

                <h1 class="text-clamp-md font-semibold font-merriweathersans">Equipe d'administration</h1>
                <p class="text-sm text-white">{{ adminsData?.total ?? 0 }} personne(s) trouvé(s)</p>
            </section>
            <div>
                <AddAdminAccountModal></AddAdminAccountModal>
            </div>
        </header>

        <section class="flex flex-col sm:flex-row justify-between mb-4 mt-5">
            <div class="flex gap-3">

                <CommonSelect title="Trier par"
                    :elements="[{ name: 'Tout', value: 'all' }, { name: 'En cours', value: 'en cours' }, { name: 'Termine', value: 'termine' }]">
                    <template #icon>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16 4V13H18.25L15.25 16.75L12.25 13H14.5V4H16ZM10 14.5V16H3.25V14.5H10ZM11.5 9.25V10.75H3.25V9.25H11.5ZM11.5 4V5.5H3.25V4H11.5Z"
                                fill="#666666" />
                        </svg>

                    </template>
                </CommonSelect>
            </div>
            <SearchBar :is-loading="isFetching && filters.search !== undefined" v-model="filters.search"
                class="w-full sm:w-[28%] sm:my-0 my-5"></SearchBar>

        </section>

        <!-- Transactions table -->
        <CommonDataTable :page-size="limitModel ? parseInt(limitModel) : 10" ref="my-table" :default-page="filters.page"
            :total="adminsData?.total ?? 0" :columns="administrationColumn" :data="adminsData?.items ?? []"
            @go-to-page="goToPage" @prev-page="prevPage" @next-page="nextPage">
        </CommonDataTable>


    </div>
</template>

<script setup lang="ts">
import CommonDataTable from '@/components/common/commonDataTable.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import { administrationColumn } from '@/components/main/administration/tables/administrationColumn';

import notificationIcon from '@/components/svg/notificationIcon.vue';
import SearchBar from '@/components/users/SearchBar.vue';
import { useLoaderStore } from '@/stores/useLoaderStore';
// import type { AdministrationType } from '@/interfaces/datatable.interface';
import { sidebarStateKey } from '@/components/layouts/provide-state-key';
import { useAllococaAdminsFiltersQuery } from '@/composables/queries/allococa/useAllococaAdminsQueries';
import { inject } from 'vue';
import { useRoute } from 'vue-router';
import AddAdminAccountModal from '@/components/modals/addAdminAccountModal.vue';

const { isSidebarExpanded, toggleSidebarExpanded } = inject(sidebarStateKey)!



const { data: adminsData, isFetched, filters, isLoading, isSuccess, isFetching } = useAllococaAdminsFiltersQuery();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();

const route = useRoute();



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