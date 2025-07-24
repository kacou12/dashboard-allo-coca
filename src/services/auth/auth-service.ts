import router from '@/router'
import type {
  AdminPolicyResponse,
  LoginForm,
  LoginRequest,
  RefreshTokenRequest,
} from '@/services/auth/auth-type'
import { destroySensitiveInfo, getDeviceId, getRefreshToken, saveToken } from './auth-util'
import { AppRoute } from '@/constants/app-route'
import { fetchAdminPoliciesByRoleIdApi, loginApi, logoutApi, refreshTokenApi } from './auth-api'
import { useToast } from 'vue-toastification'
import type { AxiosError } from 'axios'

export async function loginWithCredential({ email, password }: LoginForm) {
  const toast = useToast()
  try {
    const data: LoginRequest = {
      email: email.trim(),
      password: password.trim(),
    }

    const res = await loginApi(data)
    const { access_token, duration } = res.data?.data! ?? {}
    saveToken(access_token)

    return res.data
  } catch (error: any) {
    const localError = (error as AxiosError)
    // toast.error((error as AxiosError).message)
    //@ts-ignore
    toast.error(localError.response?.data.msg ?? 'Quelque chose s\'est mal passé')
    // throw Error(error.response.data.message)
  }
}

export async function refreshToken(): Promise<string | undefined> {
  try {
    // if (getRefreshToken() && getDeviceId()) {
    // const data: RefreshTokenRequest = {
    //   grantType: 'refresh_token',
    //   clientId: import.meta.env.CLIENT_ID ?? '',
    //   clientSecret: import.meta.env.CLIENT_SECRET ?? '',
    //   refreshToken: getRefreshToken() ?? '',
    // }

    const res = await refreshTokenApi()
    const accessToken = res.data
    saveToken(accessToken)
    // TODO: display dialog session expired
    return 'Successfully'
    // }

    // destroySensitiveInfo()
    // router.push({ name: AppRoute.LOGIN.name })
  } catch (error: any) {
    // TODO: display dialog session expired
    destroySensitiveInfo()
    router.push({ name: AppRoute.LOGIN.name })
  }
}

export async function fetchAdminPoliciesByRoleId(
  roleId: string,
): Promise<AdminPolicyResponse[] | undefined> {
  try {
    const res = await fetchAdminPoliciesByRoleIdApi(roleId)
    return res
  } catch (error: any) {
    throw Error(error.response.data.message)
  }
}

export async function logout() {
  try {
    const res = await logoutApi()
    destroySensitiveInfo()
  } catch (err) {
    destroySensitiveInfo()
  }
  // router.push({ name: AppRoute.LOGIN.name })
}
