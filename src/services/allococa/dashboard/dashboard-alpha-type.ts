import type { OrderStatusEnum } from '../orders/order-type'

export interface DashboardOrderResponse {
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


export interface DashboardStatsResponse{
  total_sales: number;
  best_seller: {
    product_id:string
    product_name: string;
    product_image_url: string;
    orders_count: number;
  };
  weekly_orders: {
    pending: number;
    cancelled: number;
    delivered: number;
  };
}