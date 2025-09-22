<template>
    <div>

        <CustomSwitch :defaultChecked="defaultActive" :checked="isActive" class="w-full"
            @update:checked="$emit('update:modelValue', $event)">
            <template #thumb>
                <div class="w-full h-full  relative">

                    <div v-if="isActive" class="  w-full 
                       flex  bg-primary">
                        <p class="text-[8px] text-[#888888]">Disponible</p>
                    </div>


                    <div v-else class="  w-full 
                        bg-neutral-60">

                        <p class="text-[8px] text-[#888888]">Indisponible</p>
                    </div>
                </div>
            </template>
        </CustomSwitch>
    </div>


</template>
<script setup lang="ts">
import { Switch } from '@/components/ui/switch';
import CustomSwitch from '../custom-ui/customSwitch.vue';

// import { Icon } from 'lucide-vue-next';

const isActive = defineModel({ type: Boolean })
const { defaultActive } = defineProps({
    defaultActive: {
        type: Boolean, default: false
    }
})

// const isDark = ref(false);
// const toggleTheme = () => {
//     isDark.value = !isDark.value
// }
</script>
