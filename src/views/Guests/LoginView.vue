<template>
  <div class="bg-[#FCFCFC] h-screen w-full  ">


    <section class="mx-auto max-w-[450px] space-y-4 mt-[50px] flex flex-col items-center">
      <img :src="appicons" class="my-5" alt="">

      <h1 class="text-clamp-md font-tcc font-bold  text-center">Connexion à votre espace admin</h1>
      <p class="text-neutral-20   text-center">
        Connectez-vous à votre tableau de bord pour gérer les commandes,
        le stock et les clients.
      </p>


      <LoginForm class="w-full">

      </LoginForm>
      <!-- 
      <div class="text-center flex items-center justify-center gap-1">
        <p class="text-[#4F4F4F] text-xs">Pas encore de compte ?</p>
        <RouterLink :to="{ name: AppRoute.REGISTER.name }" class=" text-xs cursor-pointer font-medium hover:underline ">
          Rejoigner la famille
        </RouterLink>
      </div> -->
    </section>



  </div>

</template>
<script setup lang="ts">
import LoginForm from '@/components/forms/loginForm.vue';

const appicons = new URL("/src/assets/allococa/logo-allo-coca-red.png", import.meta.url).href;


</script>

<style scoped>
/* Styles personnalisés */
</style>
