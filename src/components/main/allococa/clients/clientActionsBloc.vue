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
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'SHOW'">
                            Voir les details
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <!-- @click="$router.push({ name: AppRoute.ADMIN_UPDATE_ROLE.name, params: { id: role.id } })" -->
                    <DialogTrigger as-child>
                        <DropdownMenuItem>
                            Modifier</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'DELETE'">Supprimer</DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans">

                <article v-if="contentModalAction == 'DELETE'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Supprimer ce rôle</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6 my-8 text-center">
                        <p>Êtes-vous sûr de vouloir supprimer ce rôle ?</p>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6">
                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="deleteRoleHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </article>
                <article v-else-if="contentModalAction == 'SHOW'" class="relative">
                    <div v-if="isLoading"
                        class="absolute top-0 left-0 right-0 bottom-0  bg-white/40 flex items-center justify-center">
                        <div role="status">
                            <svg aria-hidden="true"
                                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Détails du rôle</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6 my-8">
                        <!-- <section class="space-y-2">
                            <p class="text-sm text-neutral-20">ID du rôle</p>
                            <div class="flex items-center gap-2">
                                <Input disabled type="text" value="" v-model="roleState.id" class="flex-1" />
                                <Button @click="copy(roleState.id)" variant="outline" class="h-10 w-10 p-0">
                                    <span class="sr-only">Copier l'ID</span>
                                    <ClipboardCopy class="h-4 w-4" />
                                </Button>
                            </div>
                        </section>

                        <section class="space-y-2" @click="showState">
                            <p class="text-sm text-neutral-20">Nom du rôle</p>
                            <Input disabled type="text" id="name" v-model="roleState.name" class="" />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Description</p>
                            <Textarea disabled v-model="roleState.description" />
                        </section> -->

                    </div>
                </article>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import closeIcon from '@/components/svg/closeIcon.vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import DialogClose from '@/components/ui/dialog/DialogClose.vue';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-vue-next';
// import { useDeleteRoleMutation, useUpdateRoleMutation } from '@/composables/queries/useRoleQueries'
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

// import { useDeleteOnePermissionMutation } from '@/composables/queries/useRoleQueries';
import type { ClientResponse } from '@/services/allococa/clients/client-type';
// import ManageRolePermissions from '../manageRolePermissions.vue'

const { client } = defineProps<{
    client: ClientResponse
}>();

// const { mutateAsync: deleteOnePermission } = useDeleteOnePermissionMutation();

const toast = useToast();
const isFetched = ref(false);

const isLoading = ref(false);




const deleteRoleHandler = async () => {
    // await deleteRoleAdmin(roleState.value.id);
    // open.value = false;
    // toast.success("Le rôle a bien été supprimé");
}

const open = ref(false);
const contentModalAction = ref<"SHOW" | "UPDATE" | "DELETE">();

const copy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("ID copié dans le presse-papier");
}


</script>