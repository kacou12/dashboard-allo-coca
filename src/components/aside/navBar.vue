<template>
    <nav class=" w-full">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <!-- <section class="flex items-center justify-start">

                    <DrawerSheet></DrawerSheet>
                    <a @click="$router.push({ name: AppRoute.ADMIN.name })" class="flex ml-2 md:mr-24">
                        <img :src="appicons" class="h-10 mr-3" alt="Likambo Logo" />

                    </a>
                </section> -->


                <section class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <img src="@/assets/allococa/allo-coca-card.png" alt="">
                        <h2 class="text-clamp-h1-md">Dashboard</h2>
                    </div>

                    <div class="flex items-center gap-4">

                        <NotificationIcon></NotificationIcon>
                        <div class="flex items-center gap-2">
                            <p class="text-white">Jessica</p>
                            <img src="@/assets/allococa/user-circle.png" alt="">
                        </div>
                    </div>

                </section>
                <!-- FIN Icône User -->
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { AppRoute } from '@/constants/app-route';
import DrawerSheet from '../dropdowns/drawer-sheet.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';
import SearchBar from '../users/SearchBar.vue';
import NotificationIcon from '../svg/notificationIcon.vue';

const appicons = new URL("/src/assets/appicons.png", import.meta.url).href;

const { user } = storeToRefs(useAuthStore());


</script>

<style scoped></style>