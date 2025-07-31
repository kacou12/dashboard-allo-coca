<template>
    <div>
        <SearchBar :is-loading="isFetching && filters.q !== undefined" v-model="filters.q"></SearchBar>
        <p class="text-[#808080] text-[14px] mt-1">Entrer un numéro ou rechercher un bénéficiaire</p>

        <section v-if="isFetched" class="max-h-[256px] space-y-4 mt-5 pr-2"
            :class="usersData!.items.length > 4 ? 'overflow-y-scroll' : ''">
            <!-- item -->
            <article v-for="user in usersData!.items" :key="user.id"
                :class="selectedUserId == user.id ? 'border-2 border-primary-50' : 'border-2 border-transparent'"
                @click="selectedUserId = user.id"
                class="flex gap-2 items-center justify-between bg-neutral-80 rounded-xl p-2 cursor-pointer transition-all ">
                <div class="flex gap-2 items-center">
                    <div class="">
                        <img src="@/assets/images/logos/wave.png" alt="">
                    </div>
                    <div class="space-y-1">
                        <p>07 87 995 058</p>
                        <!-- <p class="text-[12px]">Transférer vers wave</p> -->
                        <p class="text-[12px]">{{ user.firstname }} {{ user.lastname }}</p>
                    </div>
                </div>


                <div class="flex gap-2 items-center">

                    <CheckCircleIcon v-if="selectedUserId == user.id" class="text-primary-50" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66699 3.3335L11.3337 8.00016L6.66699 12.6668" stroke="#1A1A1A" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </article>

        </section>

    </div>
</template>

<script setup lang="ts">
import { useSearchUsersFiltersQuery } from '@/composables/queries/useUserQueries';
import { CheckCircleIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import SearchBar from '../users/SearchBar.vue';

const { isFetching, data: usersData, isFetched, filters } = useSearchUsersFiltersQuery();
const selectedUserId = ref<string>();



</script>

<style scoped></style>