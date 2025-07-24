import { AppRoute } from '@/constants/app-route'
import { getAccessToken } from '@/services/auth/auth-util'
import { useAuthStore } from '@/stores/useAuthStore'
import type {
  _Awaitable,
  NavigationGuardReturn,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'

export function requiresAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
): _Awaitable<NavigationGuardReturn> {
 
  const hasToken = !!getAccessToken()
  const PUBLIC_ROUTES = [AppRoute.LOGIN.name, AppRoute.VERIFY_EMAIL.name]
  if (to.meta.requiresAuth) {

    if (!hasToken) {
      // RouteRecordNameGeneric
      return AppRoute.LOGIN.name
    } 
  } else if (hasToken && PUBLIC_ROUTES.includes(to.name!.toString())) {
    return AppRoute.DASHBOARD.name
  }
  return true
}
