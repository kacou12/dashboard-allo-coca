import { i18n } from '@/locales'
import { z } from 'zod'

export const settingsSchema = z.object({
  fees: z
    .number({ required_error: i18n.global.t('settings.validation.fees') })
    .min(0, { message: i18n.global.t('settings.validation.fees_min') }),
  international_fee: z
    .number({ required_error: i18n.global.t('settings.validation.fees') })
    .min(0, { message: i18n.global.t('settings.validation.fees_min') }),
  unverified_user_daily_limit: z
    .number({ required_error: i18n.global.t('settings.validation.unverified_daily') })
    .min(0, { message: i18n.global.t('settings.validation.limit_min') }),
  unverified_user_monthly_limit: z
    .number({ required_error: i18n.global.t('settings.validation.unverified_monthly') })
    .min(0, { message: i18n.global.t('settings.validation.limit_min') }),
  verified_user_daily_limit: z
    .number({ required_error: i18n.global.t('settings.validation.verified_daily') })
    .min(0, { message: i18n.global.t('settings.validation.limit_min') }),
  verified_user_monthly_limit: z
    .number({ required_error: i18n.global.t('settings.validation.verified_monthly') })
    .min(0, { message: i18n.global.t('settings.validation.limit_min') }),
  giftcard_availability: z.boolean({
    required_error: i18n.global.t('settings.validation.giftcard_availability'),
  }),
})
