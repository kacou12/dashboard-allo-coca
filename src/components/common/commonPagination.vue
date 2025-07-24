<template>
    <Pagination v-slot="{ page }" :items-per-page="itemsPerPage" :total="total" :sibling-count="isSm ? 1 : 3" show-edges
        :page="currentPage">
        <PaginationList v-slot="{ items }" class="flex justify-between p-4" v-if="!isSm">
            <!-- <PaginationFirst /> -->
            <PaginationPrev @click="emit('prevPage')" />
            <div class="flex items-center gap-1">

                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                        <Button @click="emit('goToPage', item.value)"
                            :class="['min-w-12 h-10 p-0 border-none px-1', item.value === page ? '' : 'text-neutral-40']"
                            :variant="item.value === page ? 'secondary' : 'outline'">
                            {{ item.value }}
                        </Button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>
            </div>

            <PaginationNext @click="emit('nextPage')" />
            <!-- <PaginationLast /> -->
        </PaginationList>
        <PaginationList v-slot="{ items }" class="flex flex-col gap-4 my-2" v-else>
            <div class="flex items-center justify-center gap-1 flex-wrap">

                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                        <Button @click="emit('goToPage', item.value)"
                            :class="['min-w-12 h-10 p-0 border-none', item.value === page ? '' : 'text-neutral-40']"
                            :variant="item.value === page ? 'secondary' : 'outline'">
                            {{ item.value }}
                        </Button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>
            </div>

            <section class="flex justify-between gap-2">
                <PaginationPrev @click="emit('prevPage')" />


                <PaginationNext @click="emit('nextPage')" />
            </section>


        </PaginationList>
    </Pagination>
</template>
<script setup lang="ts">
import {
    Button,
} from '@/components/ui/button';

import {
    Pagination,
    PaginationEllipsis,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev
} from '@/components/ui/pagination';
import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

// const currentPage = defineModel({ type: Number });


const emit = defineEmits(['nextPage', 'prevPage', 'goToPage']);
const { width, height, } = useWindowSize()

const isSm = computed(() => width.value <= 480);


defineProps({
    total: {
        type: Number,
        default: 100
    },
    currentPage: {
        type: Number,
        default: 1
    },
    itemsPerPage: {
        type: Number,
        default: 10
    }
})


</script>