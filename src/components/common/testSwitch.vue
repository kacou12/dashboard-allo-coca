<template>
    <div class="flex flex-col items-center space-y-6 ">
        <!-- Switch avec textes intégrés -->
        <!-- <section
            class="relative inline-flex h-[25px] w-[180px] items-center rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-lg"
            :class="isAvailable ? 'bg-green-500' : 'bg-red-500'" @click="toggleAvailability">
            
            <span class="absolute left-3 text-white font-medium text-[10px] transition-opacity duration-300"
                :class="isAvailable ? 'opacity-100' : 'opacity-50'">
                Disponible
            </span>

        
            <span class="absolute right-3 text-white font-medium text-[10px] transition-opacity duration-300"
                :class="!isAvailable ? 'opacity-100' : 'opacity-50'">
                Indisponible
            </span>


            <span
                class=" h-[25px]  min-w-[100px] transform rounded-full bg-white shadow-2xl transition-transform duration-300 ease-in-out flex items-center justify-center"
                :class="isAvailable ? 'translate-x-[80px]' : 'translate-x-0'">
                <span class="text-[10px]  transition-colors duration-300"
                    :class="isAvailable ? 'text-green-600' : 'text-red-600'">
                    {{ isAvailable ? 'Indisponible' : 'Disponible' }}
                </span>
            </span>
        </section> -->



        <ConfirmModal
            :confirm-text="`Voulez-vous vraiment rendre ${isAvailable ? 'indisponible' : 'disponible'} ce produit ?`"
            :confirm-handler="() => toggleAvailability()">
            <section
                class="relative inline-flex h-[25px] w-[180px] items-center rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-lg"
                :class="isAvailable ? 'bg-green-500' : 'bg-red-500'" @click="toggleAvailability">
                <!-- Texte Disponible -->
                <span class="absolute left-3 text-white font-medium text-[10px] transition-opacity duration-300"
                    :class="isAvailable ? 'opacity-100' : 'opacity-50'">
                    Disponible
                </span>

                <!-- Texte Indisponible -->
                <span class="absolute right-3 text-white font-medium text-[10px] transition-opacity duration-300"
                    :class="!isAvailable ? 'opacity-100' : 'opacity-50'">
                    Indisponible
                </span>

                <!-- Slider -->
                <span
                    class=" h-[25px]  min-w-[100px] transform rounded-full bg-white shadow-2xl transition-transform duration-300 ease-in-out flex items-center justify-center"
                    :class="isAvailable ? 'translate-x-[80px]' : 'translate-x-0'">
                    <span class="text-[10px]  transition-colors duration-300"
                        :class="isAvailable ? 'text-green-600' : 'text-red-600'">
                        {{ isAvailable ? 'Indisponible' : 'Disponible' }}
                    </span>
                </span>
            </section>

        </ConfirmModal>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConfirmModal from '../modals/confirmModal.vue';


// const isAvailable = ref<boolean>(true)

const isAvailable = defineModel({
    type: Boolean,
    required: true
},)

// Méthode pour basculer la disponibilité
const toggleAvailability = (): void => {
    isAvailable.value = !isAvailable.value
}

// Optionnel : exposer des méthodes pour l'utilisation parent
defineExpose({
    isAvailable,
    toggleAvailability,
    setAvailable: (status: boolean) => {
        isAvailable.value = status
    }
})
</script>