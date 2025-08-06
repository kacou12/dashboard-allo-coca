
import { authQueryKeys } from '@/services/auth/auth-query-keys'
import { fetchProfil, forgetPassword, resetPassword, updatePassword } from '@/services/auth/auth-service'
import type { ResetPasswordRequest } from '@/services/auth/auth-type'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'


export function useAuthProfilQuery({enabled  = false}:{enabled?:boolean}) {
  return useQuery({
    queryKey: computed(() => authQueryKeys.profil),
    queryFn: ({ signal }) => fetchProfil(),
    enabled: enabled,
  })
}

export function useUpdateUserPasswordMutation() {

  return useMutation({
    mutationFn: (payload: {password: string, new_password: string}) => updatePassword(payload),
    
    onSuccess: () => {
    
      console.log('user update successfully')
    },
  });
}

export function useForgetPasswordMutation() {

  return useMutation({
    mutationFn: ({email}: {email: string}) => forgetPassword({email}),
    
    onSuccess: () => {
    
      console.log('user forget password successfully')
    },
  });
}

export function useResetPasswordMutation() {

  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) => resetPassword(payload),
    
    onSuccess: () => {
    
      console.log('user reset password successfully')
    },
  });
}