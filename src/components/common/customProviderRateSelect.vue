<template>
    <!-- v-model:open="open" -->
    <div class="w-full">


        <!-- <Select @update:model-value="$emit('update:modelValue', $event)" v-model:open="open"> -->
        <Select v-model="currentSelected">
            <!-- <SelectTrigger class="min-w-[120px] max-w-[350px]  "> -->
            <SelectTrigger class="space-x-1"
                :class="[`${borderColor}`, open ? 'ring-4 ring-primary-70 transition-all duration-300' : '', `${defaultWidth}`]">
                <slot name="icon"></slot>
                <SelectValue :placeholder="title" class="text-[#525866]">
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="element in elements" :key="element.value" :value="element.value">
                        <div class='py-1 flex items-center gap-2'>

                            <span class="text-sm font-medium"> {{ element.name }} </span>
                            <span class="text-neutral-30">
                                <img :src="`https://flagcdn.com/16x12/${element.countryIsoCode.toLowerCase()}.png`"
                                    alt="">
                            </span>
                        </div>
                        <!-- <CommonSelect v-if="isFetchedProvider"
                                    v-model="issuersProviderRateActionState.provider_id"
                                    border-color="border-neutral-60" default-width="w-full" class="w-full"
                                    title="Choix du provider"
                                    :elements="groupedIssuerRates!.providers.map((provider) => ({ name: `${provider.provider.name}(${provider.provider.country.name})`, value: provider.provider_id }))">
                                </CommonSelect> -->
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>
<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { ref, type PropType } from 'vue';
const open = ref(false);
const currentSelected = defineModel({ type: String });

defineProps({
    title: {
        type: String,
        required: true
    },
    elements: {
        type: Array as PropType<{ name: string, value: string, countryIsoCode: string }[]>,
        required: true
    },
    defaultWidth: {
        type: String as PropType<"w-fit" | "w-full">,
        required: false,
        default: "w-fit"
    },
    borderColor: {
        type: String as PropType<"border-neutral-60" | "border-input">,
        required: false,
        default: "border-input"
    }
})
</script>