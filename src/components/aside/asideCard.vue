<template>
    <router-link :to="{ name: item.route }" class="block" v-slot="{ isActive }">
        <section
            class="rounded-xl flex flex-col items-center justify-center gap-2 p-6 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer group relative overflow-hidden"
            :class="[
                isActive
                    ? 'bg-[#AC0F0F] shadow-lg'
                    : 'bg-gray-50 hover:bg-[#AC0F0F]/10 hover:shadow-md',
                'before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-[#AC0F0F]/20 before:to-transparent before:transition-all before:duration-500 hover:before:left-full'
            ]">

            <!-- SVG Icon -->
            <div class="w-6 h-6 transition-all duration-300 relative z-10">
                <component :is-active="isActive" :is="iconComponent" :class="[
                    'w-full h-full transition-colors duration-300',
                    isActive
                        ? 'text-white'
                        : 'text-gray-500 group-hover:text-[#AC0F0F]'
                ]" />
            </div>

            <p class="text-xs font-medium transition-colors duration-300 uppercase tracking-wide relative z-10" :class="isActive
                ? 'text-white'
                : 'text-gray-600 group-hover:text-[#AC0F0F]'">
                {{ item.name }}
            </p>
        </section>
    </router-link>
</template>

<script setup lang="ts">
import { computed, type PropType, defineAsyncComponent } from 'vue';

// SVG Components
const OrderIcon = defineAsyncComponent(() => import('./OrderIcon.vue'));
const UserIcon = defineAsyncComponent(() => import('./UserIcon.vue'));
const StockIcon = defineAsyncComponent(() => import('./StockIcon.vue'));
const DashboardIcon = defineAsyncComponent(() => import('./DashboardIcon.vue'));

const props = defineProps({
    item: {
        type: Object as PropType<{
            name: string;
            route: string;
            icon: string;
        }>,
        required: true,
    },
});

// Map des icônes
const iconMap = {
    'dashboard': DashboardIcon,
    'orders': OrderIcon,
    'users': UserIcon,
    'stock': StockIcon,
};

const iconComponent = computed(() => {
    return iconMap[props.item.icon as keyof typeof iconMap] || DashboardIcon;
});
</script>

<style scoped></style>