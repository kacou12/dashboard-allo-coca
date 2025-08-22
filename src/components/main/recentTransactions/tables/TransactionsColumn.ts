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
import TransactionDetailModal from './transactionDetailModal.vue'

export const recentsTransactionsColumns: ColumnDef<TransactionResponse>[] = [

  {
    accessorKey: 'user',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs min-w-[200px] ' }, 'Emetteur'),
    cell: ({ row }) => {
      // const user: UserTransactionType = row.getValue('user')

      const transaction: TransactionResponse = row.original
      // transaction.user

      return h(
        'div',
        { class: 'text-left min-w-[200px]' },
        h(TransactionUserBloc, {
          transaction: transaction,
        }),
      )
    },
  },
    {
    accessorKey: 'beneficiary',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs min-w-[100px]' }, 'Bénéficiaire'),
    cell: ({ row }) => {
      // const debitNumber = row.getValue('debitNumber') as string
      const transaction: TransactionResponse = row.original

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm  flex items-center min-w-[100px]' },
        h(debitNumberBloc, {
          transaction: transaction,
        }),
      )
    },
  },

  {
    accessorKey: 'date',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs min-w-[150px]' }, 'Date et heure'),
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
        { class: 'text-left  text-neutral-20 text-sm ' },
        formatRelativeDate(new Date(transaction.created_at)),
      )
    },
  },
   {
    accessorKey: 'amount',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left  text-xs ' }, 'Montant'),
    cell: ({ row }) => {
      // const amount = Number.parseFloat(row.getValue('amount'))

      const transaction: TransactionResponse = row.original
      const formatted = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
      }).format(transaction.amount)

      return h('div', { class: 'text-left  text-neutral-20 text-sm ' }, formatted)
    },
  },

   {
    accessorKey: 'type',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs' }, 'Type transaction'),
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
    accessorKey: 'transactionStatus',
    // enableResizing: false,

    header: () => h('div', { class: 'text-left text-xs min-w-[80px]' }, 'Statut'),
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
        h(
          // RecentTransactionActionDropdown, {
          TransactionDetailModal, {
          transaction: transaction,
        }),
      )
    },
  },
]
