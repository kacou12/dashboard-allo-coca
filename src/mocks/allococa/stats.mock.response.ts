export const mockStatsResponse: {
  code: number;
  msg: string;
  data: {
    total_sales: number;
   
    best_seller: {
      id:string
      product_name: string;
      image_url: string;
      orders_count: number;
    };
    total_orders: number;
  };
} = {
  code: 200,
  msg: 'stats successfully retrieved',
  data: {
    total_sales: 634500258,

    best_seller: {
      id: 'prod-001',
      product_name: 'Coca-Cola Classique',
      image_url: '/assets/images/coca-cola-classique.png',
      orders_count: 2710,
    },
    total_orders: 547,
  },
};