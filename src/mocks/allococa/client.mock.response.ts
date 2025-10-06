export const mockClientsResponse: {
  code: number;
  msg: string;
  data: {
    total: number;
    has_next: boolean;
    items: {
      id: string;
      name: string; // Correspond à 'customer_name'
      email: string; // Manquant dans les données originales
      phone: string; // Correspond à 'contact_client'
      address: string; // Correspond à 'commune' + détail fictif
      is_active: boolean; // Manquant, valeur par défaut
      role: string; // Manquant, valeur par défaut
      last_login: string; // Manquant, valeur fictive
      created_at: string; // Manquant, valeur fictive
      updated_at: string; // Manquant, valeur fictive
      status: boolean; // Correspond à 'is_active' (ou l'inverse)
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
        name: 'Kouadio', // Mappé depuis 'customer_name'
        email: 'kouadio@example.com', // Ajouté
        phone: '07 00 00 00 01', // Mappé depuis 'contact_client'
        address: 'Cocody, Rue des Jardins', // Mappé depuis 'commune' + détail
        is_active: true, // Ajouté
        role: 'customer', // Ajouté
        last_login: '2025-10-01T14:30:00Z', // Ajouté
        created_at: '2024-05-15T09:00:00Z', // Ajouté
        updated_at: '2025-10-01T14:30:00Z', // Ajouté
        status: true, // Ajouté (équivalent à 'is_active')
        // Suppression de 'customer_id' et 'order_count'
      },
      {
        id: 'clt-002',
        name: 'Traoré',
        email: 'traore@example.com',
        phone: '07 00 00 00 02',
        address: 'Marcory, Boulevard VGE',
        is_active: true,
        role: 'customer',
        last_login: '2025-09-28T10:15:00Z',
        created_at: '2024-06-20T11:00:00Z',
        updated_at: '2025-09-28T10:15:00Z',
        status: true,
      },
      {
        id: 'clt-003',
        name: 'Diallo',
        email: 'diallo@example.com',
        phone: '07 00 00 00 03',
        address: 'Yopougon, Quartier Millionnaire',
        is_active: true,
        role: 'customer',
        last_login: '2025-10-02T16:45:00Z',
        created_at: '2024-07-01T13:00:00Z',
        updated_at: '2025-10-02T16:45:00Z',
        status: true,
      },
      {
        id: 'clt-004',
        name: 'Smith',
        email: 'smith@example.com',
        phone: '07 00 00 00 04',
        address: 'Cocody, Riviera 3',
        is_active: true,
        role: 'customer',
        last_login: '2025-10-04T08:00:00Z',
        created_at: '2023-11-10T15:00:00Z',
        updated_at: '2025-10-04T08:00:00Z',
        status: true,
      },
      {
        id: 'clt-005',
        name: 'Koné',
        email: 'kone@example.com',
        phone: '07 00 00 00 05',
        address: 'Plateau, Avenue Terrasson de Fougères',
        is_active: false,
        role: 'customer',
        last_login: '2025-08-01T09:00:00Z',
        created_at: '2025-01-20T10:00:00Z',
        updated_at: '2025-08-01T09:00:00Z',
        status: false,
      },
      {
        id: 'clt-006',
        name: 'Celine',
        email: 'celine@example.com',
        phone: '07 00 00 00 06',
        address: 'Plateau, Tour C',
        is_active: true,
        role: 'customer',
        last_login: '2025-10-05T11:30:00Z',
        created_at: '2024-03-05T12:00:00Z',
        updated_at: '2025-10-05T11:30:00Z',
        status: true,
      },
      {
        id: 'clt-007',
        name: 'Fofana',
        email: 'fofana@example.com',
        phone: '07 00 00 00 07',
        address: 'Koumassi, Quartier 03',
        is_active: true,
        role: 'customer',
        last_login: '2025-10-03T15:00:00Z',
        created_at: '2025-08-15T08:00:00Z',
        updated_at: '2025-10-03T15:00:00Z',
        status: true,
      },
      {
        id: 'clt-008',
        name: 'Yoboué',
        email: 'yoboue@example.com',
        phone: '07 00 00 00 08',
        address: 'Yopougon, Sicogi',
        is_active: false,
        role: 'customer',
        last_login: '2025-09-01T10:00:00Z',
        created_at: '2025-02-10T11:00:00Z',
        updated_at: '2025-09-01T10:00:00Z',
        status: false,
      },
      {
        id: 'clt-009',
        name: 'Koffi',
        email: 'koffi@example.com',
        phone: '07 00 00 00 09',
        address: 'Treichville, Arras',
        is_active: true,
        role: 'customer',
        last_login: '2025-10-05T09:00:00Z',
        created_at: '2024-04-25T14:00:00Z',
        updated_at: '2025-10-05T09:00:00Z',
        status: true,
      },
      {
        id: 'clt-010',
        name: 'Ferdinand',
        email: 'ferdinand@example.com',
        phone: '07 00 00 00 10',
        address: 'Port-Bouet, Vridi',
        is_active: true,
        role: 'customer',
        last_login: '2025-10-01T17:00:00Z',
        created_at: '2023-09-01T08:00:00Z',
        updated_at: '2025-10-01T17:00:00Z',
        status: true,
      },
      {
        id: 'clt-011',
        name: 'Marilma',
        email: 'marilma@example.com',
        phone: '07 00 00 00 11',
        address: 'Plateau, Bâtiment F',
        is_active: true,
        role: 'customer',
        last_login: '2025-10-04T12:00:00Z',
        created_at: '2025-06-01T10:00:00Z',
        updated_at: '2025-10-04T12:00:00Z',
        status: true,
      },
    ],
  },
};