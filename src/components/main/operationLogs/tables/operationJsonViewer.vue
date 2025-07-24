<template>
    <div class="json-viewer text-xs font-mono">
        <div v-if="Array.isArray(parsedValue)">
            <div class="flex items-start">
                <button @click="toggleCollapse" class="mr-1 text-gray-500 focus:outline-none">
                    {{ collapsed ? '►' : '▼' }}
                </button>
                <span class="text-gray-500">[</span>
            </div>
            <div v-if="!collapsed" class="pl-4">
                <div v-for="(item, index) in parsedValue" :key="index" class="py-1">
                    <JsonViewer :value="item" />
                    <span v-if="index < parsedValue.length - 1" class="text-gray-500">,</span>
                </div>
            </div>
            <div v-else class="text-gray-400 italic pl-4">Array({{ parsedValue.length }})</div>
            <span class="text-gray-500">]</span>
        </div>

        <div v-else-if="typeof parsedValue === 'object' && parsedValue !== null">
            <div class="flex items-start">
                <button @click="toggleCollapse" class="mr-1 text-gray-500 focus:outline-none">
                    {{ collapsed ? '►' : '▼' }}
                </button>
                <span class="text-gray-500">{</span>
            </div>
            <div v-if="!collapsed" class="pl-4">
                <div v-for="(value, key) in parsedValue" :key="key" class="py-1">
                    <span class="text-blue-600">"{{ key }}"</span>
                    <span class="text-gray-500">: </span>
                    <JsonViewer :value="value" />
                    <span v-if="!isLastKey(key.toString())" class="text-gray-500">,</span>
                </div>
            </div>
            <div v-else class="text-gray-400 italic pl-4">Object({{ Object.keys(parsedValue).length }} propriétés)</div>
            <span class="text-gray-500">}</span>
        </div>

        <span v-else-if="typeof parsedValue === 'string'" class="text-green-600">"{{ parsedValue }}"</span>
        <span v-else-if="typeof parsedValue === 'number'" class="text-orange-600">{{ parsedValue }}</span>
        <span v-else-if="typeof parsedValue === 'boolean'" class="text-purple-600">{{ parsedValue }}</span>
        <span v-else-if="parsedValue === null" class="text-gray-600">null</span>
        <span v-else>{{ parsedValue }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
    value: any;
}>();

const collapsed = ref(false);
const parsedValue = computed(() => props.value);

function toggleCollapse() {
    collapsed.value = !collapsed.value;
}

function isLastKey(key: string): boolean {
    const keys = Object.keys(parsedValue.value);
    return key === keys[keys.length - 1];
}
</script>

<style scoped>
.json-viewer {
    line-height: 1.4;
}
</style>