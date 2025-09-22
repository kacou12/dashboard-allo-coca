import { AppRoute } from '@/constants/app-route'
import { createRouter, createWebHistory } from 'vue-router'
import { requiresAuth } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_API_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: AppRoute.LOGIN.path,
      name: AppRoute.LOGIN.name,
      component: () => import('@/views/guests/LoginView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.SIGNUP.path,
      name: AppRoute.SIGNUP.name,
      component: () => import('@/views/guests/SignupView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.LOST_PASSWORD.path,
      name: AppRoute.LOST_PASSWORD.name,
      component: () => import('@/views/guests/ForgetPasswordView.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { requiresAuth: false },
    },
      {
      path: AppRoute.VERIFY_EMAIL.path,
      name: AppRoute.VERIFY_EMAIL.name,
      component: () => import('@/views/guests/forgetPassword/VerifyEmailView.vue'),
      // beforeEnter: (to, from) => {
      //   if(from.name === AppRoute.LOST_PASSWORD.name ) {
      //     return true;
      //   }
      //   return AppRoute.LOST_PASSWORD.name
      // },
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.UPDATE_PASSWORD.path,   
      name: AppRoute.UPDATE_PASSWORD.name,
      component: () => import('@/views/guests/forgetPassword/DefinePasswordView.vue'),
      // beforeEnter:Auth.authIsRequire,
      beforeEnter: (to, from) => {
        if(to.query.token) {
          return true;
        }
        // reject the navigation
        return AppRoute.LOST_PASSWORD.name
      },
      meta: { requiresAuth: false },
    },
    {
      path: AppRoute.SUCCESS_UPDATE_PASSWORD.path,
      name: AppRoute.SUCCESS_UPDATE_PASSWORD.name,
      component: () => import('@/views/guests/forgetPassword/SuccessResetPasswordView.vue'),
      beforeEnter: (to, from) => {
        if(from.name === AppRoute.UPDATE_PASSWORD.name ) {
          return true;
        }
        return AppRoute.LOGIN.name
      },
      meta: { requiresAuth: false },
    },
   
    {
      path: AppRoute.ADMIN.path,
      name: AppRoute.ADMIN.name,
      component: () => import('@/components/layouts/DefaultLayout.vue'),
      // beforeEnter:Auth.authIsRequire,
      meta: { layout: 'DefaultLayout', requiresAuth: true },
      redirect: AppRoute.DASHBOARD,
      children: [
        {
          path: AppRoute.DASHBOARD.path,
          name: AppRoute.DASHBOARD.name,
          component: () => import('@/views/DashboardView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ORDERS.path,
          name: AppRoute.ORDERS.name,
          component: () => import('@/views/Allococa/OrdersView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.CLIENTS.path,
          name: AppRoute.CLIENTS.name,
          component: () => import('@/views/Allococa/ClientsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.STOCKS.path,
          name: AppRoute.STOCKS.name,
          component: () => import('@/views/Allococa/StocksView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },

        //DEBUT Gestion des utilisateurs =============== **************
       
     
        {
          path: AppRoute.BENEFIT.path,
          name: AppRoute.BENEFIT.name,
          component: () => import('@/views/Benefices/BeneficesView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
     

        // recentes transactions  =============== **************
        {
          path: AppRoute.TRANSACTIONS_HISTORY.path,
          name: AppRoute.TRANSACTIONS_HISTORY.name,
          component: () => import('@/views/Transactions/TransactionsHistoryView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.TRANSACTIONS_HISTORY_USER.path,
          name: AppRoute.TRANSACTIONS_HISTORY_USER.name,
          component: () => import('@/views/Transactions/TransactionsHistoryUserView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.BENEFICIARIES_MANAGEMENT.path,
          name: AppRoute.BENEFICIARIES_MANAGEMENT.name,
          component: () => import('@/views/BeneficiariesManagement/BeneficiariesManagementView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.SUPPLY.path,
          name: AppRoute.SUPPLY.name,
          component: () => import('@/views/supplies/suppliesView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.INVOICE_TRANSACTIONS.path,
          name: AppRoute.INVOICE_TRANSACTIONS.name,
          component: () => import('@/views/invoicePayment/invoicePaymentView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.DATA_ANALYSIS.path,
          name: AppRoute.DATA_ANALYSIS.name,
          component: () => import('@/views/dataAnalysis/DataAnalysisView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.MASS_PAYMENT.path,
          name: AppRoute.MASS_PAYMENT.name,
          component: () => import('@/views/MassPayment/setMassPaymentView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        // Gestion des transactions   =============== **************
        {
          path: AppRoute.TRANSACTIONS_MANAGEMENT.path,
          name: AppRoute.TRANSACTIONS_MANAGEMENT.name,
          component: () => import('@/views/TransactionsManagement/TransactionsManagementView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        // Administration   =============== **************
        {
          path: AppRoute.ADMINISTRATION.path,
          name: AppRoute.ADMINISTRATION.name,
          component: () => import('@/views/Administration/AdministrationView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.PROFIL_ADMIN.path,
          name: AppRoute.PROFIL_ADMIN.name,
          component: () => import('@/views/Administration/ProfilAdministrationView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ADMIN_ROLES_MANAGEMENT.path,
          name: AppRoute.ADMIN_ROLES_MANAGEMENT.name,
          component: () => import('@/views/Administration/AdministrationRolesView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ADMIN_ADD_ROLE.path,
          name: AppRoute.ADMIN_ADD_ROLE.name,
          component: () => import('@/views/Administration/AdministrationAddRoleView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ADMIN_UPDATE_ROLE.path,
          name: AppRoute.ADMIN_UPDATE_ROLE.name,
          component: () => import('@/views/Administration/AdministrationUpdateRoleView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ADMINISTRATION_USER.path,
          name: AppRoute.ADMINISTRATION_USER.name,
          component: () => import('@/views/Administration/AdministrationUserView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
      
        // Aggregator switch   =============== **************
        {
          path: AppRoute.AGGREGATOR_SWITCH.path,
          name: AppRoute.AGGREGATOR_SWITCH.name,
          component: () => import('@/views/AggregatorSwitch/AggregatorSwitchView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        // Gift card management   =============== **************
     
        {
          path: AppRoute.PROVIDERS.path,
          name: AppRoute.PROVIDERS.name,
          component: () => import('@/views/Providers/ProvidersView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        // ISSUERS
        {
          path: AppRoute.ISSUERS.path,
          name: AppRoute.ISSUERS.name,
          component: () => import('@/views/Issuers/IssuersView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.SETTINGS.path,
          name: AppRoute.SETTINGS.name,
          component: () => import('@/views/Settings/SettingsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ISSUER_PROVIDER_RATE.path,
          name: AppRoute.ISSUER_PROVIDER_RATE.name,
          component: () => import('@/views/IssuersProviderRate/IssuersProviderRateView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.ADMIN_ALERTS.path,
          name: AppRoute.ADMIN_ALERTS.name,
          component: () => import('@/views/AdminAlerts/AdminAlertsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
        {
          path: AppRoute.OPERATION_LOGS.path,
          name: AppRoute.OPERATION_LOGS.name,
          component: () => import('@/views/OperationLogs/OperationLogsView.vue'),
          // beforeEnter:Auth.authIsRequire,
          meta: { layout: 'DefaultLayout', requiresAuth: true },
        },
      ],
    },

    {
      path: AppRoute.ABOUT.path,
      name: AppRoute.ABOUT.name,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

router.beforeEach(requiresAuth)

export default router
