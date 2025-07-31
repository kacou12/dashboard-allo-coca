import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'


import { formatRelativeDate } from '@/lib/utils'

import type { BeneficiaryResponse } from '@/services/beneficiaries/beneficiary-type'
import BeneficiaryUserBloc from './beneficiaryUserBloc.vue'
import BeneficiariesActionBloc from './beneficiariesActionBloc.vue'


export const beneficiariesColumns: ColumnDef<BeneficiaryResponse>[] = [

    {
    accessorKey: 'beneficiary',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs min-w-[400px]' }, 'Bénéficiaire'),
    cell: ({ row }) => {
      // const debitNumber = row.getValue('debitNumber') as string
      const beneficary:BeneficiaryResponse = row.original 

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm  flex items-center min-w-[400px]' },
        h(BeneficiaryUserBloc, {
          beneficiary: beneficary,
        }),
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
      const transaction: BeneficiaryResponse = row.original

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
    accessorKey: 'description',
    // enableResizing: false,
    header: () => h('div', { class: 'text-left text-xs w-[200px]' }, 'Description'),
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      const testDate = new Date(date)
      const beneficiary: BeneficiaryResponse = row.original

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm w-[200px] truncate ' },
        beneficiary.description,
      )
    },
  }, 
  // ACTIONS
  {
    id: 'actions',
    // enableHiding: false,

    cell: ({ row }) => {
      const beneficiary: BeneficiaryResponse = row.original

      return h(
        'div',
        { class: 'text-left' },
        h(
          // RecentTransactionActionDropdown, {
          BeneficiariesActionBloc, {
          beneficiary: beneficiary,
        }),
      )
    },
  },
]
