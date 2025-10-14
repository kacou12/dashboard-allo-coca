<template>
    <div class="px-4 bg-white">

        <header class="flex justify-between items-center">
            <section class="flex items-center gap-2">
                <button class="hidden xl:block p-2 -ml-2 mr-2" @click="toggleSidebarExpanded">
                    <svg viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round" class="h-6 w-6 transform"
                        :class="isSidebarExpanded ? 'rotate-180' : 'rotate-0'">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="4" y1="6" x2="14" y2="6" />
                        <line x1="4" y1="18" x2="14" y2="18" />
                        <path d="M4 12h17l-3 -3m0 6l3 -3" />
                    </svg>
                </button>
                <div class=" space-y-1">


                    <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Administration
                    </h1>
                    <p class="text-neutral-30 text-sm font-normal">Gestion des administrateurs</p>
                </div>

            </section>

            <div>
                <notification-icon></notification-icon>
            </div>
        </header>


        <div class="flex flex-col sm:flex-row justify-between my-4">
            <section class="flex gap-2 items-center">
                <p class="text-[18px] font-semibold">Equipe d'administration</p>
                <div>
                    <span v-if="isFetched"
                        class="text-xs font-medium px-[5px] py-[1px]  rounded-xl border text-[#633DA5] border-[#633DA5]">{{
                            adminsData!.total }}
                        Personne(s)</span>
                </div>
            </section>
            <section class="sm:my-0 my-5">
                <!-- <AddAdminAccountModal> </AddAdminAccountModal> -->

            </section>

        </div>

        <div class="h-[1px] bg-neutral-70 my-5"></div>

        <section class="flex flex-col sm:flex-row justify-between mb-4">
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