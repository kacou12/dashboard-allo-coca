<template>
    <div class="flex gap-3 items-center">

        <AdminConfirmModal :id="admin.id" :default-active="testSwicth" :confirm-handler="confirmHandler">
        </AdminConfirmModal>

        <section class="flex items-center gap-2 font-worksans cursor-pointer"
            @click="$router.push({ name: 'administration-user', params: { id: admin.id } })">

            <!-- <img class="w-11 h-11 rounded-full" :src="(admin.avatar as string)" alt="User" /> -->
            <img class="w-11 h-11 rounded-full" src="https://picsum.photos/200/300" alt="User" />
            <section class="flex flex-col gap-1">
                <p class="text-sm text-neutral-10 font-medium">{{ admin.firstname }} {{ admin.lastname }}</p>
                <p class="text-sm text-neutral-20">+225 0787995058</p>
            </section>
        </section>
        <section>

        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminConfirmModal from './adminConfirmModal.vue';
import type { PropType } from 'vue';
import type { AdminResponse } from '@/services/admin/admin-type';
import { useUpdateAdminMutation } from '@/composables/queries/useAdminQueries';
import { useToast } from 'vue-toastification';
const { admin } = defineProps({
    admin: {
        required: true,
        type: Object as PropType<AdminResponse>
    }

})
const testSwicth = ref(admin.active);
const toast = useToast();

const { mutateAsync: updateAdminMutate, isPending, isSuccess } = useUpdateAdminMutation(admin.id)

// TODO: update admin
const confirmHandler = async () => {
    // await updateAdminMutate({ active: !admin.active });
    // testSwicth.value = !testSwicth.value;
    toast.success('Admin updated successfully');
}



</script>

<style scoped></style>