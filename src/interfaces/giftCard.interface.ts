export interface PurChasingCardType {
  // id: number
  title: string
  img: string
  code: string
}

export interface LocalPurChasingCardType {
  id: number
  // name: string
  subscriptionType: string
  subscriptionCount: number
  color: string
}
// Types pour les transactions
export interface GiftCardType {
  id: string
  cardTransaction: PurChasingCardType
  date: string
  amount: string
  samplingStatus: string
  info?: string
}

export enum TransactionType {
  PAYMENT = 'payment',
  TRANSFER = 'transfer',
  PURCHASE = 'purchase',
}

// Énumération pour grouper les transactions
enum TransactionGroup {
  TODAY = "Aujourd'hui",
  YESTERDAY = 'Hier',
  OTHER = '02/07/2024',
}
