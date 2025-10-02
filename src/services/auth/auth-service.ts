import { AppRoute } from '@/constants/app-route'
import router from '@/router'
import type {
  AdminPolicyResponse,
  AuthResponse,
  LoginForm,
  LoginRequest,
  ResetPasswordRequest
} from '@/services/auth/auth-type'
import { useAuthStore } from '@/stores/useAuthStore'
import type { AxiosError } from 'axios'
import { useToast } from 'vue-toastification'
import { fetchAdminPoliciesByRoleIdApi, forgetPasswordApi, loginApi, logoutApi, profilApi, refreshTokenApi, resetPasswordApi, updatePasswordApi } from './auth-api'
import { destroySensitiveInfo, saveToken } from './auth-util'

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

    return res.data.data
  } catch (error: any) {
    const localError = (error as AxiosError)
    // toast.error((error as AxiosError).message)
    //@ts-ignore
    toast.error(localError.response?.data.msg ?? 'Quelque chose s\'est mal passé')
    // throw Error(error.response.data.message)
  }
}


export async function updatePassword(payload: {password: string, new_password: string}) {
  const toast = useToast()
  try {
    const res = await updatePasswordApi(payload)
   
    return res.data
  } catch (error: any) {
    const localError = (error as AxiosError<ErrorResponse>)
     toast.error(localError.response?.data.error ?? 'Quelque chose s\'est mal passé')
     throw error;
  }
}

export async function forgetPassword({email}: {email: string}) {
  const toast = useToast()
  try {
    const res = await forgetPasswordApi({email})
   
    return res.data
  } catch (error: any) {
    const localError = (error as AxiosError<ErrorResponse>)
     toast.error(localError.response?.data.error ?? 'Quelque chose s\'est mal passé')
     throw error;
  }
}
export async function resetPassword(payload: ResetPasswordRequest) {
  const toast = useToast()
  try {
    const res = await resetPasswordApi(payload)
   
    return res.data
  } catch (error: any) {
    const localError = (error as AxiosError<ErrorResponse>)
     toast.error(localError.response?.data.error ?? 'Quelque chose s\'est mal passé')
     throw error;
  }
}

export async function fetchProfil(): Promise<AuthResponse | undefined> {
  const toast = useToast()
  const { setUser } = useAuthStore();
  try {
   

    const res = await profilApi()
    setUser(res.data.data!)

    return res.data.data;
  } catch (error: any) {
    const localError = (error as AxiosError<ErrorResponse>)
     toast.error(localError.response?.data.message ?? 'Quelque chose s\'est mal passé')
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
