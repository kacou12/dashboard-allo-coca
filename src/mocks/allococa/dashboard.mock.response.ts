import type { DashboardOrderResponse } from "@/services/allococa/dashboard/dashboard-alpha-type";

export enum OrderStatus {
  AFFECTED = 'Affecté',
  IN_PROGRESS = 'En cours',
  DELIVERED = 'Livrée',
  CANCELED = 'Annulée'
}

export const orderStatusColors: { [key in OrderStatus]: string } = {
  [OrderStatus.AFFECTED]: '#6c757d', // Grey
  [OrderStatus.IN_PROGRESS]: '#ffc107', // Orange
  [OrderStatus.DELIVERED]: '#28a745', // Green
  [OrderStatus.CANCELED]: '#dc3545' // Red
};

export const mockDashboardResponse: {
  code: number;
  msg: string;
  data: {
    total: number;
    has_next: boolean;
    items: DashboardOrderResponse[];
  };
} = {
  code: 200,
  msg: 'orders successfully retrieved',
  data: {
    total: 6,
    has_next: false,
    items: [
     
    ],
  },
};