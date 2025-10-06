export enum ProductStatus {
  DISPONIBLE = 'Disponible',
  INDISPONIBLE = 'Indisponible',
}

export const mockProductsResponse: {
  code: number;
  msg: string;
  data: {
    total: number;
    has_next: boolean;
    items: {
      id: string;
      name: string;
      description: string;
      image_url: string;
      category_id: string;
      created_at: string;
      status: boolean;
    }[];
  };
} = {
  code: 200,
  msg: 'products successfully retrieved',
  data: {
    total: 10,
    has_next: false,
    items: [
      {
        id: 'prod-001',
        name: 'Coca-Cola Classique',
        description: 'Boisson gazeuse classique au goût unique',
        image_url: '/assets/images/coca-cola-classique.png',
        category_id: 'beverages',
        created_at: '2023-10-27T10:00:00Z',
        status: true,
      },
      {
        id: 'prod-002',
        name: 'Coca-Cola Zéro',
        description: 'Boisson gazeuse sans sucre avec goût coca-cola',
        image_url: '/assets/images/coca-cola-zero.png',
        category_id: 'beverages',
        created_at: '2023-10-27T10:05:00Z',
        status: true,
      },
      {
        id: 'prod-003',
        name: 'Fanta Orange',
        description: "Boisson gazeuse parfum orange, rafraîchissante",
        image_url: '/assets/images/fanta-orange.png',
        category_id: 'beverages',
        created_at: '2023-10-27T10:10:00Z',
        status: true,
      },
      {
        id: 'prod-004',
        name: 'Fanta Cocktail',
        description: 'Mélange de fruits pour une saveur unique',
        image_url: '/assets/images/fanta-cocktail.png',
        category_id: 'beverages',
        created_at: '2023-10-27T10:15:00Z',
        status: true,
      },
      {
        id: 'prod-005',
        name: 'Fanta Fruits rouge',
        description: 'Saveur fruits rouges, boisson fruitée',
        image_url: '/assets/images/fanta-fruits-rouge.png',
        category_id: 'beverages',
        created_at: '2023-10-27T10:20:00Z',
        status: false,
      },
      {
        id: 'prod-006',
        name: 'Fanta Pommes',
        description: 'Boisson goût pomme fruitée',
        image_url: '/assets/images/fanta-pommes.png',
        category_id: 'beverages',
        created_at: '2023-10-27T10:25:00Z',
        status: true,
      },
      {
        id: 'prod-007',
        name: 'Sprite',
        description: "Boisson gazeuse citron-lime, rafraîchissante",
        image_url: '/assets/images/sprite.png',
        category_id: 'beverages',
        created_at: '2023-10-27T10:30:00Z',
        status: true,
      },
      {
        id: 'prod-008',
        name: 'Schweppes Tonic',
        description: 'Boisson tonic amère et rafraîchissante',
        image_url: '/assets/images/schweppes-tonic.png',
        category_id: 'beverages',
        created_at: '2023-10-27T10:35:00Z',
        status: true,
      },
      {
        id: 'prod-009',
        name: 'Fanta Cocktail',
        description: 'Une autre variante de cocktail fruité',
        image_url: '/assets/images/fanta-cocktail-2.png',
        category_id: 'beverages',
        created_at: '2023-10-27T10:40:00Z',
        status: true,
      },
      {
        id: 'prod-010',
        name: 'Céleste Naturelle 1.5L',
        description: 'Pack de 6 eaux minérales naturelles',
        image_url: '/assets/images/celeste-naturelle.png',
        category_id: 'water',
        created_at: '2023-10-27T10:45:00Z',
        status: true,
      },
    ],
  },
};
