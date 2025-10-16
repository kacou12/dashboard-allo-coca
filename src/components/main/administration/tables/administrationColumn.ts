import type { ColumnDef } from '@tanstack/vue-table'

import type { ClientResponse } from '@/services/allococa/clients/client-type'
import { h } from 'vue'
import AdministrationActionsBloc from './administrationActionsBloc.vue'
import AdministrationUserBloc from './administrationUserBloc.vue'


const formatPhoneNumber = (phone: string): string => `+225 ${phone}`


export const administrationColumn: ColumnDef<ClientResponse>[] = [
  {
    accessorKey: 'user',
    size: 500,
    header: () => h('div', { class: 'text-left text-xs ' }, 'Utilisateur'),

    cell: ({ row, cell }) => {
      const rowOriginal: ClientResponse = row.original
  
      return h(
        'div',
        { class: 'text-left min-w-[250px]' },
        h(AdministrationUserBloc, {
          admin: rowOriginal,
        }),
      )
    },
  },

  {
    accessorKey: 'phone',
    // size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Numéro'),
    cell: ({ row }) => {
      const rowOriginal: ClientResponse = row.original
      //   const testDate = new Date(date)

      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm min-w-[150px]' },
        formatPhoneNumber(rowOriginal.phone),
      )
    },
  },
  {
    accessorKey: 'role',
    // size: 150,
    header: () => h('div', { class: 'text-left text-xs' }, 'Rôle'),
    cell: ({ row }) => {
      const rowOriginal: ClientResponse = row.original
      return h(
        'div',
        { class: 'text-left  text-neutral-20 text-sm min-w-[200px]' },
        rowOriginal.role,
      )
    },
  },

  // ACTIONS
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   size: 116,
  //   cell: ({ row }) => {
  //     const rowOriginal = row.original

  //     return h(
  //       'div',
  //       { class: 'text-right flex justify-end' },
  //       h(AdministrationActionsBloc, {
  //         id: rowOriginal.id,
  //       }),
  //     )
  //   },
  // },
]
