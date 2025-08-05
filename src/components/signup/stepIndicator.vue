<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    isActive: boolean;
}>();
</script>

<template>
    <div :class="[
        'w-3 h-3 rounded-full transition-colors duration-300',
        props.isActive ? 'bg-purple-600' : 'bg-gray-300'
    ]"></div>
</template>