<template>
    <!-- v-model:open="open" -->
    <Field v-slot="{ componentField, errorMessage, }" :name="name">
        <p class="text-sm text-neutral-20 my-4">Selectionner un motif</p>
        <div class="selectParent space-y-2">


            <Select v-model="modelValue" v-bind="componentField" v-model:open="open">
                <!-- <SelectTrigger class="min-w-[120px] max-w-[350px]  "> -->
                <SelectTrigger :class="[open ? 'ring-4 ring-primary-70 transition-all duration-300' : '', 'w-full ']">
                    <SelectValue placeholder="Motif" class="" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="document-illisible">
                            <div class=' py-1'> <span class="text-sm font-medium"> Document illisible </span>
                            </div>
                        </SelectItem>
                        <SelectItem value="document-incomplet">
                            <div class="py-1"> <span class="text-sm font-medium">Document incomplet </span>
                            </div>

                        </SelectItem>
                        <SelectItem value="document-expired">

                            <div class="py-1"> <span class="text-sm font-medium">Document expiré</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="document-non-conforme">

                            <div class="py-1"> <span class="text-sm font-medium">Document non conforme</span>
                            </div>
                        </SelectItem>
                        <!-- <SelectItem value="fraude">
    
                        <div class="py-1"> <span class="text-sm font-medium">Fausse identité ou fraude suspectée</span>
                        </div>
                    </SelectItem> -->
                        <SelectItem value="error-informations">

                            <div class="py-1"> <span class="text-sm font-medium">Erreur dans les informations</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="pays">

                            <div class="py-1"> <span class="text-sm font-medium">Document non valide dans le pays
                                </span>
                            </div>
                        </SelectItem>

                    </SelectGroup>
                </SelectContent>
            </Select>
            <div class="min-h-[20px] mt-2">
                <FadeInAnimation mode="out-in">

                    <small v-if="errorMessage"
                        class="app-form-item-error text-error-500 text-sm font-worksans font-normal ">
                        {{ errorMessage }}
                    </small>
                    <div v-else></div>
                </FadeInAnimation>
            </div>

        </div>
    </Field>
</template>

<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ref } from 'vue';
import { Field } from 'vee-validate';
import FadeInAnimation from '@/components/animations/fadeInAnimation.vue';

const open = ref(false);
const modelValue = defineModel({ type: String, required: true });


defineProps({
    name: {
        type: String,
        required: false,
        default: "rejectReason"
    }
})


</script>
<style scoped></style>