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
            <div class="space-y-3">
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Libellé de la variante</p>
                    <Input id="label" v-model="productState.label" placeholder="Ex: Paquet de lait entier" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Taille / Volume</p>
                    <Input id="size" v-model="productState.size" placeholder="Ex: 500g" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Image </p>
                    <FileField title="Ajout de l'image" name="image" v-model="imageFile"></FileField>
                </section>
                <!-- 
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Quantité en stock</p>
                    <Input id="quantity" v-model="productState.quantity" placeholder="Ex: 100" type="number" required />
                </section> -->

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Prix Unitaire</p>
                    <div class="flex gap-3 w-full relative">
                        <Input class="pr-14" id="unit_price" v-model="productState.unit_price" placeholder="500"
                            type="number" required />
                        <span
                            class="absolute end-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                            XOF
                        </span>
                    </div>
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
import { useCreateAllococaProductVariantStockMutation, useCreateAllococaStockMutation } from '@/composables/queries/allococa/useAllococaStocksQueries';
// Updated to only import the correct type
import type { StockProductVariantCreatePayload } from '@/services/allococa/stocks/stock-type';
import { ref } from 'vue';
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
// 1. Initial State Updated to match StockProductVariantCreatePayload
const productState = ref<StockProductVariantCreatePayload>({
    product_id: '', // Assuming this is needed, perhaps from context/props
    size: '',
    label: '',
    quantity: 0,
    unit_price: 0,
    images: undefined, // Type is File[] | undefined
    sort_order: 0 // Default value for sort_order
});

const createProductHandler = async () => {
    // Basic validation check for required fields, especially product_id
    if (!productState.value.product_id || !productState.value.label || !productState.value.size) {
        toast.error("Veuillez remplir les champs obligatoires (ID produit, Libellé, Taille)");
        return;
    }

    // The payload needs to be built correctly, ensuring price and quantity are numbers
    const payload: StockProductVariantCreatePayload = {
        ...productState.value,
        quantity: Number(productState.value.quantity),
        unit_price: Number(productState.value.unit_price)
    };

    try {
        // Uncomment and use the mutation when ready to integrate with the API
        await createProductVariant(payload);

        // 2. Reset State Updated
        productState.value = {
            product_id: product_id,
            size: '',
            label: '',
            quantity: 0,
            unit_price: 0,
            images: undefined,
            sort_order: 0
        };
        open.value = false;
        toast.success('La variante de produit a bien été ajoutée');
    } catch (error) {
        toast.error("Une erreur est survenue lors de l'ajout de la variante de produit");
    }
};
</script>