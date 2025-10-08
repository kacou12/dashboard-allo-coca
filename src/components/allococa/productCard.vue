<template>
    <div class="p-4 space-y-1 bg-[#F6F6F6] rounded-xl relative">
        <div class="absolute top-2 right-2 z-10">
            <!-- <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="isActive" class="sr-only peer" @change="handleToggle">
                <div
                    class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500">
                </div>
            </label> -->
        </div>

        <div v-if="!isActive"
            class="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-xl z-5 flex items-center justify-center">
            <span class="text-white font-medium text-sm bg-black bg-opacity-70 px-3 py-1 rounded-full">
                Indisponible
            </span>
        </div>

        <section class="h-[130px] flex items-center justify-center">
            <img :src="stock.image_url" :alt="stock.label" class="transition-opacity duration-300  h-full"
                :class="{ 'opacity-50': !isActive }">
        </section>

        <section class="space-y-1">
            <p class="text-[10px] text-[#888888]">{{ stock.label }}</p>
            <p :class="{ 'text-gray-500': !isActive }">{{ stock.product.name }}</p>
            <div class="divide-x-[1px] divide-[#D1D1D1] space-x-2 mt-1 flex items-center gap-2">
                <p class="text-sm text-[#888888]">{{ stock.size }}</p>
                <p class="text-sm pl-2" :class="{ 'text-gray-500': !isActive }">{{ formatPrice(stock.unit_price) }} </p>
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

interface Props {

    stock: StockProductVariantResponse;
}

const props = withDefaults(defineProps<Props>(), {

});

const emit = defineEmits<{
    toggle: [active: boolean];
    addToCart: [];
    viewProduct: [];
}>();

const isActive = ref(props.stock.status);

// Watch prop stock.status to update isActive if needed
watch(() => props.stock.status, (newStatus) => {
    isActive.value = newStatus;
}, { immediate: true });

const handleToggle = () => {
    emit('toggle', isActive.value);
    console.log(`Produit ${isActive.value ? 'activé' : 'désactivé'}`);
};

const handleAddToCart = () => {
    if (isActive.value) {
        emit('addToCart');
        console.log('Ajouté au panier');
    }
};

const handleViewProduct = () => {
    if (isActive.value) {
        emit('viewProduct');
        console.log('Voir le produit');
    }
};
</script>
