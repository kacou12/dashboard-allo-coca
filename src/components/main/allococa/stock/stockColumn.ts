import { h } from 'vue';

import type { ColumnDef } from '@tanstack/vue-table';

import type { StockResponse } from '@/services/allococa/stocks/stock-type';

import { formatRelativeDate } from '@/myUtils'; // Assurez-vous que cette fonction existe

import StockActionBloc from './stockActionBloc.vue';

export const stockColumns: ColumnDef<StockResponse>[] = [
  // {
  //   accessorKey: 'id',
  //   header: () => h('div', { class: 'text-left text-xs min-w-100px' }, 'ID produit'),
  //   cell: ({ row }) => {
  //     const stock: StockResponse = row.original;
  //     return h('div', { class: 'text-left text-neutral-700 text-sm' }, stock.id);
  //   },
  // },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left text-xs min-w-200px' }, 'Nom du produit'),
    cell: ({ row }) => {
      const stock: StockResponse = row.original;
      return h('div', { class: 'text-left min-w-200px' }, stock.name);
    },
  },
  {
    accessorKey: 'description',
    header: () => h('div', { class: 'text-left text-xs min-w-300px' }, 'Description'),
    cell: ({ row }) => {
      const stock: StockResponse = row.original;
      return h('div', { class: 'text-left text-neutral-700 text-sm' }, stock.description);
    },
  },
  {
    accessorKey: 'image_url',
    header: () => h('div', { class: 'text-left text-xs' }, 'Image'),
    cell: ({ row }) => {
      const stock: StockResponse = row.original;
      return h('img', {
        src: stock.image_url,
        alt: stock.name,
        class: 'w-10 h-10 object-cover rounded',
      });
    },
  },
  // {
  //   accessorKey: 'category_id',
  //   header: () => h('div', { class: 'text-left text-xs min-w-150px' }, 'Catégorie'),
  //   cell: ({ row }) => {
  //     const stock: StockResponse = row.original;
  //     return h('div', { class: 'text-left text-neutral-700 text-sm' }, stock.category_id);
  //   },
  // },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left text-xs min-w-100px' }, 'Statut'),
    cell: ({ row }) => {
      const stock: StockResponse = row.original;
      return h(
        'div',
        {
          class: {
            'text-green-600': stock.status,
            'text-red-600': !stock.status,
            'text-sm font-medium': true,
          },
        },
        stock.status ? 'Disponible' : 'Indisponible'
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left text-xs min-w-150px' }, 'Date de création'),
    cell: ({ row }) => {
      const stock: StockResponse = row.original;
      if (!stock.created_at) return h('div', '-');
      return h('div', { class: 'text-left text-neutral-700 text-sm' }, formatRelativeDate(new Date(stock.created_at)));
    },
  },
  {
    accessorKey: 'updated_at',
    header: () => h('div', { class: 'text-left text-xs min-w-150px' }, 'Dernière mise à jour'),
    cell: ({ row }) => {
      const stock: StockResponse = row.original;
      if (!stock.updated_at) return h('div', '-');
      return h('div', { class: 'text-left text-neutral-700 text-sm' }, formatRelativeDate(new Date(stock.updated_at)));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const stock: StockResponse = row.original;
      return h(StockActionBloc, { stock: stock });
    },
  },
];
