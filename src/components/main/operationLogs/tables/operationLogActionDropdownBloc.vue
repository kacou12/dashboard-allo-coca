<template>
    <div class="">
        <Dialog v-model:open="open">
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                        <span class="sr-only">Open menu</span>
                        <MoreHorizontal class="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="text-xs text-neutral-10 font-worksans">
                    <!-- DETAILS MODAL -->
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'SHOW'">
                            Voir les détails
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <!-- MODAL CONTENT -->
            <DialogContent class="max-w-[700px] font-worksans">
                <!-- SHOW DETAILS -->
                <article v-if="contentModalAction == 'SHOW'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Détails du log d'opération</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6 my-8">
                        <Tabs defaultValue="general">
                            <TabsList class="grid w-full grid-cols-3">
                                <TabsTrigger value="general">Général</TabsTrigger>
                                <TabsTrigger value="user">Utilisateur</TabsTrigger>
                                <TabsTrigger value="technical">Technique</TabsTrigger>
                            </TabsList>

                            <TabsContent value="general">
                                <div class="grid grid-cols-2 gap-y-4 p-4">
                                    <p class="text-sm text-neutral-20">ID:</p>
                                    <p>{{ operationLog.id }}</p>

                                    <p class="text-sm text-neutral-20">Titre:</p>
                                    <p>{{ operationLog.title }}</p>

                                    <p class="text-sm text-neutral-20">Méthode:</p>
                                    <p :class="getMethodColor(operationLog.method)" class="font-medium">
                                        {{ operationLog.method }}
                                    </p>

                                    <p class="text-sm text-neutral-20">Chemin:</p>
                                    <p class="break-all">{{ operationLog.path }}</p>

                                    <p class="text-sm text-neutral-20">Code:</p>
                                    <p>{{ operationLog.code }}</p>

                                    <p class="text-sm text-neutral-20">Message:</p>
                                    <div class="max-h-[300px] overflow-y-scroll">

                                        <!-- <vue-json-pretty :data="formatJson(operationLog.msg)" /> -->
                                        <vue-json-pretty v-if="operationLog.msg != ''"
                                            :data="JSON.parse(operationLog.msg)" />
                                        <p v-else>{{ formatJson(operationLog.msg) || operationLog.msg }}</p>
                                    </div>

                                    <p class="text-sm text-neutral-20">Statut:</p>
                                    <p :class="getStatusColor(operationLog.status)">{{ operationLog.status }}</p>

                                    <p class="text-sm text-neutral-20">Temps d'exécution:</p>
                                    <p :class="getTimeColor(operationLog.cost_time)">{{ operationLog.cost_time }} ms</p>

                                    <p class="text-sm text-neutral-20">Date d'opération:</p>
                                    <p>{{ formatDateTime(operationLog.opera_time) }}</p>

                                    <p class="text-sm text-neutral-20">Date de création:</p>
                                    <p>{{ formatDateTime(operationLog.created_time) }}</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="user">
                                <div class="grid grid-cols-2 gap-y-4 p-4">
                                    <p class="text-sm text-neutral-20">Email utilisateur:</p>
                                    <p>{{ operationLog.user_email || '-' }}</p>

                                    <p class="text-sm text-neutral-20">Téléphone utilisateur:</p>
                                    <p>{{ operationLog.user_phone || '-' }}</p>

                                    <p class="text-sm text-neutral-20">Adresse IP:</p>
                                    <p>{{ operationLog.ip }}</p>

                                    <p class="text-sm text-neutral-20">Pays:</p>
                                    <p>{{ operationLog.country || '-' }}</p>

                                    <p class="text-sm text-neutral-20">Région:</p>
                                    <p>{{ operationLog.region || '-' }}</p>

                                    <p class="text-sm text-neutral-20">Ville:</p>
                                    <p>{{ operationLog.city || '-' }}</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="technical">
                                <div class="space-y-4 p-4">
                                    <div>
                                        <p class="text-sm text-neutral-20 mb-1">Arguments:</p>
                                        <div class="bg-neutral-100 p-3 rounded-md overflow-auto max-h-[200px]">
                                            <pre class="text-xs font-mono">{{ formatJson(operationLog.args) }}</pre>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-y-4">
                                        <p class="text-sm text-neutral-20">Trace ID:</p>
                                        <p class="font-mono text-xs">{{ operationLog.trace_id }}</p>

                                        <p class="text-sm text-neutral-20">Agent utilisateur:</p>
                                        <p class="break-all text-xs">{{ operationLog.user_agent }}</p>

                                        <p class="text-sm text-neutral-20">Navigateur:</p>
                                        <p>{{ operationLog.browser }}</p>

                                        <p class="text-sm text-neutral-20">Système d'exploitation:</p>
                                        <p>{{ operationLog.os }}</p>

                                        <p class="text-sm text-neutral-20">Appareil:</p>
                                        <p>{{ operationLog.device }}</p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </article>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import closeIcon from '@/components/svg/closeIcon.vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'
import type { OperationLogResponse } from '@/services/operation-logs/operation-log-type'
import { ref } from 'vue'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const { operationLog } = defineProps<{
    operationLog: OperationLogResponse
}>();

const open = ref(false);
const contentModalAction = ref<"SHOW">();

function formatDateTime(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString();
}

function formatJson(jsonString: string): string {
    try {
        const parsed = JSON.parse(jsonString);
        return JSON.stringify(parsed, null, 2);
    } catch (e) {
        return jsonString || '-';
    }
}

function getMethodColor(method: string): string {
    switch (method) {
        case 'GET': return 'text-blue-500';
        case 'POST': return 'text-green-500';
        case 'PUT': return 'text-yellow-500';
        case 'DELETE': return 'text-red-500';
        case 'PATCH': return 'text-purple-500';
        default: return 'text-gray-500';
    }
}

function getStatusColor(status: number): string {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 400 && status < 500) return 'text-yellow-500';
    if (status >= 500) return 'text-red-500';
    return 'text-gray-500';
}

function getTimeColor(time: number): string {
    if (time > 1000) return 'text-red-500';
    if (time > 500) return 'text-yellow-500';
    return 'text-green-500';
}
</script>