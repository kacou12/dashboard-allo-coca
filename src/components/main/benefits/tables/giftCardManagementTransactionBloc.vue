<template>
    <div>
        <!-- @click="$router.push({ name: 'administration-user', params: { id: 1 } })" -->
        <section class="flex items-center gap-3 font-worksans">

            <img class="w-11 h-11 rounded-full" src="/src/assets/images/gift/apple-card.png" alt="User" />
            <section class="flex flex-col gap-1">
                <p class="text-sm text-neutral-10 font-medium">{{ purchasingCard.title }}</p>
                <p class="text-sm text-neutral-20">{{ purchasingCard.code }}</p>
            </section>


        </section>
        <section>

        </section>
    </div>



</template>

<script setup lang="ts">
import type { PurChasingCardType } from '@/interfaces/giftCard.interface';
import type { PropType } from 'vue';


const { purchasingCard } = defineProps({
    purchasingCard: {
        type: Object as PropType<PurChasingCardType>,
        required: true

    }

})

const defaultImage = new URL(purchasingCard.img, import.meta.url).href;
</script>

<style scoped></style>