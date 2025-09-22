export const mockClientsResponse: {
  code: number;
  msg: string;
  data: {
    total: number;
    has_next: boolean;
    items: {
      id: string;
      customer_name: string;
      customer_id: string;
      order_count: number;
      contact_client: string;
      commune: string;
    }[];
  };
} = {
  code: 200,
  msg: 'clients successfully retrieved',
  data: {
    total: 11,
    has_next: false,
    items: [
      {
        id: 'clt-001',
        customer_name: 'Kouadio',
        customer_id: '000106',
        order_count: 4,
        contact_client: '07 00 00 00 01',
        commune: 'Cocody',
      },
      {
        id: 'clt-002',
        customer_name: 'Traoré',
        customer_id: '000105',
        order_count: 12,
        contact_client: '07 00 00 00 02',
        commune: 'Marcory',
      },
      {
        id: 'clt-003',
        customer_name: 'Diallo',
        customer_id: '000104',
        order_count: 3,
        contact_client: '07 00 00 00 03',
        commune: 'Yopougon',
      },
      {
        id: 'clt-004',
        customer_name: 'Smith',
        customer_id: '000103',
        order_count: 26,
        contact_client: '07 00 00 00 04',
        commune: 'Cocody',
      },
      {
        id: 'clt-005',
        customer_name: 'Koné',
        customer_id: '000102',
        order_count: 1,
        contact_client: '07 00 00 00 05',
        commune: 'Plateau',
      },
      {
        id: 'clt-006',
        customer_name: 'Celine',
        customer_id: '000101',
        order_count: 4,
        contact_client: '07 00 00 00 06',
        commune: 'Plateau',
      },
      {
        id: 'clt-007',
        customer_name: 'Fofana',
        customer_id: '000100',
        order_count: 1,
        contact_client: '07 00 00 00 07',
        commune: 'Koumassi',
      },
      {
        id: 'clt-008',
        customer_name: 'Yoboué',
        customer_id: '00099',
        order_count: 1,
        contact_client: '07 00 00 00 08',
        commune: 'Yopougon',
      },
      {
        id: 'clt-009',
        customer_name: 'Koffi',
        customer_id: '00098',
        order_count: 8,
        contact_client: '07 00 00 00 09',
        commune: 'Treichville',
      },
      {
        id: 'clt-010',
        customer_name: 'Ferdinand',
        customer_id: '00097',
        order_count: 44,
        contact_client: '07 00 00 00 10',
        commune: 'Port-Bouet',
      },
      {
        id: 'clt-011',
        customer_name: 'Marilma',
        customer_id: '00096',
        order_count: 1,
        contact_client: '07 00 00 00 11',
        commune: 'Plateau',
      },
    ],
  },
};