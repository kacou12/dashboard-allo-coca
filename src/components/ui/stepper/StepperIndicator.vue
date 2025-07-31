<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { Check, LoaderCircle } from "lucide-vue-next";
import type { StepperIndicatorProps } from "reka-ui";
import { StepperIndicator, useForwardProps } from "reka-ui";

import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  StepperIndicatorProps & {
    class?: HTMLAttributes["class"];
    isLoading?: boolean;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperIndicator v-slot="{ step }" v-bind="forwarded" :class="cn(
    'bg-muted text-muted-foreground group-data-[state=active]/step:bg-primary group-data-[state=completed]/step:bg-primary group-data-[state=active]/step:text-primary-foreground group-data-[state=completed]/step:text-primary-foreground relative flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium',
    props.class,
  )
    ">
    <slot>
      <span class="transition-all group-data-[state=completed]/step:scale-0 group-data-[state=completed]/step:opacity-0"
        :class="{
          'group-data-[state=active]/step:scale-0 group-data-[state=active]/step:opacity-0': isLoading
        }">
        {{ step }}
      </span>
      <Check name="lucide:check"
        class="absolute size-4 scale-0 opacity-0 transition-all group-data-[state=completed]/step:scale-100 group-data-[state=completed]/step:opacity-100"
        aria-hidden="true" />
      <span v-if="isLoading"
        class="absolute opacity-0 transition-all group-data-[state=active]/step:opacity-100 group-data-[state=active]/step:transition-none">
        <LoaderCircle name="lucide:loader-circle" class="size-4 animate-spin" aria-hidden="true" />
      </span>
    </slot>
  </StepperIndicator>
</template>