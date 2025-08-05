<template>
    <h2 class="text-[28px] font-bold text-center text-gray-800
     font-merriweathersans mb-1">Document administratif</h2>
    <p class="text-center  mb-8 text-neutral-20">Importez les documents légaux devotre entreprise</p>
    <form @submit.prevent="handleSubmit" class="space-y-6 w-full">
        <!-- <div class="w-full bg-red-400"> -->

        <SelectField class="w-full" title="Type d'entreprise"
            :elements="[{ name: 'SAS', value: 'sas' }, { name: 'SA', value: 'sa' }, { name: 'SARL', value: 'sarl' }, { name: 'SASU', value: 'sasu' }, { name: 'SNC', value: 'snc' }]"
            name="business_type" v-model="password" border-color="border-neutral-60"></SelectField>
        <!-- </div> -->
        <FileField title="Ajouter votre registre de commence" name="commercial_register" v-model="commercial_register">
        </FileField>

        <div class="flex items-center gap-2">
            <div class="w-fit">
                <CommonButton @click="emit('previous')" :is-submit="false" title="retour" type="outline">
                </CommonButton>
            </div>
            <Button type="submit" class="w-full">
                Commencer
            </Button>
        </div>
    </form>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { defineEmits, ref } from 'vue';
import CommonButton from '../buttons/commonButton.vue';
import FileField from '../vee-validate/fileField.vue';
import SelectField from '../vee-validate/selectField.vue';

const password = defineModel({
    type: String,
    required: true,

});
const commercial_register = ref()
const emit = defineEmits(['submit', 'previous']);

const handleSubmit = () => {
    // Add password validation here
    emit('submit');
};
</script>