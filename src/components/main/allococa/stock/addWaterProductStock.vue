<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <div>
                <CommonButton class="text-primary-50" type="outline" @action="console.log('Produit')"
                    title="+ Ajout d'un produit">
                </CommonButton>
            </div>
        </template>

        <template #title>
            <span>Ajouter un produit</span>
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
                    <Input type="text" id="Description" placeholder="Ex: Pack 9 / Casier 24 bouteilles"
                        v-model="productVariantState.description" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Taille</p>
                    <Input type="text" id="size" placeholder="Ex: 0.5L  / 0.33L" v-model="productVariantState.size"
                        required />
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


                    <FileField title="Ajout de l'image" name="image" v-model="imageFile"></FileField>
                </section>


            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="createProductHandler" class="flex-1 text-sm rounded-lg bg-primary font-normal"
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
import { Input } from '@/components/ui/input';
import FileField from '@/components/vee-validate/fileField.vue';
import { useCreateAllococaProductVariantStockMutation } from '@/composables/queries/allococa/useAllococaStocksQueries';
import type { StockProductVariantCreatePayload } from '@/services/allococa/stocks/stock-type';
import type { CategoryResponse } from '@/services/category/category-type';
import { ref, type PropType } from 'vue';
import { useToast } from 'vue-toastification';

const open = ref(false);
const toast = useToast();

const { product_id } = defineProps({
    product_id: {
        type: String,
        required: true
    }
})

const { mutateAsync: createProductVariant } = useCreateAllococaProductVariantStockMutation(product_id);

const imageFile = ref<File | null>(null);

const productVariantState = ref<StockProductVariantCreatePayload>({
    product_id: product_id,
    size: '',
    label: '',
    description: '',
    unit_price: 0,
    quantity: 0,
    images: []
});

const createProductHandler = async () => {

    // The payload needs to be built correctly, ensuring price and quantity are numbers
    const payload: StockProductVariantCreatePayload = {
        ...productVariantState.value,
        quantity: Number(productVariantState.value.quantity),
        unit_price: Number(productVariantState.value.unit_price)
    };

    try {
        // Uncomment and use the mutation when ready to integrate with the API
        await createProductVariant(payload);

        // 2. Reset State Updated
        productVariantState.value = {
            product_id: product_id,
            size: '',
            label: '',
            description: '',
            unit_price: 0,
            quantity: 0,
            images: []
        };
        open.value = false;
        toast.success('Le produit a bien été ajouté');
    } catch (error) {
        toast.error("Une erreur est survenue lors de l'ajout de la variante de produit");
    }
};
</script>