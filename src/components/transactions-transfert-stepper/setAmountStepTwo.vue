<template>
    <div class="space-y-2">
        <p class="text-[#666666]">Vous envoyez</p>
        <section class="flex gap-3 w-full relative">
            <Input v-model="amount" type="text" id="amount" placeholder="montant"
                class="w-full pl-[50px] text-[#B3B3B3] py-6 " />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <!-- sms icons -->
                <img class="w-[32px] h-[32px]" src="@/assets/images/logos/wave.png" alt="">

            </span>
        </section>
        <section class="space-y-2">
            <p>Vous allez effectuer une transaction au <strong>0787995058</strong></p>
            <p class="text-[12px]"><span class="">*</span>Une fois le paiement effectué, aucun remboursement ne sera
                possible</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Input from '../ui/input/Input.vue';
// const amount = ref(0);
const amount = defineModel({
    type: Number,
    required: true
});

</script>

<style scoped></style>