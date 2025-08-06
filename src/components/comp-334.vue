<template>
  <div class="overflow-y-auto max-h-[350px]">

    <Accordion type="single" class="w-full" collapsible v-model="currentSelected">
      <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value" class="my-2 border-b-0">
        <AccordionTrigger
          :class="currentSelected == item.value ? 'border-[2px] border-primary-50' : 'border-transparent'"
          class="space-y-4 p-4 bg-[#FFEEDC] text-start rounded-lg relative">
          <!-- {{ item.title }} -->
          <div class="">
            <p class="text-neutral-20 text-xs">07/2024</p>
            <p class="font-merriweathersans text-[14px] font-bold">18 595 F CFA</p>
          </div>
          <div class="absolute right-10 top-2">
            <CheckCircleIcon class="text-primary-50" v-if="currentSelected == item.value"></CheckCircleIcon>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <!-- <article class="bg-[#F5F5F5]  space-y-3"> -->
          <article class="bg-[#F5F5F5]  pt-1 pb-1 mt-1 rounded-lg">

            <div class="text-sm  bg-white p-4 m-4 space-y-5 rounded-xl  border-neutral-200">

              <section class="transaction-details space-y-3">
                <h2 class="text-[16px] font-medium text-black font-worksans">Détails bancaire</h2>

                <div class="flex iems-center justify-between">
                  <p class=" text-neutral-40">Titulaire du compte</p>
                  <p class=" text-neutral-10 font-medium">Sendchap Pro</p>
                </div>
                <div class="flex iems-center justify-between">
                  <p class=" text-neutral-40">Code Guichet</p>
                  <p class=" text-neutral-10 font-medium">
                    12345
                  </p>
                </div>

                <div class="flex iems-center justify-between">
                  <p class=" text-neutral-40">Code Banque</p>
                  <p class=" text-neutral-10 font-medium">AT123</p>
                </div>
                <div class="flex iems-center justify-between">
                  <p class=" text-neutral-40">Numéro de Compte</p>
                  <p class=" text-neutral-10 font-medium">
                    123456789012
                  </p>
                </div>
                <div class="flex iems-center justify-between">
                  <p class=" text-neutral-40">RIB</p>
                  <p class=" text-neutral-10 font-medium">
                    AT123456789012345678
                  </p>
                </div>

              </section>
            </div>

            <!-- footer -->
            <!-- <div class="flex gap-2 px-4 py-5 w-full bg-white">
  
  
              <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline">
                Retour
              </Button>
              <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="default">
                Faire le paiement
              </Button>
  
  
            </div> -->

          </article>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Button from "./ui/button/Button.vue";
import { ref, watch } from "vue";
import { CheckCircleIcon } from "lucide-vue-next";

// const defaultValue = ref()

const currentSelected = ref();

// watch(defaultValue, (n, o) => {
//   currentSelected.value = n
// })


const accordionItems = [
  { value: "item-1", title: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
  { value: "item-2", title: "Is it unstyled?", content: "Yes. It's unstyled by default, giving you freedom over the look and feel." },
  { value: "item-3", title: "Can it be animated?", content: "Yes! You can use the transition prop to configure the animation." },
  { value: "item-4", title: "Is it unstyled?", content: "Yes. It's unstyled by default, giving you freedom over the look and feel." },
  { value: "item-5", title: "Can it be animated?", content: "Yes! You can use the transition prop to configure the animation." },
]
</script>