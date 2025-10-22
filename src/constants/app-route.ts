import { AdminAlertsRouteApi } from '@/services/admin-alerts/admin-alerts-constants'
import { AdminRouteApi } from '@/services/admin/admin-constants'
import { AuthRouteApi } from '@/services/auth/auth-constants'
import { BenefitRouteApi } from '@/services/benefit/benefit-constants'
import { CountryRouteApi } from '@/services/country/country-constants'
import { DashboardRouteApi } from '@/services/dashboard/dashboard-constants'
import { IssuerProviderRateRouteApi } from '@/services/issuer-provider-rate/Issuer-provider-rate-constants'
import { IssuerRouteApi } from '@/services/issuers/issuer-constants'
import { OperationLogRouteApi } from '@/services/operation-logs/operation-log-constants'
import { ProviderRouteApi, ProviderServiceAvailibilityRouteApi } from '@/services/providers/provider-constants'
import { SettingsRouteApi } from '@/services/settings/settings-constants'
import { TransactionRouteApi } from '@/services/transactions/transaction-constants'

export const AppRoute = {
  // APP_MOBILE: { name: 'App mobile' },
  // UNAUTHORIZE: '/unauthorize',
  // ALLO COCA 


  ORDERS: {
    name: 'orders',
    path: '/orders',
    v1_object: DashboardRouteApi.default,
  },

  CLIENTS: {
    name: 'clients',
    path: '/clients',
    v1_object: DashboardRouteApi.default,
  },
  STOCKS: {
    name: 'stocks',
    path: '/stocks',
    v1_object: DashboardRouteApi.default,
  },
  STOCKS_PRODUCTS: {
    name: 'stocks-products',
    path: '/stock/:stockId/category/:categoryId/products',
    v1_object: DashboardRouteApi.default,
  },




  LOGIN: {
    name: 'login',
    path: '/login',
    v1_object: AuthRouteApi.login, // Rempli basé sur permission-constants.ts
  },
  LOST_PASSWORD: {
    name: 'lost-password',
    path: '/lost-password',
    v1_object: null, // Rempli basé sur permission-constants.ts
  },
  ABOUT: {
    name: 'about',
    path: '/about',
    v1_object: '', // Aucune correspondance directe trouvée dans permission-constants.ts
  },
  VERIFY_EMAIL: {
    name: 'verify-email',
    path: '/verify-email',
    v1_object: null, // Rempli basé sur permission-constants.ts
  },
  PROFIL_ADMIN: {
    name: 'profil-admin',
    path: '/profil-admin',
    v1_object: AdminRouteApi.getOneName, // Rempli basé sur permission-constants.ts
  },
  ADMIN_ROLES_MANAGEMENT: {
    name: 'admin-roles-managment',
    path: '/admin-roles-managment',
    v1_object: AdminRouteApi.policy, // Rempli basé sur permission-constants.ts
  },
  ADMIN_ADD_ROLE: {
    name: 'admin-add-role',
    path: '/admin-add-role',
    v1_object: AdminRouteApi.role, // Rempli basé sur permission-constants.ts
  },
  ADMIN_UPDATE_ROLE: {
    name: 'admin-update-role',
    path: '/admin-update-role/:id',
    v1_object: AdminRouteApi.role, // Rempli basé sur permission-constants.ts
  },
  UPDATE_PASSWORD: {
    name: 'update-password',
    path: '/update-password',
    v1_object: null, // Rempli basé sur permission-constants.ts
  },
  SUCCESS_UPDATE_PASSWORD: {
    name: 'success-update-password',
    path: '/success-update-password',
    v1_object: '', // Aucune correspondance directe trouvée dans permission-constants.ts
  },

  DASHBOARD: {
    name: 'dashboard',
    path: '/dashboard',
    v1_object: DashboardRouteApi.default,
  },
  ADMIN: {
    name: 'admins',
    path: '/',
    v1_object: '', // Aucune correspondance directe trouvée dans permission-constants.ts
  },
 

  BENEFIT: {
    name: 'benefit',
    path: '/benefit',
    v1_object: BenefitRouteApi.default,
  },

  // RECENT TRANSACTIONS
  TRANSACTIONS_HISTORY: {
    name: 'transactions-history',
    path: '/transactions-history',
    v1_object: TransactionRouteApi.default,
  },
  // RECENT TRANSACTIONS
  BENEFICIARIES_MANAGEMENT: {
    name: 'beneficiaries-management',
    path: '/beneficiaries-management',
    v1_object: TransactionRouteApi.default,
  },
  SUPPLY: {
    name: 'supplies',
    path: '/supplies',
    v1_object: TransactionRouteApi.default,
  },
  INVOICE_TRANSACTIONS: {
    name: 'invoice-transactions',
    path: '/invoice-transactions',
    v1_object: TransactionRouteApi.default,
  },
  SIGNUP: {
    name: 'signup',
    path: '/signup',
    v1_object: TransactionRouteApi.default,
  },
  TRANSACTIONS_HISTORY_USER: {
    name: 'transactions-history-user',
    path: '/transactions-history/user/:id',
    v1_object: TransactionRouteApi.getOneName, // Rempli basé sur permission-constants.ts
  },

  // Gestion des transactions
  TRANSACTIONS_MANAGEMENT: {
    name: 'transactions-management',
    path: '/transactions-management',
    v1_object: TransactionRouteApi.default, // Assumé être le même que RECENT_TRANSACTIONS
  },
  DATA_ANALYSIS: {
    name: 'data-analysis',
    path: '/data-analysis',
    v1_object: TransactionRouteApi.default, // Assumé être le même que RECENT_TRANSACTIONS
  },
  MASS_PAYMENT: {
    name: 'mass-payment',
    path: '/mass-payment',
    v1_object: TransactionRouteApi.default, // Assumé être le même que RECENT_TRANSACTIONS
  },
  // Administration
  ADMINISTRATION: {
    name: 'administration',
    path: '/administration',
    v1_object: AdminRouteApi.adminsFilter, // Rempli basé sur permission-constants.ts (commenté mais logique)
  },
  ADMINISTRATION_USER: {
    name: 'administration-user',
    path: '/administration/user/:id',
    v1_object: AdminRouteApi.getOneName, // Rempli basé sur permission-constants.ts (commenté mais logique)
  },



  // Aggregator switch
  AGGREGATOR_SWITCH: {
    name: 'aggregator-switch',
    path: '/aggregator-switch',
    v1_object: ProviderServiceAvailibilityRouteApi.default,
  },

  // Providers

  PROVIDERS: {
    name: 'providers',
    path: '/providers',
    v1_object: ProviderRouteApi.default, // Rempli basé sur permission-constants.ts
  },

  //
  COUNTRIES: {
    name: 'countries',
    path: '/countries',
    v1_object: CountryRouteApi.default, // Rempli basé sur permission-constants.ts
  },
  // issuers

  ISSUERS: {
    name: 'issuers',
    path: '/issuers',
    v1_object: IssuerRouteApi.default, // Rempli basé sur permission-constants.ts
  },

  SETTINGS: {
    name: 'settings',
    path: '/settings',
    v1_object: SettingsRouteApi.default, // Rempli basé sur permission-constants.ts
  },

  // Taux par aggregateurs
  ISSUER_PROVIDER_RATE: {
    name: 'issuer-provider-rate',
    path: '/issuer-provider-rate',
    v1_object: IssuerProviderRateRouteApi.default, // Rempli basé sur permission-constants.ts
  },
  ADMIN_ALERTS: {
    name: 'admin-alerts',
    path: '/admin-alerts',
    v1_object: AdminAlertsRouteApi.default, // Rempli basé sur permission-constants.ts
  },
  OPERATION_LOGS: {
    name: 'operation-logs',
    path: '/operation-logs',
    v1_object: OperationLogRouteApi.default, // Rempli basé sur permission-constants.ts
  },
}
