<template>
    <header class="flex justify-between items-center">
        <div class="mb-6 space-y-1">
            <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Ajout de rôle et des
                permissions</h1>
            <p class="text-neutral-30 text-sm font-normal">Gestion de rôle et des permissions</p>
        </div>
        <div>
            <notification-icon></notification-icon>
        </div>
    </header>

    <CommonRadixTabs class="mt-4" />

    <div class="py-8 px-4">
        <div class="mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">
                {{ isEditing ? 'Modifier le rôle' : 'Créer un nouveau rôle' }}
            </h1>

            <!-- Formulaire de création/modification de rôle -->
            <form @submit.prevent="saveRole" class="space-y-6">
                <!-- Informations de base du rôle -->
                <div class="space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Nom du rôle</label>
                        <input type="text" id="name" v-model="role.name"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required />
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" v-model="role.description" rows="3"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                </div>


                <!-- Section des permissions -->
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h2 class="text-lg font-medium text-gray-700 mb-4">Permissions</h2>

                    <!-- Onglets des modules -->
                    <div class="border-b border-gray-200">
                        <nav class="flex flex-wrap -mb-px">

                        </nav>
                    </div>



                    <!-- Liste des permissions par module - Verticalement -->

                </div>

                <!-- Boutons d'action -->
                <div class="flex justify-end space-x-3 pt-4">
                    <button type="button" @click="cancel"
                        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Annuler
                    </button>
                    <button type="submit"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        {{ isEditing ? 'Mettre à jour' : 'Créer' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import FadeInAnimation from '@/components/animations/fadeInAnimation.vue';
import { AppRoute } from '@/constants/app-route';
import { createRoleAdmin, fetchRoles } from '@/services/admin/admin-service';
import type { PermissionRequest } from '@/services/admin/admin-type';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

// Types
interface Permission {
    id: number;
    name: string;
    description: string;
    moduleId: number;
    v1_object: string;
    v2_action: string;
}

interface Module {
    id: number;
    name: string;
}

interface Role {
    id?: number;
    name: string;
    description: string;
    permissions: number[];
}

// Router
const route = useRoute();
const router = useRouter();

// État
const isEditing = computed(() => !!route.params.id);
const role = ref<Role>({
    name: '',
    description: '',
    permissions: []
});
const toast = useToast();
const selectedPermissions = ref<string[]>([]);
const activeModule = ref<number>(1);
const isLoading = ref<boolean>(false);


const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();




// Méthodes

const saveRole = async () => {

};



const cancel = () => {
    router.push('/roles');
};
</script>
