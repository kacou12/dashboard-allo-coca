import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'

import type { MassPaymentResponse } from '@/services/mass-payment/mass-payment-type'

export const massPaymentColumn: ColumnDef<MassPaymentResponse>[] = [
  {
    accessorKey: 'name',
    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Nom et prénom'),
    cell: ({ row }) => {
      const rowOriginal: MassPaymentResponse = row.original
      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.name)
    },
  },
  {
    accessorKey: 'phone',
    header: () => h('div', { class: 'text-left text-xs ' }, 'Numero'),
    cell: ({ row }) => {
      const rowOriginal: MassPaymentResponse = row.original
      return h('div', { class: 'text-left min-w-[150px]' }, rowOriginal.phone)
    },
  },
  {
    accessorKey: 'network',
    header: () => h('div', { class: 'text-left text-xs ' }, 'Réseau'),
    cell: ({ row }) => {
      const rowOriginal: MassPaymentResponse = row.original
      return h('div', { class: 'text-left min-w-[150px]' }, rowOriginal.network)
    },
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right text-xs ' }, 'Montant'),
    cell: ({ row }) => {
      const rowOriginal: MassPaymentResponse = row.original
      return h('div', { class: 'text-right min-w-[100px]' }, rowOriginal.amount)
    },
  },
]