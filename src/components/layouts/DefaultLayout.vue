<template>
  <div class="flex pt-[75px] xl:pt-0 h-screen">
    <!-- DEBUT NAVBAR -->
    <NavBar></NavBar>
    <!-- FIN NAVBAR -->

    <!-- DEBUT BARRE DES MENUS -->
    <AsideBar class="hidden xl:block"
      :class="[isSidebarExpanded ? 'w-[290px]' : 'w-[85px]', 'transition-width-animation']">
    </AsideBar>
    <!-- FIN BARRE DES MENUS -->

    <!-- DEBUT DES PAGES DU ROUTER -->
    <div class="p-[2px] lg:p-4  xl:flex-1 w-full overflow-y-scroll">
      <router-view></router-view>
    </div>
    <!-- FIN DES PAGES DU ROUTER -->
  </div>
</template>
<script setup lang="ts">
import AsideBar from '../aside/asideBar.vue';
import NavBar from '../aside/navBar.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';

import { useCountryFiltersQuery } from '@/composables/queries/useCountryQueries';
import { onBeforeMount, onMounted, watch } from 'vue';
import { ref, provide, type Ref, type InjectionKey } from 'vue'
import { sidebarStateKey } from './provide-state-key';

const { user } = storeToRefs(useAuthStore());




// État et fonction
const isSidebarExpanded = ref(true)

function toggleSidebarExpanded() {
  isSidebarExpanded.value = !isSidebarExpanded.value
}

provide(sidebarStateKey, {
  isSidebarExpanded,
  toggleSidebarExpanded
})




const isOpen = ref(false);



</script>
<style scoped>
.transition-width-animation {
  transition: width 0.5s ease-in-out;
}

/* Le reste de votre code CSS */
.fadeslide-enter-active,
.fadeslide-leave-active {
  transition: all 0.3s ease-in-out;
}

.fadeslide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fadeslide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>