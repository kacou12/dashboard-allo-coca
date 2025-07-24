// import { env } from '@/config/env'
import axios from '@/config/axios'
import type {
  AdminPolicyResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './auth-type'
import { getBearerToken, getDeviceId } from './auth-util'
import { AuthRouteApi } from './auth-constants'
import { Http } from '../Http'
import { AdminRouteApi } from '../admin/admin-constants'

export async function loginApi(data: LoginRequest) {
  // if (import.meta.env.VITE_MOCK_API == 'true') {
  //   // TODO: remove this once you have auth
  //   return { data: mockReponse.login } as any
  // }

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

export async function refreshTokenApi() {
  // return await axios.post<SuccessResponse<RefreshTokenResponse>>('/admin/api/v1/auth/refresh-token')
  return await axios.post<string>('/admin/api/v1/auth/refresh-token')
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
