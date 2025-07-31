<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@/components/ui/stepper';
import { ref, watch } from "vue";

const steps = [1, 2, 3];
const currentStep = defineModel({ type: Number, required: true })
const localCurrentStep = ref(1);
const isLoading = ref(false);

watch(currentStep, (n, o) => {
  if (n > o) {
    isLoading.value = true;
    setTimeout(() => {
      localCurrentStep.value = localCurrentStep.value + 1;
      isLoading.value = false;
    }, 500);
  } else {
    localCurrentStep.value--;
  }

})

</script>

<template>
  <div class="mx-auto max-w-xl space-y-8 text-center">
    <Stepper v-model="localCurrentStep">
      <StepperItem v-for="step in steps" :key="step" :step="step" :class="step !== steps.length ? 'flex-1' : ''"
        :data-loading="isLoading && step === localCurrentStep ? 'true' : undefined">
        <StepperTrigger as-child>
          <StepperIndicator :is-loading="isLoading" />
        </StepperTrigger>
        <StepperSeparator :animationDelay="500" v-if="step < steps.length" />
      </StepperItem>
    </Stepper>

  </div>
</template>
