<template>
    <div class="p-4 space-y-1 bg-[#F6F6F6] rounded-xl relative">
        <div class="absolute top-2 right-2 z-10 flex gap-2">


            <UpdateProductVariantModal :category="category" :product="productVariant"></UpdateProductVariantModal>

            <ConfirmModal :confirm-text="`Voulez-vous vraiment supprimer le produit ?`"
                :confirm-handler="() => handleDelete()">
                <button class="p-1.5 bg-white rounded-lg shadow-sm hover:bg-red-50 transition-colors" title="Supprimer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-600" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                </button>

            </ConfirmModal>
        </div>

        <div v-if="!isActive"
            class="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-xl z-5 flex items-center justify-center">
            <span class="text-white font-medium text-sm bg-black bg-opacity-70 px-3 py-1 rounded-full">
                Indisponible
            </span>
        </div>

        <section class="h-[130px] flex items-center justify-center">
            <img :src="productVariant.image_url" :alt="productVariant.description"
                class="transition-opacity duration-300  h-full" :class="{ 'opacity-50': !isActive }">
        </section>

        <section class="space-y-1">
            <p class="text-[10px] text-[#888888]">{{ productVariant.description }}</p>
            <p :class="{ 'text-gray-500': !isActive }">{{ productVariant.product.name }} {{ productVariant.label }}</p>
            <div class="divide-x-[1px] divide-[#D1D1D1] space-x-2 mt-1 flex items-center gap-2">
                <p class="text-sm text-[#888888]">{{ productVariant.size }}</p>
                <p class="text-sm pl-2" :class="{ 'text-gray-500': !isActive }">{{
                    formatPrice(productVariant.unit_price) }} </p>
            </div>

            <TestSwitch v-model="isActive"></TestSwitch>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import TestSwitch from '../common/testSwitch.vue';
import type { StockProductVariantResponse } from '@/services/allococa/stocks/stock-type';
import { formatPrice } from '@/myUtils';
import { useDeleteAllococaProductVariantStockMutation, useUpdateAllococaProductVariantStockStatusMutation } from '@/composables/queries/allococa/useAllococaStocksQueries';
import UpdateProductVariantModal from './updateProductVariantModal.vue';
import { useLoaderStore } from '@/stores/useLoaderStore';
import ConfirmModal from '../modals/confirmModal.vue';
import { useToast } from 'vue-toastification';
import { useCategoryQuery } from '@/composables/queries/useCategoryQueries';
import type { CategoryResponse } from '@/services/category/category-type';

interface Props {
    productVariant: StockProductVariantResponse;
    category: CategoryResponse,
}

const props = withDefaults(defineProps<Props>(), {});
const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore(

);

const { mutateAsync: updateProductVariantStatus } = useUpdateAllococaProductVariantStockStatusMutation(props.productVariant.id);
const { mutateAsync: deleteProductVariantStatus } = useDeleteAllococaProductVariantStockMutation(props.productVariant.product.id);
const { data: categoryData, isFetched: isFetchedCategory, isLoading } = useCategoryQuery(props.productVariant.product.category_id);

const emit = defineEmits<{
    toggle: [active: boolean];
    addToCart: [];
    viewProduct: [];
    editProduct: [];
    deleteProduct: [];
}>();
const toast = useToast();
const isActive = ref(props.productVariant.status);

// Watch prop productVariant.status to update isActive if needed
watch(isActive, async (newStatus) => {
    startLoading();
    const res = await updateProductVariantStatus({
        status: newStatus
    })
    toast.success("Le produit a bien été modifié");
});

const handleDelete = async () => {
    startLoading();
    const res = await deleteProductVariantStatus(props.productVariant.id)
    toast.success("Le produit a bien été supprimé");
};
</script>