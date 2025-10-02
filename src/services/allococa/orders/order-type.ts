import type { StatusConfigEnum } from "@/services/global.type"

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


// export const OrderStatusConfigEnum ={
//   name:"PENDING", 
//   data: { value: 'pending', name: 'En attente', color: '#6c757d', textColor: '#ffffff' },
//   PROCESSING: { value: 'processing', name: 'En traitement', color: '#ffc107', textColor: '#000000' },
//   PAID: { value: 'paid', name: 'Payée', color: '#28a745', textColor: '#ffffff' },
//   CANCELLED: { value: 'cancelled', name: 'Annulée', color: '#dc3545', textColor: '#ffffff' },
// };

export type OrderFiltersPayload = {
  q?: string;
  page?: number;
  limit?: number;
  dates?: [Date, Date];
  status?: string;
};

export const orderStatusConfigEnumData: StatusConfigEnum[] =[
  { value: 'pending', name: 'En attente', color: '#6c757d', textColor: '#ffffff' },
  { value: 'processing', name: 'En traitement', color: '#ffc107', textColor: '#000000' },
  { value: 'paid', name: 'Payée', color: '#28a745', textColor: '#ffffff' },
  { value: 'canceled', name: 'Annulée', color: '#dc3545', textColor: '#ffffff' },
];


export type OrderResponse = {
  id: string
  delivery: Delivery
  reference?: string
  status: string
  total_amount: number
  items: OrderLine[]
  user_id: string
  user: User
  order_date: string
}

type Delivery ={
  id: string
  full_name: string
  phone_number: string
  municipality: string
  address: string
  notes: string
  created_at: string
  updated_at: string
}

type OrderLine = {
  id: string
  type: string
  variant: Variant
  quantity: number
  unit_price: number
  line_total: number
}

type Variant = {
  id: string
  name: string
  product: Product
}

 type Product = {
  id: string
  name: string
}



 type User = {
  name: string
  email: string
  phone: string
  address: string
  role: string
  id: string
  created_at: string
  updated_at: string
  last_login: string
  created_by: string
  updated_by: string
}
