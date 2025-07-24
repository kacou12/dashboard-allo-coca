<template>
    <div class="item-adder">
        <div class="input-group">
            <Input v-model="newItem" type="text" placeholder="Ajouter un élément" @keyup.enter="addItem"
                class="rounded-r-none focus:ring-0" />
            <Button @click="addItem" :disabled="!newItem" class="rounded-l-none h-[40px]">+</Button>
        </div>

        <div v-if="items.length > 0" class="items-list max-h-[190px] overflow-y-scroll grid grid-cols-2 gap-x-2">
            <div v-for="(item, index) in items" :key="index" class="item">
                <span class="item-text ">{{ item }}</span>
                <button @click="removeItem(index)" class="remove-button">-</button>
            </div>
        </div>
        <div v-else class="no-items">
            Aucun élément ajouté
        </div>
    </div>
</template>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { Cross, DeleteIcon } from 'lucide-vue-next';
import { ref } from 'vue';

interface Props {
    initialItems?: string[];
}

const props = withDefaults(defineProps<Props>(), {
    initialItems: () => [],

});

const emit = defineEmits<{
    (e: 'update:items', items: string[]): void;
}>();

const newItem = ref('');
const items = ref<string[]>([...props.initialItems]);

const addItem = () => {
    if (newItem.value.trim()) {
        items.value.push(newItem.value.trim());
        newItem.value = '';
        emit('update:items', items.value);
    }
};

const removeItem = (index: number) => {
    items.value.splice(index, 1);
    emit('update:items', items.value);
};
</script>

<style scoped>
.item-adder {
    max-width: 500px;
    margin: 0 auto;
}

.input-group {
    display: flex;
    margin-bottom: 20px;
}

.item-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
}

.add-button {
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    font-size: 16px;
}

.add-button:hover {
    background-color: #45a049;
}

.items-list {
    border-top: 1px solid #eee;
    padding-top: 10px;
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 8px;
    background-color: #f9f9f9;
    border-radius: 4px;
}

.item-text {
    flex: 1;
}

.remove-button {
    padding: 6px 12px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.remove-button:hover {
    background-color: #d32f2f;
}

.no-items {
    text-align: center;
    color: #888;
    font-style: italic;
    padding: 20px 0;
}
</style>