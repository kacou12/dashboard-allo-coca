<template>
    <aside class="px-3 py-5 shadow-md bg-white rounded-2xl border-2">
        <!-- Navigation Items -->
        <div v-for="item in navigationItems" :key="item.name" class="mb-4">
            <!-- <router-link :to="{ name: item.route }" class="block" v-slot="{ isActive }">
                <section
                    class="rounded-xl flex flex-col items-center justify-center gap-2 p-6 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer group relative overflow-hidden"
                    :class="[
                        isActive
                            ? 'bg-[#AC0F0F] shadow-lg'
                            : 'bg-gray-50 hover:bg-[#AC0F0F]/10 hover:shadow-md',
                        'before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-[#AC0F0F]/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full'
                    ]">
                    <img :src="imageUrl(item.name)" :srcset="item.icon" :alt="item.name"
                        class="w-6 h-6 transition-opacity duration-300"
                        :class="isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'">
                    <p class="text-xs font-medium transition-colors duration-300 uppercase tracking-wide" :class="isActive
                        ? 'text-white'
                        : 'text-gray-600 group-hover:text-[#AC0F0F]'">
                        {{ item.name }}
                    </p>
                </section>
            </router-link> -->
            <AsideCard :item="item"></AsideCard>
        </div>

        <!-- Logout Button -->
        <div class="mt-auto">
            <button @click="handleLogout"
                class="w-full rounded-xl flex flex-col items-center justify-center gap-2 p-6 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer group bg-gray-50 hover:bg-red-50 hover:shadow-md relative overflow-hidden before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-red-200/30 before:to-transparent before:transition-all before:duration-500 hover:before:left-full">
                <svg class="w-6 h-6 transition-colors duration-300 text-gray-600 group-hover:text-red-500" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <p
                    class="text-xs font-medium transition-colors duration-300 text-gray-600 group-hover:text-red-500 uppercase tracking-wide">
                    Déconnexion
                </p>
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { sidebarStateKey } from '@/components/layouts/provide-state-key';
import { AppRoute } from '@/constants/app-route';
import { destroySensitiveInfo } from '@/services/auth/auth-util';
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { storeToRefs } from 'pinia';
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import AsideCard from './asideCard.vue';

// Navigation items data
const navigationItems = [
    {
        name: 'Dashboard',
        route: 'dashboard',
        icon: 'dashboard'
    },
    {
        name: 'Commandes',
        route: 'orders',
        icon: 'orders'
    },
    {
        name: 'Clients',
        route: 'clients',
        icon: 'users'
    }
    ,
    {
        name: 'Stocks',
        route: 'stocks',
        icon: 'stock'
    }
    ,
    {
        name: 'Admins',
        route: 'administration',
        icon: 'admin'
    }
];


const mini_app_icons = new URL("/src/assets/mini_app_icons.png", import.meta.url).href;

const { isSidebarExpanded, toggleSidebarExpanded } = inject(sidebarStateKey)!
const { fullName, logout: storeLogout } = useAuthStore();
const { user } = storeToRefs(useAuthStore());

const router = useRouter();
const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore();

async function handleLogout() {
    startLoading();
    storeLogout();
    destroySensitiveInfo()
    router.push({ name: AppRoute.LOGIN.name });
    stopLoading();
}

const defaultImage = computed(() => {
    if (user.value) {
        return new URL(`/src/assets/images/avatar/26.png`, import.meta.url).href;
    }
    return '';
});

const selectedCountry = ref<string>();
const isOpen = ref(false);
</script>

<style scoped>
/* Style pour l'effet de balayage lumineux */
.group:hover::before {
    content: '';
}
</style>