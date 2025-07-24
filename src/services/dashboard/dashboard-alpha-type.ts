import type { TransactionResponse } from '../transactions/transaction-type'

export interface DashboardResponse {
  current_period_stats: CurrentPeriodStats
  previous_period_stats: PreviousPeriodStats
  sum_collected_txns_group_by_provider: SumCollectedTxnsGroupByProvider[]
  sum_transfered_txns_group_by_provider: SumTransferedTxnsGroupByProvider[]
  count_gift_cards_group_by_brand: CountGiftCardsGroupByBrand[]
  total_amount_gift_cards_group_by_brand: TotalAmountGiftCardsGroupByBrand[]
  count_txns_group_by_status: Status[]
  count_txns_group_by_type_and_month: CountTxnsGroupByTypeAndMonth[]
  count_txns_group_by_provider_and_type: CountTxnsGroupByProviderAndType
  txns_recents: TransactionResponse[]
}

// YANN
export interface CustomChartDataBloc {
  sum_txns: number
  sum_txns_group_by_provider?: SumTxnsGroupByProvider[]
  current_period_stats?: CustomPeriodStats
  previous_period_stats?: CustomPeriodStats
}

export interface SumTxnsGroupByProvider {
  provider: Provider
  sum_txns: number
}
export interface CustomGiftCardDataBloc {
  total: number
  total_gift_card_broup_by_brand: SumOrTotalGiftCardGroupByBrand[]
  current_period_stats: CustomPeriodGiftCardStats
  previous_period_stats: CustomPeriodGiftCardStats
}

export interface SumOrTotalGiftCardGroupByBrand {
  brand: string
  sum_or_total: number
}

export interface CustomPeriodStats {
  count_txns: number
  sum_txns: number
}
export interface CustomPeriodGiftCardStats {
  total: number
  // sum_txns: number
}

// YANN
export interface CurrentPeriodStats {
  count_txns: number
  count_transferts_txns: number
  sum_transfered_txns: number
  count_collected_txns: number
  sum_collected_txns: number
  count_giftcard_txns: number
  sum_giftcard_txns: number
}

export interface CountTxnsGroupByProviderAndType {
  collected: Collected[]
  transfered: Transfered[]
}

export interface Collected {
  name_provider: string
  status: string
  count_txns: number
}

export interface Transfered {
  name_provider: string
  status: string
  count_txns: number
}
export interface PreviousPeriodStats {
  count_txns: number
  count_transferts_txns: number
  sum_transfered_txns: number
  count_collected_txns: number
  sum_collected_txns: number
  count_giftcard_txns: number
  sum_giftcard_txns: number
}

export interface SumCollectedTxnsGroupByProvider {
  sum_txns: number
  provider: Provider
}

export interface Provider {
  name: string
  image_url: string
}

export interface SumTransferedTxnsGroupByProvider {
  sum_txns: number
  provider: Provider2
}

export interface Provider2 {
  name: string
  image_url: string
}

export interface CountGiftCardsGroupByBrand {
  brand: string
  count: number
}

export interface TotalAmountGiftCardsGroupByBrand {
  brand: string
  total_amount: number
}

export interface Status {
  status: string
  count_txns: number
}

export interface CountTxnsGroupByTypeAndMonth {
  type: string
  month_year: string
  count_txns: number
}

export interface SumTxnsGroupByProviderAndType {
  provider: string
  type: string
  status: string //  Pending, Processing,  Successful, Failed
  sum_txns: number
}

export interface TxnsRecent {
  id: string
  reference: string
  amount: number
  currency: string
  type: string
  status: string
  beneficiary_name: string
  beneficiary_phone: string
  beneficiary_provider_id: string
  beneficiary_provider: any
  beneficiary_country_code: string
  payer_name: string
  payer_phone: string
  payer_provider_id: string
  payer_provider: any
  payer_country_code: string
  fees: number
  cashout_fees: number
  cashin_fees: number
  payer_pays_fees: boolean
  payment_status: string
  transfer_status: string
  payment_transaction_id: string
  transfer_transaction_id?: string
  payment_url: any
  user_id: string
  user: any
  gift_card_id: any
  gift_card: any
  created_at: string
  updated_at: string
}
