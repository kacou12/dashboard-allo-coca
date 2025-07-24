<template>
    <Popover :modal="true">
        <Field v-model="value" :name="name" v-slot="{ field, errorMessage }">
            <PopoverTrigger as-child>
                <Button variant="outline" :class="cn(

                    ' w-full justify-start text-left font-normal ',
                    !value && 'text-muted-foreground h-[44px]',
                    errorMessage ? ' border-error-light-2 border' : ''
                )">
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-full">
                <div class="flex items-center gap-2 mb-2">
                    <div class="w-full flex gap-2">
                        <!-- Sélecteur de mois -->
                        <div class=" flex-1">

                            <Select :model-value="currentMonthIndex.toString()" @update:model-value="handleMonthChange">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Mois" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="(month, index) in months" :key="index" :value="index.toString()">
                                        {{ month }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div class=" flex-1">
                            <!-- Sélecteur d'année -->
                            <Select :model-value="currentYear.toString()" @update:model-value="handleYearChange">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Année" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="year in years" :key="year" :value="year.toString()">
                                        {{ year }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                </div>

                <Calendar v-model="value" v-bind="field" initial-focus :selected-month="selectedMonth"
                    :selected-year="selectedYear" />
                <!-- <CommonButton class="mt-4 w-full" type="default" title="Valider"></CommonButton> -->
            </PopoverContent>
            <div class="h-[20px] mt-2">
                <FadeInAnimation mode="out-in">
                    <small v-if="errorMessage"
                        class="app-form-item-error text-error-500 text-sm font-worksans font-normal">
                        {{ errorMessage }}
                    </small>
                    <div v-else></div>
                </FadeInAnimation>
            </div>
        </Field>
    </Popover>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
    CalendarDate,
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    today,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { computed, ref, watch, type PropType } from 'vue'
import FadeInAnimation from '../animations/fadeInAnimation.vue'
import { Field } from 'vee-validate'
import CommonButton from '../buttons/commonButton.vue'

const df = new DateFormatter('fr-FR', {
    dateStyle: 'long',
})

// Liste des mois en français
const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

// Définition du modèle et des props
const value = defineModel({ type: Object as PropType<DateValue> })
defineProps({
    name: {
        type: String,
        required: false,
        default: 'date',
    },
})

// Génération de la liste des années (année courante jusqu'à 100 ans en arrière)
const currentSystemDate = new Date()
const currentSystemYear = currentSystemDate.getFullYear()
const years = computed(() => {
    const yearsList = []
    for (let i = currentSystemYear; i >= currentSystemYear - 100; i--) {
        yearsList.push(i)
    }
    return yearsList
})

// Valeurs actuelles pour les sélecteurs
const currentMonthIndex = computed(() => {
    if (value.value) {
        return (value.value.month - 1).toString()
    }
    return currentSystemDate.getMonth().toString()
})

const currentYear = computed(() => {
    if (value.value) {
        return value.value.year.toString()
    }
    return currentSystemYear.toString()
})

// Valeurs pour le composant Calendar
const selectedMonth = computed(() => parseInt(currentMonthIndex.value) + 1)
const selectedYear = computed(() => parseInt(currentYear.value))

// Gestion des changements de mois et d'année
const handleMonthChange = (monthIndex: string) => {
    const month = parseInt(monthIndex) + 1 // Conversion en index 1-12 pour DateValue

    if (value.value) {
        // Mise à jour du mois dans la date existante
        const day = Math.min(value.value.day, getDaysInMonth(value.value.year, month))
        value.value = new CalendarDate(value.value.year, month, day)
    } else {
        // Création d'une nouvelle date avec le mois sélectionné
        const year = parseInt(currentYear.value)
        value.value = new CalendarDate(year, month, 1)
    }
}

const handleYearChange = (yearString: string) => {
    const year = parseInt(yearString)

    if (value.value) {
        // Mise à jour de l'année dans la date existante
        const month = value.value.month
        const day = Math.min(value.value.day, getDaysInMonth(year, month))
        value.value = new CalendarDate(year, month, day)
    } else {
        // Création d'une nouvelle date avec l'année sélectionnée
        const month = parseInt(currentMonthIndex.value) + 1
        value.value = new CalendarDate(year, month, 1)
    }
}

// Fonction utilitaire pour obtenir le nombre de jours dans un mois
function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate()
}

// Observer les changements de Calendar pour mettre à jour les sélecteurs
watch(() => value.value, (newValue) => {
    // Les propriétés calculées se mettront à jour automatiquement
}, { immediate: true })
</script>