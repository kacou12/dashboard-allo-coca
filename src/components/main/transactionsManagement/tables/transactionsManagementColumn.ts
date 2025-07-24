import type { ColumnDef } from '@tanstack/vue-table'

import detailAppleCardTransactionModal from '@/components/modals/detailAppleCardTransactionModal.vue'
import detailMobileMoneyTransactionModal from '@/components/modals/detailMobileMoneyTransactionModal.vue'
import {
  SamplingStatusEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
  type TransactionType,
  type UserTransactionType,
} from '@/interfaces/datatable.interface'
import { h } from 'vue'
import TransactionUserBloc from './transactionUserBloc.vue'
import TransactionPaymentBloc from './transactionPaymentBloc.vue'
import { formatPhoneNumber, formatRelativeDate } from '@/lib/utils'

export const transactionData: TransactionType[] = [
  {
    id: '1',
    user: { img: 'https://via.placeholder.com/150', name: 'Alice Dupont', phone: '+33612345678' },
    transaction: TransactionTypeEnum.transfert,
    date: '2025-01-30T10:15:30Z',
    debitNumber: '+33698765432',
    samplingStatus: SamplingStatusEnum.ATTEMPT.name,
    amount: '250.00',
    beneficiaryPhone: '+33623456789',
    transactionStatus: TransactionStatusEnum.PENDING.name,
  },
  {
    id: '2',
    user: { img: 'https://via.placeholder.com/150', name: 'Bob Martin', phone: '+33698765000' },
    transaction: TransactionTypeEnum.transfert,
    date: '2025-01-29T14:45:00Z',
    debitNumber: '+33611223344',
    samplingStatus: SamplingStatusEnum.SUCCESS.name,
    amount: '100.00',
    beneficiaryPhone: '+33677889900',
    transactionStatus: TransactionStatusEnum.SUCCESS.name,
  },
  {
    id: '3',
    user: {
      img: 'https://via.placeholder.com/150',
      name: 'Charlie Bernard',
      phone: '+33655667788',
    },
    transaction: TransactionTypeEnum.default,
    date: '2025-01-25T09:30:00Z',
    debitNumber: '+33666554433',
    samplingStatus: SamplingStatusEnum.FAILURE.name,
    amount: '500.00',
    beneficiaryPhone: '+33699887766',
    transactionStatus: TransactionStatusEnum.FAILED.name,
  },
  {
    id: '4',
    user: { img: 'https://via.placeholder.com/150', name: 'Diane Leroy', phone: '+33611224455' },
    transaction: TransactionTypeEnum.transfert,
    date: '2025-01-28T11:45:10Z',
    debitNumber: '+33677441122',
    samplingStatus: SamplingStatusEnum.SUCCESS.name,
    amount: '320.50',
    beneficiaryPhone: '+33633221100',
    transactionStatus: TransactionStatusEnum.SUCCESS.name,
  },
  {
    id: '5',
    user: { img: 'https://via.placeholder.com/150', name: 'Ethan Morel', phone: '+33699887722' },
    transaction: TransactionTypeEnum.transfert,
    date: '2025-01-27T17:20:00Z',
    debitNumber: '+33666558899',
    samplingStatus: SamplingStatusEnum.ATTEMPT.name,
    amount: '75.00',
    beneficiaryPhone: '+33688776655',
    transactionStatus: TransactionStatusEnum.PENDING.name,
  },
  {
    id: '6',
    user: { img: 'https://via.placeholder.com/150', name: 'Fiona Dubois', phone: '+33677665544' },
    transaction: TransactionTypeEnum.transfert,
    date: '2025-01-26T13:00:00Z',
    debitNumber: '+33655443322',
    samplingStatus: SamplingStatusEnum.FAILURE.name,
    amount: '200.00',
    beneficiaryPhone: '+33699884477',
    transactionStatus: TransactionStatusEnum.FAILED.name,
  },
  {
    id: '7',
    user: { img: 'https://via.placeholder.com/150', name: 'Gaspard Noël', phone: '+33644332211' },
    transaction: TransactionTypeEnum.transfert,
    date: '2025-01-30T08:30:00Z',
    debitNumber: '+33677556699',
    samplingStatus: SamplingStatusEnum.ATTEMPT.name,
    amount: '150.00',
    beneficiaryPhone: '+33699883355',
    transactionStatus: TransactionStatusEnum.PENDING.name,
  },
  {
    id: '8',
    user: {
      img: 'https://via.placeholder.com/150',
      name: 'Hélène Fontaine',
      phone: '+33699884455',
    },
    transaction: TransactionTypeEnum.transfert,
    date: '2025-01-24T15:50:00Z',
    debitNumber: '+33655442233',
    samplingStatus: SamplingStatusEnum.SUCCESS.name,
    amount: '410.00',
    beneficiaryPhone: '+33699887700',
    transactionStatus: TransactionStatusEnum.SUCCESS.name,
  },
  {
    id: '9',
    user: { img: 'https://via.placeholder.com/150', name: 'Ismael Perret', phone: '+33666559988' },
    transaction: TransactionTypeEnum.transfert,
    date: '2025-01-22T19:45:00Z',
    debitNumber: '+33677553322',
    samplingStatus: SamplingStatusEnum.SUCCESS.name,
    amount: '350.00',
    beneficiaryPhone: '+33622334411',
    transactionStatus: TransactionStatusEnum.SUCCESS.name,
  },
  {
    id: '10',
    user: {
      img: 'https://via.placeholder.com/150',
      name: 'Juliette Lemoine',
      phone: '+33688774455',
    },
    transaction: TransactionTypeEnum.default,
    date: '2025-01-23T10:10:00Z',
    debitNumber: '+33655448899',
    samplingStatus: SamplingStatusEnum.FAILURE.name,
    amount: '90.00',
    beneficiaryPhone: '+33633225544',
    transactionStatus: TransactionStatusEnum.FAILED.name,
  },
]

export const transactionsManagementColumn: ColumnDef<TransactionType>[] = [
  {
    accessorKey: 'user',
    // size: 100,
    // maxSize: 100,
    size: 440,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Utilisateur'),

    cell: ({ row }) => {
      const user: UserTransactionType = row.getValue('user')

      const rowOriginal = row.original

      return h('div', { class: 'text-left ' }, h(TransactionPaymentBloc, {}))
    },
  },

  {
    accessorKey: 'date',
    // size: 10,
    header: () => h('div', { class: 'text-left text-xs' }, 'Date et heure'),
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      const testDate = new Date(date)

      const formatedDate = new Intl.DateTimeFormat('fr-FR').format(new Date(date))
      // const formatted = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'USD',
      // }).format(amount)

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        formatRelativeDate(new Date(date)),
      )
    },
  },
  {
    accessorKey: 'beneficiaryPhone',
    // size: 10,
    header: () => h('div', { class: 'text-left text-xs' }, 'Détail transaction'),
    cell: ({ row }) => {
      const transactionDetail = row.getValue('beneficiaryPhone') as string

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        formatPhoneNumber(transactionDetail),
      )
    },
  },

  {
    accessorKey: 'amount',
    // size: 10,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Montant'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
      }).format(amount)

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, formatted)
    },
  },

  {
    accessorKey: 'transactionStatus',
    size: 126,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Statut'),
    cell: ({ row }) => {
      const transactionStatus = row.getValue('transactionStatus')

      const fullStatus = `
      
      <span class="text-xs text-center font-medium px-2 py-[1px] rounded-2xl bg-success-light-3 text-success-dark">
        ${TransactionStatusEnum.SUCCESS.name}</span>
      
      `
      return h('div', {
        class: ' text-neutral-20 text-xs',
        innerHTML: fullStatus,
      })
    },
  },
  // ACTIONS
  {
    id: 'actions',
    enableHiding: false,
    size: 50,
    cell: ({ row }) => {
      const rowOriginal = row.original

      return h(
        'div',
        { class: 'text-left' },
        h(
          parseInt(rowOriginal.id) % 2 == 0
            ? detailAppleCardTransactionModal
            : detailMobileMoneyTransactionModal,
          {
            id: rowOriginal.id,
          },
        ),
      )
    },
  },
]
