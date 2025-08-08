<template>
    <div class="space-y-3">
        <p class="text-neutral-20 font-medium">numéro d'identification du compteur</p>
        <InputField name="identifier" placeholder="00000000"></InputField>
        <!-- <CommonButton title="Suivant" type="default" @action="console.log('wapiti')"></CommonButton> -->
    </div>
</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import Comp334 from '@/components/comp-334.vue';
import InputField from '@/components/vee-validate/InputField.vue';



</script>

<style scoped></style>