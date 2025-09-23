import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table'
import type { DashboardOrderResponse } from '@/services/allococa/dashboard/dashboard-alpha-type';
import { formatRelativeDate } from '@/myUtils';
import OrderStatusBloc from './orderStatusBloc.vue';


export const allococadashboardOrdersColumns: ColumnDef<DashboardOrderResponse>[] = [
  {
    accessorKey: 'customer_name',
    header: () => h('div', { class: 'text-left text-xs min-w-[200px]' }, 'Nom du client'),
    cell: ({ row }) => {
      const client = row.original;
      return h('div', { class: 'text-left min-w-[200px]' }, client.customer_name);
    },
  },
  {
    accessorKey: 'order_number',
    header: () => h('div', { class: 'text-left text-xs min-w-[100px]' }, 'Numéro de commande'),
    cell: ({ row }) => {
      const client = row.original;
      return h('div', { class: 'text-left text-neutral-20 text-sm flex items-center min-w-[100px]' }, client.order_number);
    },
  },
  {
    accessorKey: 'contact_client',
    header: () => h('div', { class: 'text-left text-xs min-w-[150px]' }, 'Contact client'),
    cell: ({ row }) => {
      const client = row.original;
      return h('div', { class: 'text-left text-neutral-20 text-sm' }, client.contact_client);
    },
  },
  {
    accessorKey: 'order_date',
    header: () => h('div', { class: 'text-left text-xs' }, 'Date de commande'),
    cell: ({ row }) => {
      const client = row.original;
      return h('div', { class: 'text-left text-neutral-20 text-sm' }, formatRelativeDate(new Date(client.order_date)));
    },
  },
  {
    accessorKey: 'commune',
    header: () => h('div', { class: 'text-left text-xs' }, 'Commune'),
    cell: ({ row }) => {
      const client = row.original;
      return h('div', { class: 'text-left text-sm font-medium' }, client.commune);
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left text-xs min-w-[80px]' }, 'Statut'),
    cell: ({ row }) => {
      const order = row.original;
      // Remplacez `ClientStatusBloc` par votre composant Vue pour afficher le statut
      return h(OrderStatusBloc, { orderTransaction: order });
    },
  },
  // ACTIONS
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const client = row.original;
  //     // Remplacez `ClientDetailModal` par votre composant Vue pour le modal de détails
  //     return h('div', { class: 'text-left' }, h('div', { class: 'cursor-pointer' }, 'Détails'));
  //   },
  // },
];