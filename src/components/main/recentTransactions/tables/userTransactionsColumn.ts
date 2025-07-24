import type { ColumnDef } from '@tanstack/vue-table'

import { SamplingStatusEnum } from '@/interfaces/datatable.interface'
import { formatPrice, formatRelativeDate } from '@/lib/utils'
import type { TransactionResponse } from '@/services/transactions/transaction-type'
import { h } from 'vue'
import BeneficiaryNumberBloc from './beneficiaryNumberBloc.vue'
import DebitNumberBloc from './debitNumberBloc.vue'
import TransactionStatusBloc from './transactionStatusBloc.vue'
import TransactionTypeBloc from './transactionTypeBloc.vue'
import TransactionUserBloc from '../../transactionsManagement/tables/transactionUserBloc.vue'
import TransactionPaymentStatusBloc from './transactionPaymentStatusBloc.vue'
import RecentTransactionActionDropdown from '@/components/dropdowns/recentTransactionActionDropdown.vue'

export const userRecentsTransactionsColumn: ColumnDef<TransactionResponse>[] = [
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
        h(DebitNumberBloc, {
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

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm' },
        formatPrice(transaction.amount),
      )
    },
  },
  {
    accessorKey: 'beneficiaryPhone',
    enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Bénéficiaire'),
    cell: ({ row }) => {
      const transaction: TransactionResponse = row.original
      const beneficiaryPhone: string = row.getValue('beneficiaryPhone')
      // const fullStatus = `
      // <div class="flex  gap-2">
      //    <img class="w-[20px] h-[20px]" src="${new URL('/src/assets/images/logos/wave.png', import.meta.url).href}" alt="">
      //    <p class="text-sm text-neutral-20">${beneficiaryPhone}</p>
      //    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      //     <g clip-path="url(#clip0_14124_9314)">
      //       <path d="M10.264 19.1667H4.61052C3.60935 19.1644 2.64983 18.7657 1.9419 18.0578C1.23397 17.3498 0.83526 16.3903 0.833008 15.3892V9.7357C0.833005 8.73305 1.23072 7.77135 1.9389 7.06158C2.64707 6.3518 3.60787 5.95192 4.61052 5.94966H10.264C11.2681 5.94966 12.2311 6.34855 12.9411 7.05857C13.6511 7.76859 14.05 8.73158 14.05 9.7357V15.3892C14.0478 16.3918 13.6479 17.3526 12.9381 18.0608C12.2283 18.769 11.2666 19.1667 10.264 19.1667ZM4.61052 7.22873C3.9471 7.23099 3.31164 7.49611 2.84333 7.96601C2.37503 8.43591 2.11207 9.07228 2.11207 9.7357V15.3892C2.11207 16.0518 2.3753 16.6873 2.84385 17.1558C3.3124 17.6244 3.94789 17.8876 4.61052 17.8876H10.264C10.9274 17.8876 11.5638 17.6247 12.0337 17.1564C12.5036 16.688 12.7687 16.0526 12.771 15.3892V9.7357C12.771 9.07081 12.5068 8.43315 12.0367 7.963C11.5665 7.49286 10.9289 7.22873 10.264 7.22873H4.61052ZM16.4376 13.8969C17.2242 13.6681 17.9154 13.1904 18.4074 12.5354C18.8994 11.8805 19.1657 11.0836 19.1663 10.2644V4.61091C19.164 3.60974 18.7653 2.65023 18.0574 1.94229C17.3495 1.23436 16.3899 0.835653 15.3888 0.8334H9.7353C8.94415 0.829053 8.17169 1.07378 7.52737 1.53292C6.88305 1.99205 6.39956 2.6423 6.14539 3.39153C6.11153 3.47279 6.09481 3.56017 6.09628 3.64819C6.09774 3.73621 6.11737 3.82298 6.15392 3.90307C6.19047 3.98315 6.24316 4.05483 6.30869 4.11361C6.37423 4.17239 6.45119 4.21701 6.53477 4.24467C6.61834 4.27234 6.70673 4.28244 6.79439 4.27437C6.88205 4.26629 6.9671 4.24021 7.04421 4.19774C7.12133 4.15528 7.18885 4.09735 7.24254 4.02758C7.29623 3.95782 7.33494 3.87772 7.35624 3.79231C7.52304 3.29395 7.84274 2.86088 8.26987 2.5547C8.69699 2.24852 9.20978 2.08482 9.7353 2.08688H15.3888C16.0514 2.08688 16.6869 2.35011 17.1554 2.81866C17.624 3.28721 17.8872 3.9227 17.8872 4.58533V10.2388C17.8785 10.7792 17.6989 11.3029 17.3742 11.7349C17.0494 12.1669 16.5962 12.485 16.0795 12.6434C15.9166 12.6909 15.7793 12.8012 15.6978 12.9499C15.6162 13.0986 15.5971 13.2736 15.6446 13.4365C15.6921 13.5993 15.8023 13.7366 15.951 13.8181C16.0998 13.8997 16.2748 13.9188 16.4376 13.8713V13.8969Z" fill="#1A1A1A"/>
      //       </g>
      //       <defs>
      //       <clipPath id="clip0_14124_9314">
      //       <rect width="20" height="20" fill="white"/>
      //       </clipPath>
      //       </defs>
      //     </svg>

      // </div>`
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
          class: ' text-neutral-20 text-xs',
        },
        h(TransactionStatusBloc, {
          transaction: transaction,
        }),
      )
    },
  },
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
