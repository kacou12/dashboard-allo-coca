<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Input } from '@/components/ui/input'; // Adjust path based on your Shadcn setup
import { Button } from '@/components/ui/button'; // Adjust path based on your Shadcn setup
import { Building, User, Mail, Globe } from 'lucide-vue-next';
import CommonButton from '../buttons/commonButton.vue';

const props = defineProps<{
    companyName: string;
    representativeName: string;
    email: string;
    website: string;
}>();

const emit = defineEmits(['update:companyName', 'update:representativeName', 'update:email', 'update:website', 'next']);

const handleNext = () => {
    // Add validation here if needed before moving to the next step
    emit('next');
};
</script>

<template>

    <h2 class="text-[28px] font-bold text-center text-gray-800 font-merriweathersans mb-1">Informations sur
        l'entreprise</h2>
    <p class="text-center  mb-8 text-neutral-20">Veuillez indiquer les informations de votre
        entreprise</p>
    <form @submit.prevent="handleNext" class="space-y-4">
        <div>
            <label for="companyName" class="sr-only">Nom de l'entreprise</label>
            <div class="relative">
                <Input id="companyName" type="text" placeholder="Nom de l'entreprise" :model-value="props.companyName"
                    @input="emit('update:companyName', ($event.target as HTMLInputElement).value)" class="pl-10" />
                <Building class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
        </div>

        <div>
            <label for="representativeName" class="sr-only">Nom du représentant</label>
            <div class="relative">
                <Input id="representativeName" type="text" placeholder="Nom du représentant"
                    :model-value="props.representativeName"
                    @input="emit('update:representativeName', ($event.target as HTMLInputElement).value)"
                    class="pl-10" />
                <User class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
        </div>

        <div>
            <label for="email" class="sr-only">Email</label>
            <div class="relative">
                <Input id="email" type="email" placeholder="Email" :model-value="props.email"
                    @input="emit('update:email', ($event.target as HTMLInputElement).value)" class="pl-10" />
                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
        </div>

        <div>
            <label for="website" class="sr-only">Site web de l'entreprise</label>
            <div class="relative">
                <Input id="website" type="url" placeholder="Site web de l'entreprise" :model-value="props.website"
                    @input="emit('update:website', ($event.target as HTMLInputElement).value)" class="pl-10" />
                <Globe class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <p class="text-neutral-30 text-[14px] mt-2">(le cas échéant)</p>

        </div>


        <CommonButton type="default" @action="handleNext" title="Continuez" class="w-full"></CommonButton>
    </form>
</template>