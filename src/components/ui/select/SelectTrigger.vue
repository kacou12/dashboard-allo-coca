<template>
  <SelectTrigger v-bind="forwardedProps" :class="cn(
    'flex h-[44px]   items-center justify-between rounded-md border-[1px] border-neutral-60 bg-background px-3 py-2 text-sm ring-offset-background  data-[placeholder]:text-neutral-30 focus:outline-none focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start ',
    props.class,
  )">
    <slot />
    <SelectIcon as-child>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M17.4466 5.9594C17.8511 6.34992 17.8511 6.98309 17.4466 7.37361L10.5407 14.0403C10.1361 14.4308 9.48022 14.4308 9.07568 14.0403L2.55341 7.74398C2.14886 7.35346 2.14886 6.72029 2.55341 6.32977C2.95795 5.93924 3.61384 5.93924 4.01838 6.32977L9.80817 11.919L15.9816 5.9594C16.3862 5.56887 17.0421 5.56887 17.4466 5.9594Z"
          fill="#999999" />
      </svg>

      <!-- <ChevronDown class=" text-[#525866] w-4 h-4  shrink-0 ml-2" /> -->
    </SelectIcon>
  </SelectTrigger>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<style scoped>
.selectParent button[data-state='open'] svg {
  @apply -rotate-180 transition-all duration-300;
}

.selectParent button[data-state='close'] svg {
  @apply -rotate-180 transition-all duration-300;
}
</style>