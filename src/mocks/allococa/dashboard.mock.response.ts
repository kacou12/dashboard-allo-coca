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
      {
        id: 'ord-001',
        customer_name: 'Kouadio',
        order_number: 106,
        contact_client: '07 00 00 00 01',
        order_date: '2025-09-15T00:00:00Z',
        commune: 'Cocody',
        status: OrderStatus.AFFECTED,
      },
      {
        id: 'ord-002',
        customer_name: 'Traoré',
        order_number: 105,
        contact_client: '07 00 00 00 02',
        order_date: '2025-09-14T00:00:00Z',
        commune: 'Marcory',
        status: OrderStatus.IN_PROGRESS,
      },
      {
        id: 'ord-003',
        customer_name: 'Diallo',
        order_number: 104,
        contact_client: '07 00 00 00 03',
        order_date: '2025-09-14T00:00:00Z',
        commune: 'Yopougon',
        status: OrderStatus.DELIVERED,
      },
      {
        id: 'ord-004',
        customer_name: 'Smith',
        order_number: 103,
        contact_client: '07 00 00 00 04',
        order_date: '2025-09-13T00:00:00Z',
        commune: 'Cocody',
        status: OrderStatus.IN_PROGRESS,
      },
      {
        id: 'ord-005',
        customer_name: 'Koné',
        order_number: 102,
        contact_client: '07 00 00 00 05',
        order_date: '2025-09-12T00:00:00Z',
        commune: 'Plateau',
        status: OrderStatus.AFFECTED,
      },
      {
        id: 'ord-006',
        customer_name: 'Celine',
        order_number: 101,
        contact_client: '07 00 00 00 05',
        order_date: '2025-09-11T00:00:00Z',
        commune: 'Plateau',
        status: OrderStatus.CANCELED,
      },
     
    ],
  },
};