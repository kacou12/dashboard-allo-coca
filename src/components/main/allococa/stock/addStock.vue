<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <div>
                <CommonButton class="text-primary-50" type="outline" @action="console.log('Produit')"
                    title="Ajouter un stock">
                </CommonButton>
            </div>
        </template>

        <template #title>
            <span>Ajouter un stock</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Nom du produit</p>
                    <Input id="product_name" v-model="productState.name" placeholder="Ex: Paquet de lait" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Description</p>
                    <Input id="description" v-model="productState.description" placeholder="Ex: 500g" required />
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Image </p>
                    <!-- <Input id="image_url" v-model="productState.image_url" placeholder="https://example.com/image.png"
                        required /> -->
                    <FileField title="Ajouter une image" name="image" v-model="productState.image"></FileField>
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
import { useCreateAllococaStockMutation } from '@/composables/queries/allococa/useAllococaStocksQueries';
import type { StockCreatePayload } from '@/services/allococa/stocks/stock-type';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const open = ref(false);
const toast = useToast();

const { startLoading, stopLoading } = useLoaderStore();

const { mutateAsync: createProduct } = useCreateAllococaStockMutation();

const productState = ref<StockCreatePayload>({
    name: '',
    description: '',
    category_id: '',
    image: undefined


});

const createProductHandler = async () => {
    const payload = { ...productState.value };
    startLoading();

    try {
        await createProduct(payload);
        productState.value = {
            name: '',
            description: '',
            category_id: '',
            image: undefined

        };
        open.value = false;
        toast.success('Le stock a bien été ajouté');
    } catch (error) {
        toast.error("Une erreur est survenue lors de l'ajout du produit");
    }
};
</script>