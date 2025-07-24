import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { formatRelativeDate } from '@/lib/utils'
import type { OperationLogResponse } from '@/services/operation-logs/operation-log-type'
import OperationLogActionDropdownBloc from './operationLogActionDropdownBloc.vue'
import OperationLogStatusBloc from '../operationLogStatusBloc.vue'

export const operationLogsColumn: ColumnDef<OperationLogResponse>[] = [
  {
    accessorKey: 'id',
    size: 100,
    header: () => h('div', { class: 'text-left text-xs' }, 'ID'),
    cell: ({ row }) => {
      const rowOriginal: OperationLogResponse = row.original
      return h('div', { class: 'text-left truncate max-w-[100px]' }, rowOriginal.id)
    },
  },
  {
    accessorKey: 'title',
    size: 150,
    header: () => h('div', { class: 'text-left text-xs' }, 'Titre'),
    cell: ({ row }) => {
      const rowOriginal: OperationLogResponse = row.original
      return h('div', { class: 'text-left' }, rowOriginal.title)
    },
  },
  {
    accessorKey: 'created_time',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Date'),
    cell: ({ row }) => {
      const rowOriginal: OperationLogResponse = row.original
      return h(
        'div',
        { class: 'text-left text-neutral-20 text-sm' },
        formatRelativeDate(new Date(rowOriginal.created_time)),
      )
    },
  },
  {
    accessorKey: 'method',
    size: 100,
    header: () => h('div', { class: 'text-left text-xs' }, 'Méthode'),
    cell: ({ row }) => {
      const rowOriginal: OperationLogResponse = row.original
      let methodColor = 'text-gray-500'

      switch (rowOriginal.method) {
        case 'GET':
          methodColor = 'text-blue-500'
          break
        case 'POST':
          methodColor = 'text-green-500'
          break
        case 'PUT':
          methodColor = 'text-yellow-500'
          break
        case 'DELETE':
          methodColor = 'text-red-500'
          break
        case 'PATCH':
          methodColor = 'text-purple-500'
          break
      }

      return h('div', { class: `text-left font-medium ${methodColor}` }, rowOriginal.method)
    },
  },
  {
    accessorKey: 'path',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Chemin'),
    cell: ({ row }) => {
      const rowOriginal: OperationLogResponse = row.original
      return h('div', { class: 'text-left truncate max-w-[200px]' }, rowOriginal.path)
    },
  },

  {
    accessorKey: 'cost_time',
    size: 120,
    header: () => h('div', { class: 'text-left text-xs' }, 'Temps (ms)'),
    cell: ({ row }) => {
      const rowOriginal: OperationLogResponse = row.original
      let timeColor = 'text-green-500'

      if (rowOriginal.cost_time > 1000) {
        timeColor = 'text-red-500'
      } else if (rowOriginal.cost_time > 500) {
        timeColor = 'text-yellow-500'
      }

      return h('div', { class: `text-left ${timeColor}` }, rowOriginal.cost_time)
    },
  },
  {
    accessorKey: 'user_email',
    size: 200,
    header: () => h('div', { class: 'text-left text-xs' }, 'Email utilisateur'),
    cell: ({ row }) => {
      const rowOriginal: OperationLogResponse = row.original
      return h('div', { class: 'text-left truncate max-w-[200px]' }, rowOriginal.user_email || '-')
    },
  },

  {
    accessorKey: 'status',
    size: 100,
    header: () => h('div', { class: 'text-left text-xs' }, 'Statut'),
    cell: ({ row }) => {
      const rowOriginal: OperationLogResponse = row.original
      let statusColor = 'text-gray-500'

      if (rowOriginal.status >= 200 && rowOriginal.status < 300) {
        statusColor = 'text-green-500'
      } else if (rowOriginal.status >= 400 && rowOriginal.status < 500) {
        statusColor = 'text-yellow-500'
      } else if (rowOriginal.status >= 500) {
        statusColor = 'text-red-500'
      }

      return h(
        'div',
        { class: `text-left ${statusColor}` },
        h(OperationLogStatusBloc, { operationLog: rowOriginal }),
      )
    },
  },
  // ACTIONS
  {
    id: 'actions',
    enableHiding: false,
    size: 116,
    cell: ({ row }) => {
      const rowOriginal: OperationLogResponse = row.original
      return h(
        'div',
        { class: 'text-right flex justify-end' },
        h(OperationLogActionDropdownBloc, {
          operationLog: rowOriginal,
        }),
      )
    },
  },
]
