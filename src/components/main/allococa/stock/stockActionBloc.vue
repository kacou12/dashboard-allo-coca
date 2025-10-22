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
                    <DropdownMenuItem
                        @click="$router.push({ name: AppRoute.STOCKS_PRODUCTS.name, params: { stockId: stock.id, categoryId: stock.category_id } })">
                        Voir les produits
                    </DropdownMenuItem>

                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'SHOW'">
                            Voir les détails
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <!-- <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'UPDATE'">
                            Modifier
                        </DropdownMenuItem>
                    </DialogTrigger> -->

                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'DELETE'">
                            Supprimer
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans">

                <!-- Modal de suppression -->
                <article v-if="contentModalAction == 'DELETE'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Supprimer ce stock</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6 my-8 text-center">
                        <p>Êtes-vous sûr de vouloir supprimer ce stock ?</p>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6">
                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="deleteStockHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </article>

                <!-- Modal des détails -->
                <article v-else-if="contentModalAction == 'SHOW'" class="relative">
                    <!-- <div class="absolute top-0 left-0 right-0 bottom-0 bg-white/40 flex items-center justify-center">
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
                    </div> -->
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Détails du stock</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6 my-8">
                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">ID du stock</p>
                            <div class="flex items-center gap-2">
                                <Input disabled type="text" v-model="stockState.id" class="flex-1" />
                                <Button @click="copy(stockState.id)" variant="outline" class="h-10 w-10 p-0">
                                    <span class="sr-only">Copier l'ID</span>
                                    <ClipboardCopy class="h-4 w-4" />
                                </Button>
                            </div>
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Nom du stock</p>
                            <Input disabled type="text" v-model="stockState.name" class="" />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Description</p>
                            <Textarea disabled v-model="stockState.description" />
                        </section>
                    </div>
                </article>

                <!-- Modal de modification -->
                <article v-else-if="contentModalAction == 'UPDATE'" class="relative">
                    <!-- <div class="absolute top-0 left-0 right-0 bottom-0 bg-white/40 flex items-center justify-center">
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
                    </div> -->
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Modifier le stock</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6 my-8">
                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Nom du stock</p>
                            <Input type="text" v-model="stockState.name" class="" />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Description</p>
                            <Textarea v-model="stockState.description" />
                        </section>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6">
                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="updateStockHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Enregistrer
                        </Button>
                    </DialogFooter>
                </article>

            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import closeIcon from '@/components/svg/closeIcon.vue'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AppRoute } from '@/constants/app-route';
import type { StockResponse } from '@/services/allococa/stocks/stock-type';
import { MoreHorizontal, ClipboardCopy } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import Input from '@/components/ui/input/Input.vue';
import { useDeleteAllococaStockMutation, useUpdateAllococaStockMutation } from '@/composables/queries/allococa/useAllococaStocksQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
// Import vos services de stock
// import { deleteStock, updateStock } from '@/services/allococa/stocks/stock-service';

const props = defineProps<{
    stock: StockResponse
}>();



const { mutateAsync: updateStock } = useUpdateAllococaStockMutation(props.stock.id);
const { mutateAsync: deleteStock } = useDeleteAllococaStockMutation(props.stock.id);


const toast = useToast();
const isFetched = ref(false);
const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore(

);
const open = ref(false);
const contentModalAction = ref<"SHOW" | "UPDATE" | "DELETE">();

const stockState = ref<{
    id: string;
    name: string;
    description: string;
}>({
    id: props.stock.id,
    name: props.stock.name || '',
    description: props.stock.description || ''
});

const updateStockHandler = async () => {
    startLoading();
    await updateStock(stockState.value);
    open.value = false;
    toast.success("Le stock a bien été modifié");
}

const deleteStockHandler = async () => {
    startLoading();
    await deleteStock(stockState.value.id);
    open.value = false;
    toast.success("Le stock a bien été supprimé");
}

const copy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID copié dans le presse-papier");
}

// Réinitialiser les données du stock à l'ouverture du modal
watch(open, (newValue) => {
    if (newValue) {
        stockState.value = {
            id: props.stock.id,
            name: props.stock.name || '',
            description: props.stock.description || ''
        };
    }
});
</script>