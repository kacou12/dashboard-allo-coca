export interface UserType {
  id: string
  nom: string
  prenom: string
  email: string
  typePieceIdentite: string
  statusVerification: string
  dateSoumission: string
}

export enum TransactionTypeEnum {
  transfert = "Transfert d'argent",
  default = 'default',
}
export enum AdministrationRoleEnum {
  SUPER_ADMIN = 'Super Administrateur',
  ADMIN = 'Administrateur',
  SERVICE_CLIENT = 'Service client',
}

// TRANSACTION
export const SamplingStatusEnum = Object.freeze({
  ATTEMPT: { name: 'En attente', color: '#CCCCCC' },
  SUCCESS: { name: 'Réussis', color: '#4CAF50' },
  FAILURE: { name: 'Echec', color: '#F44336 ' },
})

export const TransactionStatusEnum = Object.freeze({
  PENDING: { value: 'Pending', name: 'En attente', color: '#F5F5F5', textColor: '#525866' },
  PROCESSING: { value: 'Processing', name: 'En cours', color: '#E1F5FE', textColor: '#0288D1' },
  SUCCESS: { value: 'Successful', name: 'Effectué', color: '#C8E6C9', textColor: '#388E3C' },
  FAILED: { value: 'Failed', name: 'Échec', color: '#FFCDD2', textColor: '#D32F2F' },
})
export const TransactionNetworkEnum = Object.freeze({
  WAVE: { name: 'wave', path: 'wave.png' },
  ORANGE: { name: 'orange', path: 'orange.png' },
  MTN: { name: 'mtn', path: 'mtn.png' },
  MOOV: { name: 'moov', path: 'moov.png' },
})

export interface UserTransactionType {
  img: string
  name: string
  phone: string
}

export interface TransactionType {
  id: string
  user: UserTransactionType
  transaction: TransactionTypeEnum
  date: string
  debitNumber: string
  samplingStatus: string
  amount: string
  beneficiaryPhone: string
  transactionStatus: string
}
// export interface AdministrationType {
//   id: string
//   user: UserTransactionType
//   role: AdministrationRoleEnum
// }
