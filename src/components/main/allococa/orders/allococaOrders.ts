import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table'
import { formatPhoneNumber, formatRelativeDate } from '@/myUtils';
import type { OrderResponse } from '@/services/allococa/orders/order-type';
import OrderStatusBloc from './orderStatusBloc.vue';
import OrderActionsBloc from './orderActionsBloc.vue';

export const allococaOrdersColumns: ColumnDef<OrderResponse>[] = [
  {
    accessorKey: 'customer_name',
    header: () => h('div', { class: 'text-left text-xs truncate  min-w-[200px]' }, 'Nom du client'),
    cell: ({ row }) => {
      const order = row.original;
      return h('div', { class: 'text-left min-w-[200px]' }, order.delivery.full_name);
    },
  },
  {
    accessorKey: 'order_number',
    header: () => h('div', { class: 'text-left text-xs min-w-[100px]' }, 'référence'),
    cell: ({ row }) => {
      const order = row.original;
      return h('div', { class: 'text-left text-neutral-20 text-sm flex items-center min-w-[100px]' }, order.reference ?? "#000000");
    },
  },
  {
    accessorKey: 'contact_client',
    header: () => h('div', { class: 'text-left text-xs min-w-[150px]' }, 'Contact client'),
    cell: ({ row }) => {
      const order = row.original;
      return h('div', { class: 'text-left text-neutral-20 text-sm' }, formatPhoneNumber(order.delivery.phone_number));
    },
  },
  {
    accessorKey: 'order_date',
    header: () => h('div', { class: 'text-left text-xs min-w-[150px]' }, 'Date de commande'),
    cell: ({ row }) => {
      const order = row.original;
      return h('div', { class: 'text-left text-neutral-20 text-sm' }, formatRelativeDate(new Date(order.order_date)));
    },
  },
  {
    accessorKey: 'commune',
    header: () => h('div', { class: 'text-left text-xs min-w-[100px]' }, 'Commune'),
    cell: ({ row }) => {
      const order = row.original;
      return h('div', { class: 'text-left text-sm font-medium' }, order.delivery.municipality);
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left text-xs min-w-[100px]' }, 'Statut'),
    cell: ({ row }) => {
      const order = row.original;
      // Remplacez `ClientStatusBloc` par votre composant Vue pour afficher le statut
      return h(OrderStatusBloc, { order: order });
    },
  },
  // ACTIONS
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original;
      // Remplacez `ClientDetailModal` par votre composant Vue pour le modal de détails
      return h(OrderActionsBloc, { order: order });
    },
  },
];