<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open">
        <template #trigger>

            <Button class=" py-[22px]  text-sm rounded-lg" variant="outline">
                Rejeter la verification
            </Button>
            <slot></slot>
        </template>

        <template #title>
            <span>Quel est le motif du rejet ?</span>
        </template>
        <template #content>
            <section class="user-informations space-y-3">
                <p class="font-medium">Êtes-vous sûr(e) de vouloir rejeter cette vérification ?</p>

                <p class="text-neutral-20">Nous comprenons que cette décision peut avoir un impact
                    important pour
                    l’utilisateur.
                    Assurez-vous que le motif de rejet sélectionné est précis et justifié pour éviter
                    toute
                    confusion ou frustration.</p>

            </section>

            <RejectReasonSelect v-model="rejectReason" class="my-5"></RejectReasonSelect>

            <Textarea v-model="comment" placeholder="Commentaire pour le motif de rejet" />
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 pb-5 w-full">

                <Button class="flex-1 py-[22px] text-sm rounded-lg" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="rejectUserVerificationHandler" class="flex-1 py-[22px] text-sm rounded-lg"
                    variant="destructive">
                    Confirmer le rejet
                </Button>
            </div>
        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonModal from '@/components/common/commonModal.vue'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import RejectReasonSelect from '../selects/rejectReasonSelect.vue';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateUserVerificationMutation } from '@/composables/queries/useUsersVerificationQueries';
import { UserVerificationStatusEnum, type UserVerificationResponse } from '@/services/user-verification/user-verification.type';
import { useToast } from 'vue-toastification';



const toast = useToast();
const { userVerification } = defineProps<{
    userVerification: UserVerificationResponse
}>()


const { mutateAsync: updateUserVerificationStatus } = useUpdateUserVerificationMutation(userVerification.id)

const rejectUserVerificationHandler = async () => {
    await updateUserVerificationStatus({
        message: comment.value,
        reason: rejectReason.value,
        status: UserVerificationStatusEnum.REFUSED
    })
    open.value = false;
    toast.success("La demande a bien été rejetée");

}

const open = ref(false);

const rejectReason = ref('');
const comment = ref('');
</script>