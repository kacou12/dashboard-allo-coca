import axios from '@/config/axios'
import { Http } from '../Http'
import { AdminRouteApi } from '../admin/admin-constants'
import { AuthRouteApi } from './auth-constants'
import type {
  AdminPolicyResponse,
  AuthResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest
} from './auth-type'
import { getBearerToken } from './auth-util'
import { mockLoginResponse } from '@/mocks/login.mock.response'
import { env } from '@/config/env'

export async function loginApi(data: LoginRequest) {
  if (env.VITE_MOCK_API == "true") {
    // TODO: remove this once you have auth
    return Promise.resolve( {data: mockLoginResponse});
  }

  return await axios.post<SuccessResponse<LoginResponse>>(
    AuthRouteApi.login,

    data,
    //  {
    // headers: {
    //   'Device-Id': getDeviceId(),
    //   'Access-Control-Allow-Origin': '*',
    // },
    // }
  )
}

export async function profilApi() {
  // if (import.meta.env.VITE_MOCK_API == 'true') {
  // TODO: remove this once you have auth
  //   return { data: mockReponse.login } as any
  // }

  return await axios.get<SuccessResponse<AuthResponse>>(
    AuthRouteApi.profile,
  )
}
export async function updatePasswordApi({password , new_password}: {password: string, new_password: string}) {


  return await axios.post<SuccessResponse<any>>(
    AuthRouteApi.updatePassword,
    {
      password,
      new_password
    },
  )
}
export async function forgetPasswordApi({email}: {email: string}) {
 return await axios.post<SuccessResponse<any>>(
    AuthRouteApi.forgetPassword,
    {
      email
    },
  )
}
export async function resetPasswordApi(payload: ResetPasswordRequest) {
 return await axios.post<SuccessResponse<any>>(
    AuthRouteApi.resetPassword(payload.token),
    {
      new_password: payload.new_password,
      confirmed_password: payload.confirmed_password
    },
    
  )
}


export async function refreshTokenApi(refreshToken  : string) {
  // return await axios.post<SuccessResponse<RefreshTokenResponse>>('/admin/api/v1/auth/refresh-token')
  return await axios.post<SuccessResponse<LoginResponse>>(AuthRouteApi.refreshToken,
    {
      refresh_token: refreshToken 
    }
  )
}
export async function fetchAdminPoliciesByRoleIdApi(roleId: string) {
  // const res = await Http.get<AdminPolicyResponse[]>(`/admin/api/v1/policies/role/${roleId}`)
  const res = await Http.get<AdminPolicyResponse[]>(AdminRouteApi.getPolicy(roleId))

  return res
}

export async function logoutApi() {
  return await axios.delete(
    AuthRouteApi.logout,
    // {
    //   accessToken: getAccessToken(),
    // },
    {
      headers: {
        // 'Device-Id': getDeviceId(),
        Authorization: getBearerToken(),
      },
    },
  )
}
