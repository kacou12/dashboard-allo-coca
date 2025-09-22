<template>



    <aside class="px-4 py-9 h-full shadow-md bg-white rounded-2xl">

        <section class="rounded-xl flex flex-col items-center justify-center gap-2 bg-[#AC0F0F] p-6">
            <img src="@/assets/allococa/aside-icons/dashboard-icon.svg" alt="">
            <p class="text-xs text-white">DASHBOARD</p>
        </section>
        <section class="rounded-xl flex flex-col items-center justify-center gap-2  p-6">
            <img src="@/assets/allococa/aside-icons/order-icon.svg" alt="">
            <p class="text-xs text-[#767676]">COMMANDES</p>
        </section>
        <section class="rounded-xl flex flex-col items-center justify-center gap-2  p-6">
            <img src="@/assets/allococa/aside-icons/user-icon.svg" alt="">
            <p class="text-xs text-[#767676]">CLIENTS</p>
        </section>
        <section class="rounded-xl flex flex-col items-center justify-center gap-2  p-6">
            <img src="@/assets/allococa/aside-icons/stock-icon.svg" alt="">
            <p class="text-xs text-[#767676]">STOCKS</p>
        </section>



    </aside>


</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { AppRoute } from '@/constants/app-route';
import { logout } from '@/services/auth/auth-service';
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import AsideNavigation from '../asideNavigation.vue'
import { storeToRefs } from 'pinia';
import { destroySensitiveInfo } from '@/services/auth/auth-util';
import type { InjectionKey } from 'vue'
import { sidebarStateKey } from '@/components/layouts/provide-state-key';

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

<style scoped></style>