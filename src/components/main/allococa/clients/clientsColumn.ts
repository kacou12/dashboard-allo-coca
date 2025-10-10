import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import type { ClientResponse } from '@/services/allococa/clients/client-type';
import ClientActionsBloc from './clientActionsBloc.vue';
import { formatPhoneNumber, formatRelativeDate } from '@/myUtils';

// Assurez-vous que le type ClientResponse correspond au type corrigé :
// id, name, email, phone, address, is_active, role, last_login, created_at, updated_at, status

export const clientColumns: ColumnDef<ClientResponse>[] = [
  {
    // Corrigé : 'customer_name' est devenu 'name'
    accessorKey: 'name', 
    header: () => h('div', { class: 'text-left text-xs min-w-[200px]' }, 'Nom du client'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      // Corrigé : Accès à 'client.name'
      return h('div', { class: 'text-left min-w-[200px]' }, client.name); 
    },
  },
  {
    // Changement : 'customer_id' n'existe plus. On peut utiliser 'id' qui est toujours l'identifiant unique.
    accessorKey: 'email', 
    header: () => h('div', { class: 'text-left text-xs min-w-[100px]' }, 'Email'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      // Corrigé : Accès à 'client.id'
      return h('div', { class: 'text-left text-neutral-20 text-sm flex items-center min-w-[100px]' }, client.email);
    },
  },
  {
    // Corrigé : 'contact_client' est devenu 'phone'
    accessorKey: 'phone',
    header: () => h('div', { class: 'text-left text-xs' }, 'Contact client'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      // Corrigé : Accès à 'client.phone'
      return h('div', { class: 'text-left text-neutral-20 text-sm' }, formatPhoneNumber(client.phone)); 
    },
  },
  {
    // Corrigé : 'commune' est devenu 'address'. 
    // Si vous voulez n'afficher que la ville/commune, vous devrez extraire cette partie de la chaîne 'address'.
    accessorKey: 'address',
    header: () => h('div', { class: 'text-left text-xs' }, 'Adresse'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      // Corrigé : Accès à 'client.address'
      return h('div', { class: 'text-left text-sm font-medium' }, client.address); 
    },
  },
    {
    // Changement : 'order_count' n'existe plus. J'ai mis 'created_at' (Date de création du compte) pour remplacer,
    // car il est présent dans le nouveau type.
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left text-xs min-w-[150px]' }, 'Date de création'),
    cell: ({ row }) => {
      const client: ClientResponse = row.original;
      // Affichage de la date de création. Vous pouvez ajouter un formatage ici si nécessaire.
      return h('div', { class: 'text-left text-neutral-20 text-sm' }, formatRelativeDate(new Date(client.created_at)));
    },
  },
  // {
  //   id: 'actions',
  //   header: () => h('div', { class: 'text-left text-xs' }, 'Actions'),
  //   cell: ({ row }) => {
  //     const client: ClientResponse = row.original;
  //     return h(ClientActionsBloc, { client: client });
  //   },
  // },
];