import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'

import type { RoleResponse } from '@/services/admin/admin-type'
import roleActionsBloc from './roleActionsBloc.vue'
// import TransactionUserBloc from './transactionUserBloc.vue'
// import TransactionPaymentBloc from './transactionPaymentBloc.vue'

export const rolesColumn: ColumnDef<RoleResponse>[] = [
  {
    accessorKey: 'id',
    // size: 100,
    // maxSize: 100,
    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Id'),

    cell: ({ row }) => {
      const rowOriginal: RoleResponse = row.original

      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.id)
    },
  },
  {
    accessorKey: 'name',
    // size: 100,
    // maxSize: 100,
    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Role'),

    cell: ({ row }) => {
      const rowOriginal: RoleResponse = row.original

      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.name)
    },
  },

  {
    accessorKey: 'description',
    // size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Description'),
    cell: ({ row }) => {
      const rowOriginal: RoleResponse = row.original
      //   const testDate = new Date(date)

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
        rowOriginal.description,
      )
    },
  },

  // ACTIONS
  {
    id: 'actions',
    // enableHiding: false,
    size: 116,
    cell: ({ row }) => {
      const rowOriginal = row.original

      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(roleActionsBloc, {
          role: rowOriginal,
        }),
      )
    },
  },
]
