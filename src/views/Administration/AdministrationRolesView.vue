<template>
    <div class="px-4 bg-white">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Gestion des roles et
                    des
                    permissions
                </h1>
                <p class="text-neutral-30 text-sm font-normal">Gestion de role et des permissions</p>
            </div>

            <div>
                <notification-icon></notification-icon>
            </div>
        </header>

        <div class="my-5">

            <CommonButton @click="$router.push({ name: AppRoute.ADMIN_ADD_ROLE.name })" title="Créer un role">
            </CommonButton>
        </div>

        <CommonDataTable :default-page="filters.page" :dynamic-width-columns="false" :total="rolesData?.total ?? 0"
            :columns="rolesColumn" :data="rolesData?.items ?? []" @prev-page="prevPage" @next-page="nextPage"
            @go-to-page="goToPage">
        </CommonDataTable>
    </div>


</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonDataTable from '@/components/common/commonDataTable.vue';
import { rolesColumn } from '@/components/main/roles/rolesColumn';
import { useRoleFiltersQuery } from '@/composables/queries/useRoleQueries';
import { AppRoute } from '@/constants/app-route';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { useRoute } from 'vue-router';


interface Role {
    id?: number;
    name: string;
    description: string;
    permissions: number[];
}

// const currentPage = ref(1);



// const rolesData = ref<PaginationResponse<RoleResponse>>();


const { data: rolesData, isFetched, filters, isLoading, isSuccess, isFetching } = useRoleFiltersQuery();

const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();

const route = useRoute();


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


// onBeforeMount(async () => {
//     startLoadingSkeleton();
//     await fetchRoles(currentPage.value).then((res) => {
//         rolesData.value = res!;

//     }).finally(() => {
//         stopLoadingSkeleton();
//     })
// })


</script>