<script setup lang="ts">
import { ref, computed } from 'vue';
import signupAsideNavigation from '@/components/signup/signupAsideNavigation.vue';
import Step1CompanyInfo from '@/components/signup/Step1CompanyInfo.vue';
import Step2AdministrativeDocument from '@/components/signup/Step2AdministrativeDocument.vue';
import StepIndicator from '@/components/signup/stepIndicator.vue';
import FadeSlideAnimation from '@/components/animations/fadeSlideAnimation.vue';

// State to manage the current step
const currentStep = ref(1);
const totalSteps = 2; // Based on your image

// Data for the form
const formData = ref({
    companyName: '',
    representativeName: '',
    email: '',
    website: '',
    password: '',
});

// Function to go to the next step
const nextStep = () => {
    if (currentStep.value < totalSteps) {
        currentStep.value++;
    }
};
const prevStep = () => {

    currentStep.value--;

};

// Function to go to a specific step (e.g., from aside navigation)
const goToStep = (step: number) => {
    currentStep.value = step;
};

// Handle form submission (final step)
const handleSubmit = () => {
    console.log('Form submitted:', formData.value);
    // Here you would typically send data to an API
    alert('Formulaire soumis avec succès!');
};
</script>

<template>
    <div class="min-h-screen flex bg-[bg-signup]">
        <aside class="w-[440px] bg-neutral-90 p-6">
            <signupAsideNavigation :current-step="currentStep" @go-to-step="goToStep" />
        </aside>

        <main class="flex-1 flex flex-col justify-center items-center relative">
            <div class="absolute -top-[2%] z-0">
                <div class="relative">

                    <img src="@/assets/images/bg-signup.png" class="" alt="">
                    <div class="absolute top-0 left-0 right-0 bottom-0 border-b-[250px] 
                    border-x-[215px]
                    border-white ">

                    </div>
                </div>
            </div>

            <div class="absolute top-[105px] p-[12px] w-fit rounded-xl border-[2px] border-neutral-70">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.8471 2.24001H9.1535C7.03632 2.24316 5.00675 3.08561 3.50968 4.58269C2.0126 6.07977 1.17015 8.10933 1.16699 10.2265V17.7713C1.17015 19.8885 2.0126 21.9181 3.50968 23.4152C5.00675 24.9122 7.03632 25.7547 9.1535 25.7578H18.8471C20.9643 25.7547 22.9939 24.9122 24.491 23.4152C25.9881 21.9181 26.8305 19.8885 26.8337 17.7713V10.2265C26.8305 8.10933 25.9881 6.07977 24.491 4.58269C22.9939 3.08561 20.9643 2.24316 18.8471 2.24001V2.24001ZM25.1623 17.7594C25.1623 19.4343 24.497 21.0406 23.3127 22.2249C22.1283 23.4092 20.522 24.0746 18.8471 24.0746H9.1535C7.47861 24.0746 5.87232 23.4092 4.68799 22.2249C3.50366 21.0406 2.83831 19.4343 2.83831 17.7594V10.2265C2.83831 8.55162 3.50366 6.94533 4.68799 5.761C5.87232 4.57667 7.47861 3.91132 9.1535 3.91132H18.8471C20.522 3.91132 22.1283 4.57667 23.3127 5.761C24.497 6.94533 25.1623 8.55162 25.1623 10.2265V17.7594ZM11.7799 14.178C12.4547 13.7413 12.9701 13.0981 13.2492 12.3444C13.5283 11.5906 13.5562 10.7668 13.3285 9.99599C13.1009 9.22514 12.63 8.54862 11.9861 8.06745C11.3423 7.58628 10.5601 7.32628 9.75637 7.32628C8.95261 7.32628 8.17042 7.58628 7.5266 8.06745C6.88279 8.54862 6.41189 9.22514 6.18424 9.99599C5.95659 10.7668 5.9844 11.5906 6.26352 12.3444C6.54264 13.0981 7.05808 13.7413 7.73288 14.178C6.91634 14.3289 6.17179 14.7434 5.61333 15.3579C5.05486 15.9724 4.71329 16.7531 4.64095 17.5803C4.64095 17.8019 4.72899 18.0145 4.8857 18.1712C5.04242 18.3279 5.25497 18.416 5.47661 18.416C5.69824 18.416 5.91079 18.3279 6.06751 18.1712C6.22422 18.0145 6.31226 17.8019 6.31226 17.5803C6.31226 16.6492 7.72095 15.6106 9.7504 15.6106C11.7799 15.6106 13.2005 16.6492 13.2005 17.5803C13.2005 17.8019 13.2885 18.0145 13.4452 18.1712C13.602 18.3279 13.8145 18.416 14.0361 18.416C14.2578 18.416 14.4703 18.3279 14.627 18.1712C14.7838 18.0145 14.8718 17.8019 14.8718 17.5803C14.8 16.7516 14.4589 15.9693 13.9006 15.3527C13.3422 14.7362 12.5974 14.3194 11.7799 14.1661V14.178ZM9.7504 9.00884C10.1575 9.00648 10.5562 9.1252 10.8956 9.34991C11.2351 9.57463 11.5002 9.89519 11.6571 10.2709C11.8139 10.6466 11.8556 11.0604 11.7768 11.4598C11.6979 11.8592 11.5021 12.2262 11.2142 12.5141C10.9264 12.8019 10.5594 12.9978 10.16 13.0766C9.76056 13.1554 9.34672 13.1138 8.97104 12.9569C8.59535 12.8 8.27479 12.535 8.05008 12.1955C7.82537 11.856 7.70665 11.4574 7.70901 11.0502C7.71214 10.5098 7.92822 9.99238 8.31038 9.61022C8.69254 9.22806 9.20996 9.01198 9.7504 9.00884ZM22.1182 16.3865C22.1182 16.6081 22.0301 16.8207 21.8734 16.9774C21.7167 17.1341 21.5041 17.2222 21.2825 17.2222H17.3907C17.1691 17.2222 16.9565 17.1341 16.7998 16.9774C16.6431 16.8207 16.5551 16.6081 16.5551 16.3865C16.5551 16.1649 16.6431 15.9523 16.7998 15.7956C16.9565 15.6389 17.1691 15.5509 17.3907 15.5509H21.2825C21.5041 15.5509 21.7167 15.6389 21.8734 15.7956C22.0301 15.9523 22.1182 16.1649 22.1182 16.3865ZM22.5479 12.1127C22.5479 12.3344 22.4599 12.5469 22.3032 12.7036C22.1464 12.8603 21.9339 12.9484 21.7123 12.9484H15.7433C15.5216 12.9484 15.3091 12.8603 15.1524 12.7036C14.9957 12.5469 14.9076 12.3344 14.9076 12.1127C14.9076 11.8911 14.9957 11.6785 15.1524 11.5218C15.3091 11.3651 15.5216 11.2771 15.7433 11.2771H21.7123C21.9329 11.2801 22.1437 11.3692 22.2998 11.5252C22.4558 11.6813 22.5448 11.8921 22.5479 12.1127V12.1127Z"
                        fill="#1A1A1A" />
                </svg>

            </div>

            <div class="  rounded-lg  max-w-[400px] w-full z-50 ">

                <FadeSlideAnimation>
                    <Step1CompanyInfo v-if="currentStep === 1" v-model:companyName="formData.companyName"
                        v-model:representativeName="formData.representativeName" v-model:email="formData.email"
                        v-model:website="formData.website" @next="nextStep" />

                    <Step2AdministrativeDocument @previous="prevStep" v-else v-model="formData.password"
                        @submit="handleSubmit" />
                </FadeSlideAnimation>

                <div class="flex justify-center mt-10 space-x-2">
                    <StepIndicator v-for="n in totalSteps" :key="n" :is-active="currentStep === n" />
                </div>
            </div>
        </main>
    </div>
</template>