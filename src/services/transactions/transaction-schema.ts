import { i18n } from '@/locales'
import { z } from 'zod'

export const transactionSchema = z.object({})

const TransfertTransactionSchema = z.object({
    amount: z
        .number({ required_error: i18n.global.t('login.validation.username') })
        .min(0, { message: i18n.global.t('login.validation.username') }),
    phoneNumber: z
        .string({ required_error: i18n.global.t('login.validation.username') })
        .min(0, { message: i18n.global.t('login.validation.username') }),
})
