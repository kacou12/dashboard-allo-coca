<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                <span class="sr-only">Open menu</span>
                <MoreVerticalIcon class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="text-xs text-neutral-10 font-worksans">


            <DropdownMenuItem @click="$router.push({ name: 'recent-transactions' })">
                Voir toutes les transactions
            </DropdownMenuItem>

            <!-- <DropdownMenuItem>Valider</DropdownMenuItem>
                <DropdownMenuItem>Rejeter</DropdownMenuItem> -->
        </DropdownMenuContent>
    </DropdownMenu>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVerticalIcon } from 'lucide-vue-next'

import { ref } from 'vue'




function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>