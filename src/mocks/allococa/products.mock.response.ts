export enum ProductStatus {
  DISPONIBLE = 'Disponible',
  INDISPONIBLE = 'Indisponible'
}

export const mockProductsResponse: {
  code: number;
  msg: string;
  data: {
    total: number;
    has_next: boolean;
    items: {
      id: string;
      product_name: string;
      volume: string;
      image_url: string;
      status: ProductStatus;
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
        product_name: 'Coca-Cola Classique',
        volume: '30cl',
        image_url: '/assets/images/coca-cola-classique.png',
        status: ProductStatus.DISPONIBLE,
      },
      {
        id: 'prod-002',
        product_name: 'Coca-Cola Zéro',
        volume: '30cl',
        image_url: '/assets/images/coca-cola-zero.png',
        status: ProductStatus.DISPONIBLE,
      },
      {
        id: 'prod-003',
        product_name: 'Fanta Orange',
        volume: '30cl',
        image_url: '/assets/images/fanta-orange.png',
        status: ProductStatus.DISPONIBLE,
      },
      {
        id: 'prod-004',
        product_name: 'Fanta Cocktail',
        volume: '30cl',
        image_url: '/assets/images/fanta-cocktail.png',
        status: ProductStatus.DISPONIBLE,
      },
      {
        id: 'prod-005',
        product_name: 'Fanta Fruits rouge',
        volume: '30cl',
        image_url: '/assets/images/fanta-fruits-rouge.png',
        status: ProductStatus.INDISPONIBLE,
      },
      {
        id: 'prod-006',
        product_name: 'Fanta Pommes',
        volume: '30cl',
        image_url: '/assets/images/fanta-pommes.png',
        status: ProductStatus.DISPONIBLE,
      },
      {
        id: 'prod-007',
        product_name: 'Sprite',
        volume: '30cl',
        image_url: '/assets/images/sprite.png',
        status: ProductStatus.DISPONIBLE,
      },
      {
        id: 'prod-008',
        product_name: 'Schweppes Tonic',
        volume: '30cl',
        image_url: '/assets/images/schweppes-tonic.png',
        status: ProductStatus.DISPONIBLE,
      },
      {
        id: 'prod-009',
        product_name: 'Fanta Cocktail',
        volume: '30cl',
        image_url: '/assets/images/fanta-cocktail-2.png',
        status: ProductStatus.DISPONIBLE,
      },
      {
        id: 'prod-010',
        product_name: 'Céleste Naturelle 1.5L',
        volume: 'Pack de 6',
        image_url: '/assets/images/celeste-naturelle.png',
        status: ProductStatus.DISPONIBLE,
      },
    ],
  },
};