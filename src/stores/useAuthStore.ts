import { AppRoute } from '@/constants/app-route'
import type { AdminPolicyResponse, AuthResponse } from '@/services/auth/auth-type'
import { destroySensitiveInfo } from '@/services/auth/auth-util'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<AuthResponse | null>(null)
    const userPolicies = ref<AdminPolicyResponse[] | null>([])

    const setUser = (userData: AuthResponse) => {
      user.value = userData
    }

    // const findPermissionRouteName = () => {
    //   const permissionData = getPermissionInfo({ v1: permission.object, v2: permission.action })
    //   return permissions.value.find(
    //     (p) => p.route_name === permissionData?.route_name,
    //   )
    // }


   
    const isSuperAdmin = computed(() => {
      return user.value?.role.name === 'super_admin'
    })

    const setAdminPolicies = (policies: AdminPolicyResponse[]) => {
      userPolicies.value = policies
    }

    const fullName = () => {
      return `${user.value?.firstname} ${user.value?.lastname}`
    }

    const logout = () => {
      user.value = null
      //   t    oken.value = null
    }

    return {
      setUser,
      logout,
      fullName,
      user,
      setAdminPolicies,
      userPolicies,
      isSuperAdmin,

    }
  },
  {
    persist: {
      storage: localStorage,
    },
  },
)
