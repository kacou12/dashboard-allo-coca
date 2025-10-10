<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <button class="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors" title="Modifier">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </button>
        </template>

        <template #title>
            <span>Modification du produit</span>
        </template>
        <template #content>
            <div class="space-y-4">
                <section class="space-y-2"
                    v-if="productVariantState.label != 'string' && productVariantState.label != null && productVariantState.label.length > 1">
                    <p class="text-sm text-neutral-20">Label</p>
                    <Input type="text" id="label" placeholder="Ex: Zero" v-model="productVariantState.label" required />
                </section>
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Description</p>
                    <Input type="text" id="Description" placeholder="Ex: Pack 9"
                        v-model="productVariantState.description" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Taille</p>
                    <Input type="text" id="size" placeholder="Ex: 0.5L " v-model="productVariantState.size" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Prix unitaire</p>
                    <div class="flex gap-3 w-full relative">
                        <Input class="pr-14" id="unit_price" v-model.number="productVariantState.unit_price"
                            placeholder="25000" type="number" required />
                        <span
                            class="absolute end-0 inset-y-0 flex items-center justify-center px-3 text-neutral-30 text-sm">
                            FCFA
                        </span>
                    </div>
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Image</p>

                    <!-- Image existante -->

                    <section v-if="!currentImage && product.image_url"
                        class="h-[130px] flex items-center justify-center">
                        <img :src="product.image_url" :alt="product.label"
                            class="transition-opacity duration-300  h-full  ">
                    </section>

                    <FileField title="Ajout de l'image" name="image" v-model="currentImage"></FileField>
                </section>
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Image de la capsule</p>

                    <!-- Image existante -->

                    <section v-if="!currentImage && product.icon_url"
                        class="h-[130px] flex items-center justify-center">
                        <img :src="product.icon_url" :alt="product.icon_url"
                            class="transition-opacity duration-300  h-full  ">
                    </section>

                    <FileField title="Ajout de l'image" name="image" v-model="currentImage"></FileField>
                </section>


            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="updateProductVariantHandler" class="flex-1 text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    Valider
                </Button>
            </div>
        </template>
    </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { useUpdateAllococaProductVariantStockMutation } from '@/composables/queries/allococa/useAllococaStocksQueries';
import type { StockProductVariantResponse, StockProductVariantUpdatePayload } from '@/services/allococa/stocks/stock-type';
import { onBeforeMount, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Input } from '../ui/input';
import FileField from '../vee-validate/fileField.vue';

const open = ref(false);
const toast = useToast();

const { product } = defineProps<{
    product: StockProductVariantResponse
}>();

const currentImage = ref<File>();
const currentCapsuleImage = ref<File>();

const { mutateAsync: updateProductVariant } = useUpdateAllococaProductVariantStockMutation(product.product.id, product.id);

const productVariantState = ref<StockProductVariantUpdatePayload>({
    product_id: product.product_id,
    size: product.size,
    label: product.label,
    description: product.description,
    unit_price: product.unit_price,
    image: undefined,
    icon_image: undefined
});

const updateProductVariantHandler = async () => {
    const payload: StockProductVariantUpdatePayload = {
        product_id: productVariantState.value.product_id,
        size: productVariantState.value.size,
        label: productVariantState.value.label,
        description: productVariantState.value.description,
        unit_price: productVariantState.value.unit_price,
        image: currentImage.value ? currentImage.value : undefined,
        icon_image: currentCapsuleImage.value ? currentCapsuleImage.value : undefined
    };

    await updateProductVariant(payload);
    open.value = false;
    toast.success("Le produit a bien été modifié");
}

onBeforeMount(() => {
    productVariantState.value = {
        product_id: product.product_id,
        size: product.size,
        label: product.label,
        description: product.description,
        unit_price: product.unit_price,
        image: undefined,
        icon_image: undefined
    }
})
</script>