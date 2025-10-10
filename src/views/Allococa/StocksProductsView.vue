<template>
    <div class="px-4 w-full ">
        <!-- Titre du tableau de bord -->
        <header class="mb-6 flex justify-between items-center gap-2  text-white">
            <section class="spacep-y-1">

                <h1 class="text-clamp-md font-semibold font-merriweathersans">Produits en stock</h1>
                <p class="text-sm text-white">{{ stocksProductsVariantData?.total }} Produits</p>
            </section>
            <AddProductStock v-if="isFetchedCategory" :product_id="(route.params.stockId as string)"
                :category="categoryData!"></AddProductStock>
        </header>



        <!-- transaction filter -->
        <section class="flex xl:justify-between items-center">
            <section class="flex items-center gap-2">


                <!-- <CommonSelect v-model="statusModel" :default-width="width >= 1366 ? 'w-fit' : 'w-full'" class=" w-full "
                    title="Filtre par statut" :elements="[
                        { name: 'Filtre par statut', value: 'all' },
                        { name: 'En attente', value: 'Pending' },
                        { name: 'En cours', value: 'Processing' },
                        { name: 'Echouée', value: 'Failed' },
                        { name: 'Réussi', value: 'Successful' }]">
                </CommonSelect> -->



                <section class=" my-5 xl:min-w-[300px] min-w-[200px] mx-1">
                    <SearchBar :is-loading="isFetching && filters.search !== undefined" v-model="filters.search">
                    </SearchBar>
                </section>

            </section>


            <!-- <CommonDatesFilter :update-handler="updateData" v-model="dates"></commonDatesFilter> -->

        </section>

        <!-- commandes recentes table -->
        <section class=" w-full bg-white rounded-3xl p-10">

            <!-- <CommonDataTable :page-size="limitModel ? parseInt(limitModel) : 10" ref="my-table"
                :default-page="filters.page" :total="transactionsData?.total ?? 0" :columns="recentsTransactionsColumns"
                :data="transactionsData?.items ?? []" @go-to-page="goToPage" @prev-page="prevPage"
                @next-page="nextPage">
            </CommonDataTable> -->

            <div class="grid grid-cols-5 gap-4" v-if="isFetched">

                <ProductVariantCard v-for="productVariant in stocksProductsVariantData?.items" :key="productVariant.id"
                    :product-variant="productVariant">
                </ProductVariantCard>


            </div>

            <FadeSlideAnimation>
                <CommonPagination v-if="isFetched" :items-per-page="10" :current-page="defaultPage"
                    @go-to-page="goToPage" @next-page="nextPage" @prev-page="prevPage"
                    :total="stocksProductsVariantData?.total" />
                <div v-else-if="isLoadingData">
                    <div class="animate-pulse bg-gray-200 h-[72px] rounded-b-xl"></div>
                </div>
            </FadeSlideAnimation>


        </section>

    </div>
</template>

<script setup lang="ts">
import ProductVariantCard from '@/components/allococa/productVariantCard.vue';
import FadeSlideAnimation from '@/components/animations/fadeSlideAnimation.vue';
import CommonDatesFilter from '@/components/common/commonDatesFilter.vue';
import CommonPagination from '@/components/common/commonPagination.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import { sidebarStateKey } from '@/components/layouts/provide-state-key';
import AddProductStock from '@/components/main/allococa/stock/addProductStock.vue';
import SearchBar from '@/components/users/SearchBar.vue';
import { useAllococaPoductVariantStocksFiltersQuery } from '@/composables/queries/allococa/useAllococaStocksQueries';
import { useCategoriesQuery, useCategoryQuery } from '@/composables/queries/useCategoryQueries';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoaderStore } from "@/stores/useLoaderStore";
import {
    CalendarDate
} from '@internationalized/date';
import { useWindowSize } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import type { DateRange } from "radix-vue";
import type { Ref } from 'vue';
import { computed, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();


const { isLoading, isLoadingSkeleton } = storeToRefs(useLoaderStore());
const isLoadingData = computed(() => {
    return isLoading.value || isLoadingSkeleton.value || isFetching.value;
})


const { data: stocksProductsVariantData, isFetched, refetch, isFetching, filtersProductVariantStock: filters } = useAllococaPoductVariantStocksFiltersQuery(route.params.stockId as string);
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();


const { data: categoryData, isLoading: isLoadingCategories, isFetched: isFetchedCategory } = useCategoryQuery(route.params.categoryId as string)


const defaultPage = ref(1)


let date = new Date()
const dates = ref({
    start: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    end: new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
}) as Ref<DateRange>



const updateData = () => {


    const startDate = dates.value.start!.toDate('Africa/Abidjan')
    const endDate = dates.value.end!.toDate('Africa/Abidjan')
    // filters.dates = [dates.value.start!.toDate('Africa/Abidjan'), dates.value.end!.toDate('Africa/Abidjan')]
}


const { isSidebarExpanded, toggleSidebarExpanded } = inject(sidebarStateKey)!
const { user, fullName } = useAuthStore();




const { width, height } = useWindowSize()



// const tableRef = useTemplateRef('my-table')

// onBeforeMount(async () => {

//   await refetchProviders();

// })

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