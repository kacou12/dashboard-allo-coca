<template>
  <div class="relative h-screen">
    <section class="flex flex-col ">
      <div class="flex-1 bg-red-600"></div>
      <div class="flex-1 bg-white"></div>
    </section>
    <section class="absolute top-[129px] right-[113px] border">


      <!-- DEBUT NAVBAR -->
      <NavBar></NavBar>
      <!-- FIN NAVBAR -->
      <section class="flex items-center gap-5">

        <!-- DEBUT BARRE DES MENUS -->
        <AsideBar>
        </AsideBar>
        <!-- FIN BARRE DES MENUS -->

        <!-- DEBUT DES PAGES DU ROUTER -->
        <div class="border ">
          <router-view></router-view>
        </div>
        <!-- FIN DES PAGES DU ROUTER -->
      </section>

    </section>
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
.fadeslide-enter-active {
  transition: all 0.3s ease-in-out;
}

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