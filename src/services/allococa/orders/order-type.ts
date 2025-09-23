export type OrderUpdatePayload = {
  customer_name?: string
  contact_client?: string
  commune?: string
  status?: string
  order_date?: string
}

export type OrderCreatePayload = {
  customer_name: string
  contact_client: string
  commune: string
}

export type OrderStatusUpdatePayload = {
  status?: string
}

export enum OrderStatusEnum {
  AFFECTED = 'Affecté',
  IN_PROGRESS = 'En cours',
  DELIVERED = 'Livrée',
  CANCELED = 'Annulée'
}

export const OrderStatusConfig = Object.freeze({
  AFFECTED: { value: 'Affecté', name: 'Affecté', color: '#6c757d', textColor: '#ffffff' },
  IN_PROGRESS: { value: 'En cours', name: 'En cours', color: '#ffc107', textColor: '#000000' },
  DELIVERED: { value: 'Livrée', name: 'Livrée', color: '#28a745', textColor: '#ffffff' },
  CANCELED: { value: 'Annulée', name: 'Annulée', color: '#dc3545', textColor: '#ffffff' },
})


export type OrderFiltersPayload = {
  q?: string;
  page?: number;
  limit?: number;
  dates?: [Date, Date];
  status?: string;
};

export type OrderResponse = {
  id: string
  customer_name: string
  order_number: number
  contact_client: string
  order_date: string
  commune: string
  status: OrderStatusEnum
  created_at?: string
  updated_at?: string
}