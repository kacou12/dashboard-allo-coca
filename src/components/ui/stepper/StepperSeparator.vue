<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { StepperSeparatorProps } from "reka-ui";
import { StepperSeparator, useForwardProps } from "reka-ui";

import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  StepperSeparatorProps & {
    class?: HTMLAttributes["class"],
    animationDelay?: number // délai en millisecondes
  }
>();

const delegatedProps = computed(() => {
  const { class: _, animationDelay: __, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);

const animationStyle = computed(() => ({
  '--animation-delay': `${props.animationDelay || 0}ms`
}));
</script>

<template>
  <StepperSeparator v-bind="forwarded" :style="animationStyle" :class="cn(
    'bg-muted group-data-[state=completed]/step:bg-primary m-0.5 transition-all duration-500 ease-in-out',
    // Animation pour orientation horizontale (gauche vers droite)
    'group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=horizontal]/stepper:flex-1',
    'group-data-[orientation=horizontal]/stepper:origin-left group-data-[orientation=horizontal]/stepper:scale-x-0',
    'group-data-[state=completed]/step:scale-x-100 group-data-[state=completed]/step:delay-[var(--animation-delay)]',
    // Animation pour orientation verticale (haut vers bas)
    'group-data-[orientation=vertical]/stepper:w-0.5 group-data-[orientation=vertical]/stepper:flex-1',
    'group-data-[orientation=vertical]/stepper:origin-top group-data-[orientation=vertical]/stepper:scale-y-0',
    'group-data-[state=completed]/step:scale-y-100',
    props.class,
  )
    " />
</template>