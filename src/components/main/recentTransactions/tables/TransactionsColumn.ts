import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'
import debitNumberBloc from './debitNumberBloc.vue'

import TransactionUserBloc from '@/components/main/transactionsManagement/tables/transactionUserBloc.vue'
import { formatRelativeDate } from '@/lib/utils'
import type { TransactionResponse } from '@/services/transactions/transaction-type'

import RecentTransactionActionDropdown from '@/components/dropdowns/recentTransactionActionDropdown.vue'
import BeneficiaryNumberBloc from './beneficiaryNumberBloc.vue'
import TransactionPaymentStatusBloc from './transactionPaymentStatusBloc.vue'
import TransactionStatusBloc from './transactionStatusBloc.vue'
import TransactionTypeBloc from './transactionTypeBloc.vue'

export const recentsTransactionsColumns: ColumnDef<TransactionResponse>[] = [
  // {
  //   accessorKey: 'id',
  //   // enableResizing: false,
  //   header: () => h('div', { class: 'text-left text-xs' }, 'N°'),
  //   cell: ({ row }) => {
  //     const transaction: TransactionResponse = row.original

  //     return h('div', { class: 'text-left text-sm text-neutral-20 ' }, row.index + 1)
  //   },
  // },
  {
    accessorKey: 'user',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs' }, 'Utilisateur'),
    cell: ({ row }) => {
      // const user: UserTransactionType = row.getValue('user')

      const transaction: TransactionResponse = row.original
      // transaction.user

      return h(
        'div',
        { class: 'text-left min-w-[190px]' },
        h(TransactionUserBloc, {
          transaction: transaction,
        }),
      )
    },
  },
  {
    accessorKey: 'transaction',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs' }, 'Type'),
    cell: ({ row }) => {
      const transaction: TransactionResponse = row.original

      return h(
        'div',
        {
          class: 'text-left text-sm font-medium  ',
        },
        h(TransactionTypeBloc, { transaction: transaction }),
      )
    },
  },

  {
    accessorKey: 'date',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs' }, 'Date et heure'),
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      const testDate = new Date(date)
      const transaction: TransactionResponse = row.original

      // const formatted = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'USD',
      // }).format(amount)

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
        formatRelativeDate(new Date(transaction.created_at)),
      )
    },
  },
  {
    accessorKey: 'debitNumber',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs' }, 'Numéro debité'),
    cell: ({ row }) => {
      // const debitNumber = row.getValue('debitNumber') as string
      const transaction: TransactionResponse = row.original

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm  flex items-center ' },
        h(debitNumberBloc, {
          transaction: transaction,
        }),
      )
    },
  },
  {
    accessorKey: 'paymentStatus',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Statut de prélèvement'),
    cell: ({ row }) => {
      // const samplingStatus: SamplingStatusEnum = row.getValue('samplingStatus')
      const transaction: TransactionResponse = row.original

      return h(
        'div',
        {
          class: ' text-neutral-20 text-xs min-w-[150px] flex items-center',
        },
        h(TransactionPaymentStatusBloc, {
          transaction: transaction,
        }),
      )
    },
  },
  {
    accessorKey: 'amount',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left  text-xs' }, 'Montant'),
    cell: ({ row }) => {
      // const amount = Number.parseFloat(row.getValue('amount'))

      const transaction: TransactionResponse = row.original
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
      }).format(transaction.amount)

      return h('div', { class: 'text-left  text-neutral-20 text-sm' }, formatted)
    },
  },
  // {
  //   accessorKey: 'transferStatus',
  //   // enableResizing: false,
  //   header: () => h('div', { class: 'text-left text-xs ' }, 'Statut de transfert'),
  //   cell: ({ row }) => {
  //     // const samplingStatus: SamplingStatusEnum = row.getValue('samplingStatus')
  //     const transaction: TransactionResponse = row.original
  //     // const fullStatus = `
  //     // <div class='flex justify-left w-fit
  //     // border-neutral-80 border-[1px] text-center py-1 px-1 rounded-sm items-center'>
  //     //   <span class='flex w-[6px] h-[6px] me-1 bg-red-500 rounded-full'></span>
  //     //   <span> ${SamplingStatusEnum.ATTEMPT.name} </span>
  //     // </div>`
  //     return h(
  //       'div',
  //       {
  //         class: ' text-neutral-20 text-xs min-w-[150px] flex items-center',
  //       },
  //       h(TransactionTransferStatusBloc, {
  //         transaction: transaction,
  //       }),
  //     )
  //   },
  // },
  {
    accessorKey: 'beneficiaryPhone',
    enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Bénéficiaire'),
    cell: ({ row }) => {
      const transaction: TransactionResponse = row.original
      const beneficiaryPhone: string = row.getValue('beneficiaryPhone')

      return h(
        'div',
        {
          class: 'text-neutral-20 text-xs   flex items-center',
        },
        h(BeneficiaryNumberBloc, {
          transaction: transaction,
        }),
      )
    },
  },
  {
    accessorKey: 'transactionStatus',
    // enableResizing: false,

    header: () => h('div', { class: 'text-left text-xs ' }, 'Statut'),
    cell: ({ row }) => {
      const transactionStatus = row.getValue('transactionStatus')
      const transaction: TransactionResponse = row.original

      // const fullStatus = `

      // <span class="text-xs text-center font-medium px-2 py-[1px] rounded-2xl bg-success-light-3 text-success-dark">
      //   ${TransactionStatusEnum.SUCCESS.name}</span>`
      return h(
        'div',
        {
          class: ' text-neutral-20 text-xs  min-w-[80px]',
        },
        h(TransactionStatusBloc, {
          transaction: transaction,
        }),
      )
    },
  },
  // ACTIONS
  {
    id: 'actions',
    // enableHiding: false,

    cell: ({ row }) => {
      const transaction: TransactionResponse = row.original

      return h(
        'div',
        { class: 'text-left' },
        h(RecentTransactionActionDropdown, {
          transaction: transaction,
        }),
      )
    },
  },
]
