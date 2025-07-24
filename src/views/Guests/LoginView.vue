<template>
  <div class="flex h-screen w-full">
    <!-- Section gauche -->
    <div class="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-8">
      <div class="w-full max-w-sm">
        <div class="flex justify-left mb-5">
          <img :src="appicons" alt="Logo" class="w-14 h-14" />
        </div>
        <h1 class="text-4xl font-merriweather font-semibold mb-2 text-neutral-10">Connexion</h1>
        <p class="text-neutral-20 mb-8">
          Bienvenue à nouveau ! Veuillez saisir vos coordonnées.
        </p>


        <LoginForm></LoginForm>

        <div class="text-center mt-4">
          <a @click.prevent="$router.push({ name: 'Lostpassword' })"
            class="text-[#633DA5] text-sm cursor-pointer font-medium hover:underline text-[15px]">
            Mot de passe oublier
          </a>
        </div>
      </div>
    </div>
    <!-- Section droite -->
    <div class="hidden md:block w-1/2 bg-cover bg-center bg-[url('/src/assets/images/fonds/Section.png')]"></div>
  </div>
</template>
<script setup lang="ts">
import LoginForm from '@/components/forms/loginForm.vue';



const appicons = new URL("/src/assets/appicons.png", import.meta.url).href;


</script>

<style scoped>
/* Styles personnalisés */
</style>
