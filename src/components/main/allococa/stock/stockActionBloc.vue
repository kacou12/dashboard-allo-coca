<template>
    <div class="">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" class="text-xs text-neutral-10 font-worksans">

                <DialogTrigger as-child>
                    <DropdownMenuItem
                        @click="$router.push({ name: AppRoute.STOCKS_PRODUCTS.name, params: { stockId: stock.id } })">
                        Voir les produits
                    </DropdownMenuItem>
                </DialogTrigger>


            </DropdownMenuContent>
        </DropdownMenu>

    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
    DialogTrigger
} from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUpdateOrderStatusMutation } from '@/composables/queries/allococa/useAllococaOrdersQueries';
import { AppRoute } from '@/constants/app-route';
import { orderStatusConfigEnumData, type OrderResponse } from '@/services/allococa/orders/order-type';
import type { StockResponse } from '@/services/allococa/stocks/stock-type';
import { MoreHorizontal } from 'lucide-vue-next';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';


const { stock } = defineProps<{
    stock: StockResponse
}>();



const toast = useToast();
const isFetched = ref(false);

const isLoading = ref(false);





</script>