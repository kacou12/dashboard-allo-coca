import type { ColumnDef } from "@tanstack/vue-table";

import { h } from "vue";

import { formatRelativeDate } from "@/lib/utils";

import type { SupplyTransactionResponse } from "@/services/supply-transactions/supply-transaction-type";
import bankDetailModal from "./bankDetailModal.vue";
import BankStatusBloc from "./bankStatusBloc.vue";
import BankUserBloc from "./bankUserBloc.vue";
import BankNumberBloc from "./bankNumberBloc.vue";
import SupplyTransactionDetailsModal from "./SupplyTransactionDetailsModal.vue";

export const suppliesColumns: ColumnDef<SupplyTransactionResponse>[] = [
  {
    accessorKey: "user",
    // enableResizing: false,
    header: () => h("div", { class: "text-left text-xs" }, "Emetteur"),
    cell: ({ row }) => {
      // const user: UserTransactionType = row.getValue('user')

      const supplyTransaction: SupplyTransactionResponse = row.original;
      // transaction.user

      return h(
        "div",
        { class: "text-left min-w-[190px]" },
        h(BankUserBloc, {
          supplyTransaction: supplyTransaction,
        }),
      );
    },
  },
  {
    accessorKey: "beneficiary",
    // enableResizing: false,
    header: () => h("div", { class: "text-left text-xs" }, "Bénéficiaire"),
    cell: ({ row }) => {
      // const debitNumber = row.getValue('debitNumber') as string
      const supplyTransaction: SupplyTransactionResponse = row.original;

      return h(
        "div",
        { class: "text-left  text-neutral-20 text-sm  flex items-center " },
        h(BankNumberBloc, {
          supplyTransaction: supplyTransaction,
        }),
      );
    },
  },

  {
    accessorKey: "date",
    // enableResizing: false,
    header: () => h("div", { class: "text-left text-xs" }, "Date et heure"),
    cell: ({ row }) => {
      const date = row.getValue("date") as string;

      const transaction: SupplyTransactionResponse = row.original;

      return h(
        "div",
        { class: "text-left  text-neutral-20 text-sm min-w-[150px]" },
        formatRelativeDate(new Date(transaction.created_at)),
      );
    },
  },
  {
    accessorKey: "amount",
    // enableResizing: false,
    header: () => h("div", { class: "text-left  text-xs" }, "Montant"),
    cell: ({ row }) => {
      // const amount = Number.parseFloat(row.getValue('amount'))

      const supplyTransaction: SupplyTransactionResponse = row.original;
      const formatted = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
      }).format(supplyTransaction.amount);

      return h(
        "div",
        { class: "text-left  text-neutral-20 text-sm" },
        formatted,
      );
    },
  },

  {
    accessorKey: "transactionStatus",
    // enableResizing: false,

    header: () => h("div", { class: "text-left text-xs " }, "Statut"),
    cell: ({ row }) => {
      const transactionStatus = row.getValue("transactionStatus");
      const supplyTransaction: SupplyTransactionResponse = row.original;

      return h(
        "div",
        {
          class: " text-neutral-20 text-xs  min-w-[80px]",
        },
        h(BankStatusBloc, {
          supplyTransaction: supplyTransaction,
        }),
      );
    },
  },
  // ACTIONS
  {
    id: "actions",
    // enableHiding: false,

    cell: ({ row }) => {
      const supplyTransaction: SupplyTransactionResponse = row.original;

      return h(
        "div",
        { class: "text-left" },
        h(
          // RecentTransactionActionDropdown, {
          SupplyTransactionDetailsModal,
          {
            supplyTransaction: supplyTransaction,
          },
        ),
      );
    },
  },
];
