import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { formatRelativeDate } from '@/lib/utils'

import AdminAlertActionDropdownBloc from './adminAlertActionDropdownBloc.vue'
import type { AdminAlertResponse } from '@/services/admin-alerts/admin-alerts-type'

export const adminAlertsColumns: ColumnDef<AdminAlertResponse>[] = [
  // {
  //   accessorKey: 'id',
  //   size: 100,
  //   header: () => h('div', { class: 'text-left text-xs' }, 'ID'),
  //   cell: ({ row }) => {
  //     const rowOriginal: AdminAlertResponse = row.original
  //     return h('div', { class: 'text-left' }, rowOriginal.id)
  //   },
  // },
  {
    accessorKey: 'title',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Titre'),
    cell: ({ row }) => {
      const rowOriginal: AdminAlertResponse = row.original
      return h('div', { class: 'text-left min-w-[250px]' }, rowOriginal.title)
    },
  },
  {
    accessorKey: 'description',
    size: 300,
    header: () => h('div', { class: 'text-left text-xs' }, 'Description'),
    cell: ({ row }) => {
      const rowOriginal: AdminAlertResponse = row.original
      return h('div', { class: 'text-left' }, rowOriginal.description)
    },
  },
  {
    accessorKey: 'type',
    size: 150,
    header: () => h('div', { class: 'text-left text-xs' }, 'Type'),
    cell: ({ row }) => {
      const rowOriginal: AdminAlertResponse = row.original
      return h('div', { class: 'text-left' }, rowOriginal.type)
    },
  },
  {
    accessorKey: 'severity',
    size: 150,
    header: () => h('div', { class: 'text-left text-xs' }, 'Sévérité'),
    cell: ({ row }) => {
      const rowOriginal: AdminAlertResponse = row.original
      return h('div', { class: 'text-left' }, rowOriginal.severity)
    },
  },

  {
    accessorKey: 'created_at',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Date de création'),
    cell: ({ row }) => {
      const rowOriginal: AdminAlertResponse = row.original
      return h(
        'div',
        { class: 'text-left text-neutral-20 text-sm min-w-[150px]' },
        formatRelativeDate(new Date(rowOriginal.created_at)),
      )
    },
  },
  {
    accessorKey: 'resolved_at',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Date de résolution'),
    cell: ({ row }) => {
      const rowOriginal: AdminAlertResponse = row.original
      return h(
        'div',
        { class: 'text-left text-neutral-20 text-sm' },
        rowOriginal.resolved_at ? formatRelativeDate(new Date(rowOriginal.resolved_at)) : '-',
      )
    },
  },
  // {
  //   accessorKey: 'metadata',
  //   size: 200,
  //   header: () => h('div', { class: 'text-left text-xs' }, 'Métadonnées'),
  //   cell: ({ row }) => {
  //     const rowOriginal: AdminAlertResponse = row.original
  //     // Affichage simplifié des métadonnées, à adapter selon vos besoins
  //     const metadataText = rowOriginal.metadata
  //       ? JSON.stringify(rowOriginal.metadata).substring(0, 50) + '...'
  //       : '-'
  //     return h('div', { class: 'text-left' }, metadataText)
  //   },
  // },

  {
    accessorKey: 'is_resolved',
    size: 100,
    header: () => h('div', { class: 'text-left text-xs' }, 'Statut de Résolution'),
    cell: ({ row }) => {
      const rowOriginal: AdminAlertResponse = row.original
      return h('div', { class: 'text-left' }, rowOriginal.is_resolved ? 'Oui' : 'Non')
    },
  },
  // ACTIONS
  {
    id: 'actions',
    enableHiding: false,
    size: 116,
    cell: ({ row }) => {
      const rowOriginal: AdminAlertResponse = row.original
      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(AdminAlertActionDropdownBloc, {
          AdminAlert: rowOriginal,
        }),
      )
    },
  },
]
