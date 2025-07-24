<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>
            <div class="flex justify-between p-2 border font-worksans rounded-xl cursor-pointer gap-3 items-center"
                @click="openFile">
                <section class="flex items-center gap-3">

                    <div class="h-full w-[32px]">
                        <img src="@/assets/images/jpgIcon.png" alt="Likambo Logo" />
                    </div>
                    <div class="flex flex-col max-w-[200px]">
                        <!-- <p class="text-xs font-medium truncate">{{ document.public_id }}</p> -->
                        <p class="text-xs font-medium overflow-hidden truncate">
                            {{ document.public_id }}</p>
                        <!-- <p class="text-[10px] text-neutral-40">{{  }}</p> -->
                    </div>
                </section>




                <section class="w-[20px]">
                    <img src="@/assets/images/file-down.png" alt="Likambo Logo" />
                </section>
            </div>
        </DialogTrigger>
        <DialogContent class=" font-worksans h-fit w-fit">

            <img v-show="isLoaded" :src="document.filepath" alt="" class="bg-cover" @load="loaded">




        </DialogContent>

    </Dialog>










    <!-- <div>
        <img :src="document.filepath" class="w-full h-full" alt="">
    </div> -->
</template>

<script setup lang="ts">
import type { DocumentFile } from '@/services/global.type';
import { ref, type PropType } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox'
import CommonModal from '../common/commonModal.vue';
import { Dialog } from '../ui/dialog';
import DialogTrigger from '../ui/dialog/DialogTrigger.vue';
import DialogContent from '../ui/dialog/DialogContent.vue';

const open = ref(false);

const isLoaded = ref(false);
const isLoading = ref(false);

const loaded = () => {
    isLoaded.value = true;
    isLoading.value = false;
};

const { document } = defineProps({
    document: {
        type: Object as PropType<DocumentFile>,
        required: true
    }
})
const visibleRef = ref(false)
const indexRef = ref(0) // default 0
const imgsRef = ref([document.filepath])

const onHide = () => {
    open.value = false;
    visibleRef.value = false
}

const openFile = async () => {
    visibleRef.value = true
}

</script>

<style scoped></style>