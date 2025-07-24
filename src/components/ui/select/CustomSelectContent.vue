<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
    SelectContent,
    type SelectContentEmits,
    type SelectContentProps,
    SelectPortal,
    SelectViewport,
    useForwardPropsEmits,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { SelectScrollDownButton, SelectScrollUpButton } from '.'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(),
    {
        position: 'popper',
    },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const onBeforeLeave = (el: any) => {
    // Force l'application des styles de fermeture
    el.setAttribute('data-state', 'closed');
};

const onAfterLeave = () => {
    // Nettoyage si nécessaire
};
</script>

<template>
    <SelectPortal>
        <Transition appear @before-leave="onBeforeLeave" @after-leave="onAfterLeave">
            <SelectContent v-bind="{ ...forwarded, ...$attrs, unmount: false }" :class="cn(
                'relative z-50 max-h-96 min-w-52 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
                'data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2',
                position === 'popper' &&
                'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                props.class,
            )">
                <SelectScrollUpButton />
                <SelectViewport
                    :class="cn('p-1', position === 'popper' && 'h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]')">
                    <slot />
                </SelectViewport>
                <SelectScrollDownButton />
            </SelectContent>
        </Transition>
    </SelectPortal>
</template>

<style>
/* Assurez-vous que les animations sont bien définies */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@keyframes slideInFromTop {
    from {
        transform: translateY(10px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideOutToTop {
    from {
        transform: translateY(0);
        opacity: 1;
    }

    to {
        transform: translateY(10px);
        opacity: 0;
    }
}

.animate-in {
    animation: fadeIn 200ms ease-out, slideInFromTop 200ms ease-out;
}

.animate-out {
    animation: fadeOut 200ms ease-out, slideOutToTop 200ms ease-out;
}
</style>