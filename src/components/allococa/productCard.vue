<template>
    <div class="p-4 space-y-1 bg-[#F6F6F6] rounded-xl relative">
        <!-- Switch d'activation/désactivation -->
        <div class="absolute top-2 right-2 z-10">
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="isActive" class="sr-only peer" @change="handleToggle">
                <div
                    class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500">
                </div>
            </label>
        </div>

        <!-- Overlay pour désactiver visuellement le produit -->
        <div v-if="!isActive"
            class="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-xl z-5 flex items-center justify-center">
            <span class="text-white font-medium text-sm bg-black bg-opacity-70 px-3 py-1 rounded-full">
                Indisponible
            </span>
        </div>

        <section class="h-[268px] flex items-center justify-center">
            <img src="@/assets/allococa/products/coca.png" alt="Coca-Cola Classique"
                class="transition-opacity duration-300" :class="{ 'opacity-50': !isActive }">
        </section>

        <section class="space-y-1">
            <p class="text-[10px] text-[#888888]">Casier de 24 bouteilles</p>
            <p class="font-medium text-lg" :class="{ 'text-gray-500': !isActive }">Coca-Cola Classique</p>
            <div class="divide-x-[1px] divide-[#D1D1D1] space-x-2 mt-1 flex items-center gap-2">
                <p class="text-sm text-[#888888]">30cl</p>
                <p class="text-sm pl-2" :class="{ 'text-gray-500': !isActive }">250 FCFA</p>
            </div>
            <div class="flex items-center justify-between cursor-pointer">
                <Button class="rounded-[90px] h-8 border-black transition-colors duration-300" variant="outline"
                    :disabled="!isActive" :class="{ 'opacity-50 cursor-not-allowed border-gray-400': !isActive }"
                    @click="handleAddToCart">
                    <div class="flex items-center gap-1">
                        <ShoppingBasket></ShoppingBasket>
                        <span class="text-xs font-medium">{{ isActive ? 'Casier' : 'Indisponible' }}</span>
                    </div>
                </Button>

                <Button @click="handleViewProduct" class="border-black transition-colors duration-300" variant="ghost"
                    :disabled="!isActive" :class="{ 'opacity-50 cursor-not-allowed': !isActive }">
                    <div class="border-black border-[1px] bg-white p-2 rounded-full transition-colors duration-300"
                        :class="{ 'border-gray-400 bg-gray-100': !isActive }">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.16675 9.99105H15.8334M15.8334 9.99105L10.0001 4.15771M15.8334 9.99105L10.0001 15.8244"
                                :stroke="isActive ? 'black' : '#9CA3AF'" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </Button>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomButton from '@/components/buttons/customButton.vue';
import Button from '@/components/ui/button/Button.vue';
import { AppRoute } from '@/constants/app-route';
import { ArrowRight, ShoppingBasket } from 'lucide-vue-next';

// État d'activation du produit
const isActive = ref(true);

// Props (optionnel - pour pouvoir contrôler l'état depuis le parent)
interface Props {
    initialActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    initialActive: true
});

// Initialiser avec la valeur des props
isActive.value = props.initialActive;

// Émissions d'événements
const emit = defineEmits<{
    toggle: [active: boolean];
    addToCart: [];
    viewProduct: [];
}>();

// Gestionnaires d'événements
const handleToggle = () => {
    emit('toggle', isActive.value);
    console.log(`Produit ${isActive.value ? 'activé' : 'désactivé'}`);
};

const handleAddToCart = () => {
    if (isActive.value) {
        emit('addToCart');
        // Logique d'ajout au panier
        console.log('Ajouté au panier');
    }
};

const handleViewProduct = () => {
    if (isActive.value) {
        emit('viewProduct');
        // Navigation vers la page produit
        // $router.push({ name: AppRoute.PRODUCTS.name });
        console.log('Voir le produit');
    }
};
</script>

<style scoped>
/* Styles pour le switch personnalisé */
.peer:checked+div {
    background-color: #22c55e;
}

.peer+div::after {
    transition: transform 0.3s ease;
}

.peer:checked+div::after {
    transform: translateX(100%);
}

/* Animation pour les états désactivés */
.transition-opacity {
    transition: opacity 0.3s ease;
}

.transition-colors {
    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}
</style>