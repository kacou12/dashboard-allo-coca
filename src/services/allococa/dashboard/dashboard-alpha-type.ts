import type { OrderStatusEnum } from '../orders/order-type'

export interface DashboardOrderResponse {
   id: string
  customer_name: string
  order_number: number
  contact_client: string
  order_date: string
  commune: string
  // status: OrderStatusEnum
  status: string
  created_at?: string
  updated_at?: string
}

export interface DashboardStatsResponse{
  total_sales: number;
  best_seller: {
    product_id:string
    product_name: string;
    product_image_url: string;
    orders_count: number;
  };
  weekly_orders: number;
}