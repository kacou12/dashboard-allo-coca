// Define the specific network types
export type BeneficiaryNetwork = 'Orange' | 'Moov' | 'MTN' | 'Wave';

export type BeneficiaryResponse = {
  id: string; // Unique identifier for the beneficiary
  first_name: string;
  last_name: string;
  network: BeneficiaryNetwork; // Now uses the defined union type
  phone: string;
  description?: string;
  created_at: string;
};

export const mockBeneficiariesResponse: {
  
  code: number;
  msg: string;
  data: {
    total: number
    has_next: boolean
    items: BeneficiaryResponse[];
  };
} = {
  code: 200,
  msg: 'beneficiaries successfully retrieved',
  data: {
    total: 4,
    items: [
      {
        id: 'ben-001',
        first_name: 'Adama',
        last_name: 'Diallo',
        network: 'Moov', // Using one of the allowed network values
        phone: '+2250701020304',
        description: 'Frequent recipient for family transfers',
        created_at: '2023-01-15T10:00:00Z',
      },
      {
        id: 'ben-002',
        first_name: 'Philippe',
        last_name: 'Jeans',
        network: 'Orange', // Using one of the allowed network values
        phone: '+2260787986058',
        description: 'Colleague for project payments',
        created_at: '2023-08-07T00:00:00Z',
      },
      {
        id: 'ben-003',
        first_name: 'Philippe',
        last_name: 'Jeans',
        network: 'MTN', // Using one of the allowed network values
        phone: '+2260787986058',
        description: 'Another Philippe Jeans, for different payments',
        created_at: '2023-08-07T00:00:00Z',
      },
      {
        id: 'ben-004',
        first_name: 'Marie',
        last_name: 'Traore',
        network: 'Wave', // Using one of the allowed network values
        phone: '+2250599887766',
        description: 'Family member in Abidjan',
        created_at: '2024-03-20T11:00:00Z',
      },
    ],
    has_next: false,
  },
};