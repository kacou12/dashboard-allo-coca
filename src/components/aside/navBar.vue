<template>
    <nav class=" w-full   py-3 ">
        <div class="">
            <div class="flex items-center justify-between">
                <!-- <section class="flex items-center justify-start">

                    <DrawerSheet></DrawerSheet>
                    <a @click="$router.push({ name: AppRoute.ADMIN.name })" class="flex ml-2 md:mr-24">
                        <img :src="appicons" class="h-10 mr-3" alt="Likambo Logo" />

                    </a>
                </section> -->


                <section class="flex items-center justify-between  w-full">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center p-2 bg-white rounded-lg">
                            <img src="@/assets/allococa/logo-allo-coca-red.png" alt="">
                        </div>
                        <h2 class="text-clamp-md font-medium text-white">Dashboard</h2>
                    </div>

                    <div class="flex items-center gap-4">

                        <!-- <NotificationIcon></NotificationIcon> -->
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6 0C5.33672 0 4.8 0.550481 4.8 1.23077C4.8 1.28365 4.81172 1.33413 4.81875 1.38462C2.74453 1.92788 1.2 3.86058 1.2 6.15385V11.6923C1.2 12.0409 0.939844 12.3077 0.6 12.3077H0V13.5385H4.3125C4.24453 13.7332 4.2 13.9375 4.2 14.1538C4.2 15.1659 5.01328 16 6 16C6.98672 16 7.8 15.1659 7.8 14.1538C7.8 13.9375 7.75547 13.7332 7.6875 13.5385H12V12.3077H11.4C11.0602 12.3077 10.8 12.0409 10.8 11.6923V6.32692C10.8 4.01442 9.29297 1.95192 7.18125 1.38462C7.18828 1.33413 7.2 1.28365 7.2 1.23077C7.2 0.550481 6.66328 0 6 0ZM5.7375 2.46154C5.82422 2.45433 5.91094 2.46154 6 2.46154C6.0375 2.46154 6.075 2.46154 6.1125 2.46154C8.07188 2.52163 9.6 4.28365 9.6 6.32692V11.6923C9.6 11.9087 9.64453 12.113 9.7125 12.3077H2.2875C2.35547 12.113 2.4 11.9087 2.4 11.6923V6.15385C2.4 4.19952 3.86719 2.60096 5.7375 2.46154ZM6 13.5385C6.3375 13.5385 6.6 13.8077 6.6 14.1538C6.6 14.5 6.3375 14.7692 6 14.7692C5.6625 14.7692 5.4 14.5 5.4 14.1538C5.4 13.8077 5.6625 13.5385 6 13.5385Z"
                                fill="white" />
                        </svg>

                        <div class="flex items-center gap-2">
                            <p class="text-white">{{ user?.name }}</p>
                            <img class="w-[36px] h-[36px] rounded-full" src="@/assets/images/avatars/26.png" alt="">
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