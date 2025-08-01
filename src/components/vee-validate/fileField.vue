<template>
  <Field v-model="modelValue" v-slot="{ componentField, errorMessage }" :name="name">
    <div class="flex flex-col w-full">
      <div v-if="!modelValue" class="bg-neutral-80 rounded-md py-8 text-center space-y-3">
        <article class="space-y-1">
          <p class="text-sm text-black font-medium">
            Téléchargez l’image du bordereau de versement
          </p>
          <p class="text-xs text-[#999999]">JPEG, PNG, PDF, jusqu'à 50 Mo.</p>
        </article>
        <div>
          <CommonButton @click="openSelectFile" type="outline" title="Parcourir le fichier">
          </CommonButton>
        </div>
      </div>
      <div v-else class="h-[153px]">
        <DocumentType @reset="resetFile" :file-size="modelValue.size" :file-name="modelValue.name"
          :file-type="(modelValue.type.toLowerCase() as FileTypeEnum)"></DocumentType>
      </div>

      <div class="min-h-[20px] mt-2">
        <FadeInAnimation mode="out-in">
          <small v-if="errorMessage" class="app-form-item-error text-error-500 text-sm font-worksans font-normal">
            {{ errorMessage }}
          </small>
          <div v-else></div>
        </FadeInAnimation>
      </div>
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import { ref, watch } from 'vue';
import { useFileDialog } from '@vueuse/core';
import FadeInAnimation from '@/components/animations/fadeInAnimation.vue';
import CommonButton from '@/components/buttons/commonButton.vue';
import DocumentType from '@/components/documentType.vue';
import { FileTypeEnum } from '@/constants/constant.enum'; // Make sure this path is correct

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const modelValue = defineModel<File | undefined | null>();

const { files, open: openSelectFile, reset: resetFileInternal, onChange } = useFileDialog({
  accept: 'image/*,application/pdf',
  multiple: false,
});

// Watch for changes in the selected files and update the modelValue
watch(files, (newFiles) => {
  if (newFiles && newFiles.length > 0) {
    modelValue.value = newFiles[0];
  } else {
    modelValue.value = undefined;
  }
});

// Expose a reset function for external control
const resetFile = () => {
  resetFileInternal();
  modelValue.value = undefined; // Ensure modelValue is also reset
};
</script>

<style scoped></style>