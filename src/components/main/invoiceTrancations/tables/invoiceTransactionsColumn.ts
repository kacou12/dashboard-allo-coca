import type { ColumnDef } from "@tanstack/vue-table";

import { h } from "vue";

import { formatRelativeDate } from "@/lib/utils";

import type { InvoiceTransactionResponse } from "@/services/invoice-transaction/invoice-transaction-type";
import InvoiceServiceBloc from "./InvoiceServiceBloc.vue";
import InvoiceStatusBloc from "./InvoiceStatusBloc.vue";
import InvoiceNumberBloc from "./InvoiceNumberBloc.vue";
import InvoiceDueDateBloc from "./InvoiceDueDateBloc.vue";
import InvoiceTransactionDetailsModal from "./InvoiceTransactionDetailsModal.vue";

export const invoiceTransactionColumns: ColumnDef<InvoiceTransactionResponse>[] =
  [
    {
      accessorKey: "service",
      header: () => h("div", { class: "text-left text-xs" }, "Service"),
      cell: ({ row }) => {
        const invoiceTransaction: InvoiceTransactionResponse = row.original;

        return h(
          "div",
          { class: "text-left min-w-[140px]" },
          h(InvoiceServiceBloc, {
            invoiceTransaction: invoiceTransaction,
          }),
        );
      },
    },
    {
      accessorKey: "invoiceNumber",
      header: () => h("div", { class: "text-left text-xs" }, "N° Facture"),
      cell: ({ row }) => {
        const invoiceTransaction: InvoiceTransactionResponse = row.original;

        return h(
          "div",
          {
            class:
              "text-left text-neutral-20 text-sm flex items-center min-w-[160px]",
          },
          h(InvoiceNumberBloc, {
            invoiceTransaction: invoiceTransaction,
          }),
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => h("div", { class: "text-left text-xs" }, "Montant"),
      cell: ({ row }) => {
        const invoiceTransaction: InvoiceTransactionResponse = row.original;
        const formatted = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "XOF",
        }).format(invoiceTransaction.amount);

        return h(
          "div",
          { class: "text-left text-neutral-20 text-sm font-medium" },
          formatted,
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: () => h("div", { class: "text-left text-xs" }, "Date d'échéance"),
      cell: ({ row }) => {
        const invoiceTransaction: InvoiceTransactionResponse = row.original;

        return h(
          "div",
          { class: "text-left text-neutral-20 text-sm min-w-[120px]" },
          h(InvoiceDueDateBloc, {
            invoiceTransaction: invoiceTransaction,
          }),
        );
      },
    },
    {
      accessorKey: "paymentDate",
      header: () =>
        h("div", { class: "text-left text-xs" }, "Date de paiement"),
      cell: ({ row }) => {
        const invoiceTransaction: InvoiceTransactionResponse = row.original;

        return h(
          "div",
          { class: "text-left text-neutral-20 text-sm min-w-[150px]" },
          invoiceTransaction.paymentDate
            ? formatRelativeDate(new Date(invoiceTransaction.paymentDate))
            : h("span", { class: "text-gray-400 italic" }, "Non payée"),
        );
      },
    },
    {
      accessorKey: "status",
      header: () => h("div", { class: "text-left text-xs" }, "Statut"),
      cell: ({ row }) => {
        const invoiceTransaction: InvoiceTransactionResponse = row.original;

        return h(
          "div",
          {
            class: "text-neutral-20 text-xs min-w-[100px]",
          },
          h(InvoiceStatusBloc, {
            invoiceTransaction: invoiceTransaction,
          }),
        );
      },
    },
    // ACTIONS
    {
      id: "actions",
      cell: ({ row }) => {
        const invoiceTransaction: InvoiceTransactionResponse = row.original;

        return h(
          "div",
          { class: "text-left" },
          h(InvoiceTransactionDetailsModal, {
            invoiceTransaction: invoiceTransaction,
          }),
        );
      },
    },
  ];
