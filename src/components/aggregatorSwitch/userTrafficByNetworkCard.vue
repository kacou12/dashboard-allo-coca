<template>
    <FadeSlideAnimation>
        <!-- <div class=" rounded-xl shadow 0 font-worksans ">
            <div class="animate-pulse bg-gray-200  h-[350px] rounded-xl"></div>
        </div> -->

        <div v-if="isLoadingData" class=" rounded-xl shadow 0 font-worksans ">
            <div class="animate-pulse bg-gray-200 h-[350px] rounded-xl"></div>
        </div>

        <div v-else class="bg-white p-6 rounded-lg shadow border border-neutral-70 flex flex-col justify-between gap-6">

            <section class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div class="space-y-3">
                    <h2 class="font-bold font-merriweathersans text-sm lg:text-xl ">Évolution des approvisionnements et
                        dépenses</h2>
                    <p class="text-neutral-20">Affichage de la progression des montants au fil du temps</p>
                </div>
                <div>
                    <!-- <CommonButton type="outline" title="Voir le rapport"></CommonButton> -->
                </div>
            </section>

            <section v-if="data.length > 0">
                <SwitchAgregatorBar :chart-data-bloc="transformedData"></SwitchAgregatorBar>
            </section>
            <div v-else class="h-[240px] flex justify-center items-center">
                <p class="text-neutral-40">Aucune donnée a afficher pour cette periode</p>
            </div>


        </div>
    </FadeSlideAnimation>

</template>

<script setup lang="ts">
import type { CountTxnsGroupByTypeAndMonth } from '@/services/dashboard/dashboard-alpha-type';
import type { PropType } from 'vue';
import CommonButton from '../buttons/commonButton.vue';
import SwitchAgregatorBar from './SwitchAgregatorBar.vue';
import { normalizeData } from '@/lib/utils';
import { computed } from 'vue';

import FadeSlideAnimation from '@/components/animations/fadeSlideAnimation.vue';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { storeToRefs } from 'pinia';

const { data } = defineProps({
    data: {
        type: Object as PropType<CountTxnsGroupByTypeAndMonth[]>,
        required: true
    }
})

// Type pour dataByType
type DataByType = {
    [K in keyof typeof typeLabels]: number[]
}


const { isLoading, isLoadingSkeleton } = storeToRefs(useLoaderStore());

const isLoadingData = computed(() => {
    return isLoading.value || isLoadingSkeleton.value
})


// Mapping des types de transactions
const typeLabels = {
    'spend': 'Dépenses',
    'supply': 'Approvisionnements',

}

// Fonction pour attribuer des couleurs aux types de transactions
const getColorForType = (type: string): string => {
    switch (type) {
        case 'spend': return '#E57373'  // vert clair
        case 'supply': return '#81C784'  // rouge foncé
        default: return '#E57373'

    }
}


// Transformer les données brutes
const transformedData = computed(() => {
    // 1. Filtrer et préparer les données
    const filteredData = data
        .filter(item => item.type !== 'award')
        .map(item => ({
            ...item,
            date: new Date(item.month_year)
        }));

    // 2. Déterminer la plage des 12 derniers mois (mois complet)
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1); // Premier jour du mois
    startDate.setHours(0, 0, 0, 0);

    // 3. Filtrer les données dans la plage
    const last12MonthsData = filteredData.filter(item => {
        return item.date >= startDate && item.date <= currentDate;
    });

    // 4. Créer un tableau de tous les mois dans la plage
    const monthLabels = [];
    const monthKeys: string[] = []; // Pour le regroupement
    for (let i = 0; i < 12; i++) {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + i);
        monthLabels.push(date.toLocaleString('default', { month: 'short' }));
        monthKeys.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
    }

    // 5. Initialiser la structure de données
    const dataByType: Record<string, number[]> = {};
    Object.keys(typeLabels).forEach(type => {
        dataByType[type] = new Array(12).fill(0);
    });

    // 6. Remplir les données
    last12MonthsData.forEach(item => {
        const monthKey = `${item.date.getFullYear()}-${String(item.date.getMonth() + 1).padStart(2, '0')}`;
        const monthIndex = monthKeys.indexOf(monthKey);

        if (monthIndex !== -1) {
            dataByType[item.type][monthIndex] += item.count_txns;
        }
    });

    // 7. Construire le dataset final
    const datasets = Object.keys(typeLabels)
        .filter(type => dataByType[type].some(count => count > 0))
        .map((type, index) => ({
            label: normalizeData(dataByType[type]).scaleFactor >= 1000
                ? `${typeLabels[type as keyof typeof typeLabels]} (${normalizeData(dataByType[type]).scaleFactor === 1000 ? 'milliers' : 'millions'})`
                : typeLabels[type as keyof typeof typeLabels],
            data: normalizeData(dataByType[type]).normalizedData,
            backgroundColor: getColorForType(type),
            pointStyle: "circle",
            barPercentage: 0.4,
            base: index === 0 ? undefined : 0,
            borderRadius: {
                topLeft: 8,
                topRight: 8
            }
        }));

    return {
        labels: monthLabels,
        datasets: datasets
    };
});


// Exemple d'utilisation dans un composant Vue




</script>

<style scoped></style>