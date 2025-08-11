<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTrigger,
} from '@/components/ui/stepper';
import { computed, ref, watch, type PropType } from "vue";

// const steps = [1, 2, 3];

const { stepsData, stepsLength } = defineProps({
    stepsLength: {
        type: Number,
        required: true
    },
    stepsData: {
        type: Array as PropType<{
            title: string;
            description: string;
        }[]>,
        required: true
    }
})
const steps = computed(() => Array(stepsLength).fill(1).map((_, i) => i + 1))
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
    <section class="space-y-3">

        <div class="  space-y-8 text-center  w-[90%] mx-auto">
            <Stepper v-model="localCurrentStep">
                <StepperItem v-for="step, index in steps" :key="step" :step="step"
                    :class="step !== steps.length ? 'flex-1' : ''"
                    :data-loading="isLoading && step === localCurrentStep ? 'true' : undefined" class="relative  mx-1">
                    <StepperTrigger class="md:p-5 md:text-[20px]" as-child>
                        <StepperIndicator :is-loading="isLoading" />
                    </StepperTrigger>

                    <StepperSeparator :animationDelay="500" v-if="step < steps.length" />
                </StepperItem>
            </Stepper>


        </div>
        <section class="flex justify-between gap-2 " v-if="stepsData.length === steps.length">

            <div v-for="step, index in stepsData" :key="step.title" :class="index == steps.length - 1 ? '' : ''"
                class="   text-center ">
                <p :class="[localCurrentStep == index + 1 ? 'text-primary-50' : '']"
                    class="text-sm md:text-md line-clamp-1">{{
                        step.title
                    }}</p>

            </div>
        </section>
    </section>
</template>
