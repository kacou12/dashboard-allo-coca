<template>
    <div class="px-4 bg-white">
        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">
                <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Paiement de masse
                </h1>
                <p class="text-neutral-30 text-sm font-normal">Effectuer des paiements multiple en quelque cliques
                </p>
            </div>

            <div>
                <NotificationIcon></NotificationIcon>
            </div>
        </header>

        <section class="space-y-5">
            <article class="my-24 2xl:w-[60%] mx-auto ">
                <!-- <CommonStepperBar :steps-data="localStepsData" :steps-length="localStepsLength" v-model="currentStep">
                </CommonStepperBar> -->
                <MassPaymentStepperBar :steps-data="localStepsData" :steps-length="localStepsLength"
                    v-model="currentStep"></MassPaymentStepperBar>
            </article>

            <section>
                <CustomSlideFadeAnimation>
                    <article class="space-y-5" v-if="currentStep == 1">
                        <div class="space-y-1">

                            <h3 class="font-merriweathersans text-[28px] text-[#1A1A1A] font-bold">Envoyez plusieurs
                                paiements
                            </h3>
                            <p class="text-[#666666] 2xl:w-[40%]">Le tableau doit comporter les colonnes Nom, Prénom(s),
                                Numéro,Réseau,
                                Montant et doit être au
                                format
                                Microsoft (XLS).</p>
                        </div>
                        <MassPaymentFileModal @load-data="handleFileUpload"></MassPaymentFileModal>
                    </article>
                    <article v-else-if="currentStep == 2" class="flex items-center justify-between 2xl:w-[70%] mx-auto">
                        <h3 class="font-bold text-[20px] font-merriweathersans">Tableau de paiement</h3>
                        <div class="flex items-center gap-2">
                            <MassPaymentFileModal :is-updating="true" @load-data="handleFileUpload">
                            </MassPaymentFileModal>
                            <MassPaymentLaunchModal @add-description="goDescriptionStep">
                            </MassPaymentLaunchModal>
                        </div>
                    </article>
                    <article v-else-if="currentStep == 3" class="space-y-2 2xl:w-[70%] mx-auto">
                        <h3 class="font-bold text-[20px] font-merriweathersans">Tableau de paiement</h3>
                        <TextareaField name="description" placeholder="Description du paiement"></TextareaField>
                        <div class="flex items-center justify-end">
                            <div>

                                <CommonButton type="default" class="w-fit" title="Terminer" @action="() => { }">
                                </CommonButton>
                            </div>
                        </div>
                    </article>
                </CustomSlideFadeAnimation>
            </section>

            <section class="2xl:w-[70%] mx-auto ">
                <p class="text-red-500 space-y-2" v-for="message in errorMessage" :key="message">{{ message }}</p>

                <article v-if="jsonData.length > 0 && currentStep == 2">
                    <CommonDataTable :dynamic-width-columns="false" :total="jsonData.length ?? 0"
                        :manual-pagination="false" :columns="massPaymentColumn" :data="jsonData" @prev-page="() => { }"
                        @next-page="() => { }" @go-to-page="() => { }">
                    </CommonDataTable>

                </article>
                <article v-else-if="currentStep == 1" class="relative">

                    <CommonDataTable :dynamic-width-columns="false" :total="fakeJsonData.length ?? 0"
                        :manual-pagination="false" :columns="massPaymentColumn" :data="fakeJsonData"
                        @prev-page="() => { }" @next-page="() => { }" @go-to-page="() => { }">
                    </CommonDataTable>


                    <div class="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-white to-transparent ">
                    </div>

                </article>
            </section>

        </section>
    </div>
</template>

<script setup lang="ts">
import CommonStepperBar from '@/components/common/commonStepperBar.vue';
import MassPaymentFileModal from '@/components/main/mass-payment/massPaymentFileModal.vue';
import NotificationIcon from '@/components/svg/notificationIcon.vue';
import { ref } from 'vue';

import { useLoaderStore } from '@/stores/useLoaderStore';
import { useToast } from 'vue-toastification';
import * as XLSX from 'xlsx';
import type { MassPaymentResponse } from '@/services/mass-payment/mass-payment-type';
import { massPaymentColumn } from '@/components/main/mass-payment/table/massPaymentColumn';
import CommonDataTable from '@/components/common/commonDataTable.vue';
import CommonButton from '@/components/buttons/commonButton.vue';
import MassPaymentLaunchModal from '@/components/main/mass-payment/massPaymentLaunchModal.vue';
import MassPaymentStepperBar from '@/components/main/mass-payment/massPaymentStepperBar.vue';
import CustomSlideFadeAnimation from '@/components/animations/customSlideFadeAnimation.vue';
import TextareaField from '@/components/vee-validate/TextareaField.vue';

// Interface pour typer les données JSON
interface ExcelRowData {
    [key: string]: any;
}

const toast = useToast();
const { startLoading, stopLoading } = useLoaderStore();
const isConverting = ref(false);
const currentStep = ref<1 | 2 | 3>(1);
const localStepsLength = ref(3);
const errorMessage = ref<string[]>([]);
const statusPayment = ref<'pending' | 'success' | 'error'>('pending');
const localStepsData = ref([
    {
        title: 'Charger votre tableau',
        description: ''
    },
    {
        title: 'Vérifiez les détails de votre paiement',
        description: ''
    },
    {
        title: 'Ajouter une description',
        description: ''
    }
]);


// Ref pour stocker les données JSON converties
const jsonData = ref<MassPaymentResponse[]>([]);

const fakeJsonData = [
    {
        name: "John Doe",
        phone: "0789012345",
        network: "MTN",
        amount: 15000,
    },
    {
        name: "Jane Smith",
        phone: "0778901234",
        network: "Orange",
        amount: 25000,
    },
    {
        name: "Koffi N'Guessan",
        phone: "0102345678",
        network: "Moov",
        amount: 50000,
    },
    {
        name: "Aisha Fofana",
        phone: "0567890123",
        network: "Wave",
        amount: 100000,
    },
    // {
    //     name: "Moussa Koné",
    //     phone: "0712345678",
    //     network: "MTN",
    //     amount: 75000,
    // },
    // {
    //     name: "Fatou Traoré",
    //     phone: "0112345678",
    //     network: "Orange",
    //     amount: 20000,
    // },
    // {
    //     name: "Watari Traoré",
    //     phone: "0112345679",
    //     network: "Orange",
    //     amount: 25000,
    // },
    // {
    //     name: "Johnny Patcheko",
    //     phone: "0142345679",
    //     network: "Wave",
    //     amount: 55000,
    // },
    // {
    //     name: "Johnny Patcheko",
    //     phone: "0142345679",
    //     network: "Wave",
    //     amount: 55000,
    // },
    // {
    //     name: "Johnny Patcheko",
    //     phone: "0142345679",
    //     network: "Wave",
    //     amount: 55000,
    // },
    // {
    //     name: "Xabi Alonso",
    //     phone: "0142345649",
    //     network: "Orange",
    //     amount: 75000,
    // },
];

/**
 * Convertit un fichier Excel en JSON
 * @param file - Le fichier Excel à convertir
 * @returns Promise<ExcelRowData[]> - Les données converties en JSON
 */
const convertExcelToJson = (file: File): Promise<ExcelRowData[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });

                // Prendre la première feuille par défaut
                const firstSheetName = workbook.SheetNames[0];

                const worksheet = workbook.Sheets[firstSheetName];

                // Convertir en JSON avec les options appropriées
                const jsonResult: ExcelRowData[] = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1, // Utilise la première ligne comme en-têtes
                    defval: '', // Valeur par défaut pour les cellules vides
                    blankrows: false // Ignore les lignes vides
                });

                resolve(jsonResult);

            } catch (error) {
                reject(new Error(`Erreur lors de la conversion: ${error}`));
            }
        };

        reader.onerror = () => {
            reject(new Error('Erreur lors de la lecture du fichier'));
        };

        reader.readAsArrayBuffer(file);
    });
};

/**
 * Valide et transforme les données JSON
 * @param rawData - Données brutes du fichier Excel
 * @returns MassPaymentResponse[] - Données validées et transformées
 */
const validateAndTransformData = (rawData: any[]): MassPaymentResponse[] => {
    if (rawData.length < 2) {
        // throw new Error("Le fichier est vide ou ne contient pas d'en-têtes.");
        errorMessage.value = ["Le fichier est vide ou ne contient pas d'en-têtes."];
        return [];
    }

    // Convertir les en-têtes en minuscules pour une vérification insensible à la casse
    const headers = (rawData[0] as string[]).map(h => String(h).trim().toLowerCase());

    const requiredHeaders = ['nom et prénom', 'numéro', 'réseau', 'montant'];

    // Vérifier si tous les en-têtes requis sont présents
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
        // throw new Error(`Le fichier ne contient pas les en-têtes requis : ${missingHeaders.join(', ')}`);
        errorMessage.value = [`Le fichier ne contient pas les en-têtes requis : ${missingHeaders.join(', ')}`];

        return [];
    }

    // On s'assure qu'il n'y a pas d'autres colonnes
    if (headers.length > requiredHeaders.length) {
        errorMessage.value = ["Le fichier contient des colonnes non autorisées. Veuillez ne conserver que 'Nom et prénom', 'Numéro', 'Réseau', 'Montant'."];

        return [];
    }

    const dataRows = rawData.slice(1);

    // Transformation et validation de chaque ligne
    return dataRows.map((row, index) => {
        const transformedRow: MassPaymentResponse = {
            name: '',
            phone: '',
            network: '',
            amount: 0
        };

        const nomCompletHeader = headers.indexOf('nom et prénom');
        const phoneHeader = headers.indexOf('numéro');
        const networkHeader = headers.indexOf('réseau');
        const amountHeader = headers.indexOf('montant');

        // Validation et assignation pour le Nom et prénom
        const nomComplet = row[nomCompletHeader];
        if (!nomComplet || typeof nomComplet !== 'string' || nomComplet.trim() === '') {
            // throw new Error(`Ligne ${index}: Le champ 'Nom et prénom' est invalide.`);
            errorMessage.value = [...errorMessage.value, `Ligne ${index}: Le champ 'Nom et prénom' est invalide.`];

        }
        transformedRow.name = String(nomComplet).trim();

        // Validation et assignation pour le Numéro
        const phone = row[phoneHeader];
        if (!phone || typeof phone !== 'string' || phone.trim() === '') {

            errorMessage.value = [...errorMessage.value, `Ligne ${index}: Le champ 'Numéro' est invalide.`];
        }
        transformedRow.phone = String(phone).trim();

        // Validation et assignation pour le Réseau
        const network = row[networkHeader];
        if (!network || typeof network !== 'string' || network.trim() === '' || !['MTN', 'Orange', 'Moov', 'Wave'].includes(network)) {

            errorMessage.value = [...errorMessage.value, `Ligne ${index}: Le champ 'Réseau' est invalide . les reseaux possible sont MTN, Orange, Moov, Wave`];
        }
        transformedRow.network = String(network).trim();

        // Validation et assignation pour le Montant
        const amount = row[amountHeader];
        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {

            errorMessage.value = [...errorMessage.value, `Ligne ${index}: Le champ 'Montant' est invalide. Il doit être un nombre positif.`];
        }
        // transformedRow.amount = Number(amount);
        transformedRow.amount = amount;

        return transformedRow;
    });
};

/**
 * Gère l'upload et la conversion du fichier
 */
const handleFileUpload = async (excelFile: File) => {
    try {
        isConverting.value = true;
        startLoading();

        // 1. Convertir le fichier Excel en un tableau d'objets
        const convertedData = await convertExcelToJson(excelFile);

        // 2. Valider et transformer les données
        const validatedData = validateAndTransformData(convertedData);

        // 3. Stocker les données validées
        jsonData.value = validatedData;

        // Mettre à jour l'étape
        currentStep.value = 2;

        console.log('Données validées et transformées:', validatedData);

        toast.success(`Fichier converti et validé avec succès ! ${validatedData.length} lignes traitées.`);

    } catch (error) {
        console.error('Erreur lors de la conversion ou de la validation:', error);
        toast.error(`Erreur : ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        jsonData.value = []; // Vider les données en cas d'erreur
    } finally {
        isConverting.value = false;
        stopLoading();
        // setTimeout(() => {
        //     stopLoading();
        // }, 5000)
    }
};

const goDescriptionStep = () => {
    currentStep.value = 3;
}

</script>

<style scoped></style>