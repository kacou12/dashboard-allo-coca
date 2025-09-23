import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import type { ClientResponse } from '@/services/allococa/clients/client-type';
import ClientActionsBloc from './clientActionsBloc.vue';

export const clientColumns: ColumnDef<ClientResponse>[] = [
  {
    accessorKey: 'customer_name',
    header: () => h('div', { class: 'text-left text-xs min-w-[200px]' }, 'Nom du client'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      return h('div', { class: 'text-left min-w-[200px]' }, client.customer_name);
    },
  },
  {
    accessorKey: 'customer_id',
    header: () => h('div', { class: 'text-left text-xs min-w-[100px]' }, 'ID client'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      return h('div', { class: 'text-left text-neutral-20 text-sm flex items-center min-w-[100px]' }, client.customer_id);
    },
  },
  {
    accessorKey: 'order_count',
    header: () => h('div', { class: 'text-left text-xs min-w-[150px]' }, 'Nbr de commande'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      return h('div', { class: 'text-left text-neutral-20 text-sm' }, client.order_count);
    },
  },
  {
    accessorKey: 'contact_client',
    header: () => h('div', { class: 'text-left text-xs' }, 'Contact client'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      return h('div', { class: 'text-left text-neutral-20 text-sm' }, client.contact_client);
    },
  },
  {
    accessorKey: 'commune',
    header: () => h('div', { class: 'text-left text-xs' }, 'Commune'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      return h('div', { class: 'text-left text-sm font-medium' }, client.commune);
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-left text-xs' }, 'Actions'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      return h(ClientActionsBloc, { client: client });
    },
  },
];