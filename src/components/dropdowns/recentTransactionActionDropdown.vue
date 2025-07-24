<template>
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
                    <DropdownMenuItem v-if="transaction.status == TransactionStatusEnum.PENDING.value ||
                        transaction.status == TransactionStatusEnum.FAILED.value ||
                        transaction.status == TransactionStatusEnum.PROCESSING.value"
                        @click="contentModalAction = 'VALIDE'">Valider</DropdownMenuItem>
                </DialogTrigger>

                <DialogTrigger as-child>
                    <DropdownMenuItem v-if="transaction.status == TransactionStatusEnum.PENDING.value ||
                        transaction.status == TransactionStatusEnum.PROCESSING.value"
                        @click="contentModalAction = 'REJECT'">Rejeter</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger as-child>

                    <DropdownMenuItem v-if="transaction.retrying_status != null"
                        @click="contentModalAction = 'RESTART'">
                        Relancer la transaction
                    </DropdownMenuItem>
                </DialogTrigger>
            </DropdownMenuContent>
        </DropdownMenu>

        <!-- USER ACCOUNT MODAL -->
        <DialogContent class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans ">
            <article v-if="contentModalAction == 'SHOW'">

                <DialogHeader class="flex flex-row justify-between items-center border-b-[1px] border-neutral-200">
                    <DialogTitle>Resumé de la transaction</DialogTitle>
                    <!-- <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> -->


                    <!-- CLOSE ICON SVG -->
                    <DialogClose
                        class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <!-- <X class="w-4 h-4" />
                        <span class="sr-only">Close</span> -->
                        <close-icon></close-icon>

                    </DialogClose>


                </DialogHeader>
                <div class="text-sm px-6 space-y-5 pb-5 border-b-[1px] border-neutral-200">

                    <TransactionDetailsInfo :transaction="transaction"></TransactionDetailsInfo>
                </div>
                <!-- <DialogFooter class="flex gap-2 px-6 pb-6 ">


                    <div class="flex-1">
                        <Button @clik="open = false" class="py-[22px]  text-sm rounded-lg" variant="outline">
                            Annuler
                        </Button>

                    </div>
                    <Button class="flex-1 py-[22px] text-sm rounded-lg" variant="default" @click="open = false">
                        Valider la verification
                    </Button>

                </DialogFooter> -->
            </article>
            <article v-else-if="contentModalAction == 'VALIDE'">
                <DialogHeader class="flex flex-row justify-between items-center">
                    <DialogTitle>Valider la transaction</DialogTitle>

                    <!-- CLOSE ICON SVG -->
                    <DialogClose
                        class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                        <close-icon></close-icon>

                    </DialogClose>


                </DialogHeader>
                <section class="my-8 ">

                    <p class="text-sm text-neutral-20 text-center">Voulez-vous valider cette transaction ?</p>

                    <div class="flex items-center  justify-center gap-1">
                        <p class="text-sm text-neutral-20 text-center">Montant : </p>
                        <span class="text-md font-bold text-neutral-20 ">{{ formatPrice(transaction.amount) }} </span>

                    </div>


                </section>
                <DialogFooter class="flex gap-2 px-6 pb-6 ">

                    <!-- <Button class="flex-1 py-[22px]  text-sm rounded-lg" variant="outline">
    Rejeter la verification
</Button> -->
                    <Button class="flex-1 md:py-[22px]  text-sm rounded-lg font-medium" variant="outline"
                        @click="open = false">
                        Annuler
                    </Button>
                    <Button @click="validateTransactionHandler"
                        class="flex-1 md:py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                        Confirmer
                    </Button>
                </DialogFooter>

            </article>
            <article v-else-if="contentModalAction == 'REJECT'">
                <DialogHeader class="flex flex-row justify-between items-center">
                    <DialogTitle>Rejetée la transaction</DialogTitle>

                    <!-- CLOSE ICON SVG -->
                    <DialogClose
                        class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                        <close-icon></close-icon>

                    </DialogClose>


                </DialogHeader>


                <section class="my-8">

                    <p class="text-sm text-neutral-20 text-center">Voulez-vous rejeter cette transaction ?</p>

                </section>
                <DialogFooter class="flex gap-2 px-6 pb-6 ">

                    <!-- <Button class="flex-1 py-[22px]  text-sm rounded-lg" variant="outline">
                        Rejeter la verification
                    </Button> -->
                    <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                        @click="open = false">
                        Annuler
                    </Button>
                    <Button @click="rejectTransactionHandler"
                        class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                        Confirmer
                    </Button>
                </DialogFooter>

            </article>

        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import closeIcon from '@/components/svg/closeIcon.vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import rejectReasonModal from '@/components/users/modals/rejectReasonModal.vue'
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
import { useUpdateTransactionStatusMutation } from '@/composables/queries/useTransactionQueries'
import { TransactionStatusEnum } from '@/interfaces/datatable.interface'
import { RelaunchTransactionStatusEnum, type TransactionResponse } from '@/services/transactions/transaction-type'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import TransactionDetailsInfo from '../main/recentTransactions/tables/transactionDetailsInfo.vue'
import { formatPrice } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuthStore'
import { TransactionRouteApi } from '@/services/transactions/transaction-constants'
import { useLoaderStore } from '@/stores/useLoaderStore'

// useUpdateTransactionStatusMutation

const { transaction } = defineProps<{
    transaction: TransactionResponse
}>()


const { startLoading } = useLoaderStore()

const { mutateAsync: updateTransationStatus } = useUpdateTransactionStatusMutation(transaction.id)


const open = ref(false);

const toast = useToast();

const contentModalAction = ref<"SHOW" | "VALIDE" | "REJECT" | "RESTART">();


function copy(id: string) {
    navigator.clipboard.writeText(id)
}

const validateTransactionHandler = async () => {
    const testTran = { ...transaction };
    await updateTransationStatus({

        status: TransactionStatusEnum.SUCCESS.value
    })
    open.value = false;
    toast.success("La transaction a bien été validée");

}
const rejectTransactionHandler = async () => {
    await updateTransationStatus({
        status: TransactionStatusEnum.FAILED.value
    })
    open.value = false;
    toast.success("La transaction a bien été rejetée");

}


</script>