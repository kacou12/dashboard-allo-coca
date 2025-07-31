<template>
    <div class="space-y-2 bg-neutral-80">

        <section class="flex flex-col gap-2 p-4 rounded-xl bg-white">
            <div class="flex justify-between items-center">
                <img class="w-[33px] h-[33px]" src="@/assets/images/logos/wave.png" alt="">
                <p class="text-neutral-10 font-bold text-xl font-merriweathersans">10 200 F CFA</p>
            </div>
            <div>
                <p class="text-neutral-40 text-sm">Envoie à 0506972247 (Kacou Nathanael)</p>
            </div>

        </section>

        <!-- detail achat -->
        <div class="text-sm  space-y-3  p-4 bg-white rounded-xl pb-5  border-neutral-200">

            <!-- Transaction Details Section -->
            <section class="transaction-details space-y-3">
                <h2 class="text-[16px] font-medium text-black font-worksans">Resume du transfert</h2>

                <div class="flex iems-center justify-between">
                    <p class=" text-neutral-40">Montant envoyer</p>
                    <p class=" text-neutral-10 font-medium">10 000 F CFA</p>
                </div>
                <div class="flex iems-center justify-between">
                    <p class=" text-neutral-40">Frais</p>
                    <p class=" text-neutral-10 font-medium">
                        200 F CFA
                    </p>
                </div>

                <div class="flex iems-center justify-between">
                    <p class=" text-neutral-40">Total payer</p>
                    <p class=" text-neutral-10 font-medium">10 200 F CFA</p>
                </div>

                <div class="flex iems-center justify-between">
                    <p class=" text-neutral-40">Emetteur</p>
                    <p class=" text-neutral-10 font-medium">Kacou Nathanael</p>
                </div>
                <div class="flex iems-center justify-between">
                    <p class=" text-neutral-40">Numéro béneficiaire</p>
                    <p class=" text-neutral-10 font-medium">0107565605</p>
                </div>
                <div class="flex iems-center justify-between">
                    <p class=" text-neutral-40">Reseau</p>
                    <p class=" text-neutral-10 font-medium">Wave</p>
                </div>


            </section>


        </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style scoped></style>