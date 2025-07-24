import type { UserVerificationFiltersPayload } from '../global.type'

export const userVerificationsQueryKeys = {
  userVerification: ({ id, country }: { id: string; country: string }) => [
    'userVerification',
    { id },
    { country },
  ],
  userVerificationStats: ({ country }: { country: string }) => [
    'userVerificationStats',
    { country },
  ],
  userVerificationPagination: (page: number) => ['userVerification', { page }],
  userVerificationFilters: (payload: UserVerificationFiltersPayload) => [
    'userVerification',
    { page: payload.page },
    { q: payload.q },
    { country_id: payload.country_id },
    { typeDoc: payload.typeDoc },
    { status: payload.status },
    { dates: payload.dates },
  ],
}
