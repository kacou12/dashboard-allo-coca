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

                    <!-- OPEN USER ACCOUNT MODAL -->
                    <DialogTrigger as-child>

                        <DropdownMenuItem @click="contentModalAction = 'SHOW'">
                            Voir les details
                        </DropdownMenuItem>
                    </DialogTrigger>


                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'VALIDATED'">Valider</DropdownMenuItem>
                    </DialogTrigger>

                </DropdownMenuContent>
            </DropdownMenu>

            <!-- USER ACCOUNT MODAL -->
            <DialogContent class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans ">

                <article v-if="contentModalAction == 'VALIDATED'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Signaler comme resolu </DialogTitle>

                        <!-- CLOSE ICON SVG -->
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                            <close-icon></close-icon>

                        </DialogClose>


                    </DialogHeader>
                    <div class="text-sm px-6   my-8  text-center">
                        <!-- content -->
                        <p>Voulez vous vraiment le signaler comme resolu ?</p>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <!-- <Button class="flex-1 py-[22px]  text-sm rounded-lg" variant="outline">
                            Rejeter la verification
                        </Button> -->
                        <Button class="flex-1 md:py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="confirmAdminHandler"
                            class="flex-1 md:py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                    <!-- <common-modal></common-modal> -->
                </article>
                <article v-else-if="contentModalAction == 'SHOW'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Detail du AdminAlert</DialogTitle>

                        <!-- CLOSE ICON SVG -->
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                            <close-icon></close-icon>

                        </DialogClose>


                    </DialogHeader>
                    <div class="text-sm px-6 my-8">
                        <!-- content -->
                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">ID</p>
                            <Input disabled type="text" id="id" v-model="AdminAlertState.id" class="" />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Titre</p>
                            <Input type="text" id="title" placeholder="Titre" v-model="AdminAlertState.title" class=""
                                required />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Description</p>
                            <Input v-model="AdminAlertState.description" placeholder="Description" required />
                        </section>

                        <CommonSelect v-model="AdminAlertState.type" title="Type" :elements="[
                            { name: 'Transactions échouées', value: 'failed_transactions' },
                            { name: 'Erreur système', value: 'system_error' },
                            { name: 'Problème de fournisseur', value: 'provider_issue' },
                        ]">

                        </CommonSelect>


                        <CommonSelect v-model="AdminAlertState.severity" title="Sévérité" :elements="[
                            { name: 'Faible', value: 'low' },
                            { name: 'Moyenne', value: 'medium' },
                            { name: 'Élevée', value: 'high' },
                        ]">

                        </CommonSelect>



                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Résolu</p>
                            <div class="flex items-center space-x-2">
                                <input type="checkbox" id="is_resolved" v-model="AdminAlertState.is_resolved"
                                    class="rounded" />
                                <label for="is_resolved">Alerte résolue</label>
                            </div>
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Date de création</p>
                            <Input disabled type="text" v-model="AdminAlertState.created_at" />
                        </section>



                        <section class="space-y-2" v-if="AdminAlertState.is_resolved">
                            <p class="text-sm text-neutral-20">Date de résolution</p>
                            <Input disabled type="text" v-model="AdminAlertState.resolved_at" />
                        </section>

                        <!-- <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Métadonnées</p>
                            <textarea v-model="metadataString" placeholder="Métadonnées (JSON)"
                                class="w-full rounded-md border border-neutral-50 bg-transparent px-3 py-2 text-sm"
                                rows="4"></textarea>
                        </section> -->
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <!-- <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="createAdminAlertHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button> -->
                    </DialogFooter>
                    <!-- <common-modal></common-modal> -->
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'
import { useUpdateAdminAlertMutation } from '@/composables/queries/useAdminAlertsQueries'

import Input from '@/components/ui/input/Input.vue'
import type { AdminAlertResponse } from '@/services/admin-alerts/admin-alerts-type'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

const { AdminAlert } = defineProps<{
    AdminAlert: AdminAlertResponse
}>();
const { mutateAsync: updateAdminAlert } = useUpdateAdminAlertMutation(AdminAlert.id)


const toast = useToast();

const AdminAlertState = ref({ ...AdminAlert });


const confirmAdminHandler = async () => {
    await updateAdminAlert({
        is_resolved: true
    });
    open.value = false;
    toast.success("Le AdminAlert a bien été supprimée");
}

const open = ref(false);
const contentModalAction = ref<"SHOW" | "VALIDATED">();


function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>