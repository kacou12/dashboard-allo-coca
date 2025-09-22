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

export const mockOrdersResponse: {
  code: number;
  msg: string;
  data: {
    total: number;
    has_next: boolean;
    items: any[];
  };
} = {
  code: 200,
  msg: 'orders successfully retrieved',
  data: {
    total: 15,
    has_next: true,
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
      {
        id: 'ord-007',
        customer_name: 'Ahmadou',
        order_number: 100,
        contact_client: '07 00 00 00 06',
        order_date: '2025-09-10T00:00:00Z',
        commune: 'Treichville',
        status: OrderStatus.DELIVERED,
      },
      {
        id: 'ord-008',
        customer_name: 'Kone',
        order_number: 99,
        contact_client: '07 00 00 00 07',
        order_date: '2025-09-09T00:00:00Z',
        commune: 'Adjamé',
        status: OrderStatus.IN_PROGRESS,
      },
      {
        id: 'ord-009',
        customer_name: 'Diakité',
        order_number: 98,
        contact_client: '07 00 00 00 08',
        order_date: '2025-09-08T00:00:00Z',
        commune: 'Anyama',
        status: OrderStatus.AFFECTED,
      },
      {
        id: 'ord-010',
        customer_name: 'Kouassi',
        order_number: 97,
        contact_client: '07 00 00 00 09',
        order_date: '2025-09-07T00:00:00Z',
        commune: 'Abobo',
        status: OrderStatus.IN_PROGRESS,
      },
      {
        id: 'ord-011',
        customer_name: 'Lia',
        order_number: 96,
        contact_client: '07 00 00 00 10',
        order_date: '2025-09-06T00:00:00Z',
        commune: 'Marcory',
        status: OrderStatus.DELIVERED,
      },
      {
        id: 'ord-012',
        customer_name: 'Touré',
        order_number: 95,
        contact_client: '07 00 00 00 11',
        order_date: '2025-09-05T00:00:00Z',
        commune: 'Cocody',
        status: OrderStatus.CANCELED,
      },
      {
        id: 'ord-013',
        customer_name: 'Diarra',
        order_number: 94,
        contact_client: '07 00 00 00 12',
        order_date: '2025-09-04T00:00:00Z',
        commune: 'Yopougon',
        status: OrderStatus.DELIVERED,
      },
      {
        id: 'ord-014',
        customer_name: 'Fofana',
        order_number: 93,
        contact_client: '07 00 00 00 13',
        order_date: '2025-09-03T00:00:00Z',
        commune: 'Koumassi',
        status: OrderStatus.IN_PROGRESS,
      },
      {
        id: 'ord-015',
        customer_name: 'Kouadio',
        order_number: 92,
        contact_client: '07 00 00 00 14',
        order_date: '2025-09-02T00:00:00Z',
        commune: 'Abobo',
        status: OrderStatus.AFFECTED,
      }
    ],
  },
};