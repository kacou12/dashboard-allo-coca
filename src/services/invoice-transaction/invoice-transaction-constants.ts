enum InvoiceStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  PAID = "PAID",
  FAILED = "FAILED",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

enum InvoiceService {
  CIE = "CIE",
  SODECI = "SODECI",
  CANAL_PLUS = "Canal+",
}

export const InvoiceTransactionRouteApi = {
  default: "/admin/api/v1/invoice-transaction",
  getOne: (id: string) => `/admin/api/v1/invoice-transaction/${id}`,
  payInvoice: "/admin/api/v1/invoice-transaction/pay",
  getOneName: `/admin/api/v1/invoice-transaction/*`,
  updateStatus: (id: string) =>
    `/admin/api/v1/invoice-transaction/${id}/status`,
  updateStatusName: `/admin/api/v1/invoice-transaction/*/status`,
  filter: "/admin/api/v1/invoice-transaction",
  searchByNumber: "/admin/api/v1/invoice-transaction/search",
};

export const InvoiceServiceEnum = Object.freeze({
  CIE: {
    value: "CIE",
    name: "CIE (Compagnie Ivoirienne d'Électricité)",
    image_url: "src/assets/images/services/cie.png",
    color: "#FF6B35",
  },
  SODECI: {
    value: "SODECI",
    name: "SODECI (Société de Distribution d'Eau de Côte d'Ivoire)",
    image_url: "src/assets/images/services/sodeci.png",
    color: "#2E86AB",
  },
  CANAL_PLUS: {
    value: "Canal+",
    name: "Canal+ Côte d'Ivoire",
    image_url: "src/assets/images/services/canal-plus.png",
    color: "#000000",
  },
});

export { InvoiceStatus, InvoiceService };
