export const mockStatsResponse: {
  code: number;
  msg: string;
  data: {
    total_sales: number;
    total_sales_trend: 'up' | 'down';
    best_seller: {
      product_name: string;
      image_url: string;
      orders_count: number;
    };
    total_orders: number;
    total_orders_trend: 'up' | 'down';
  };
} = {
  code: 200,
  msg: 'stats successfully retrieved',
  data: {
    total_sales: 634500258,
    total_sales_trend: 'up',
    best_seller: {
      product_name: 'Coca-Cola Classique',
      image_url: '/assets/images/coca-cola-classique.png',
      orders_count: 2710,
    },
    total_orders: 547,
    total_orders_trend: 'up',
  },
};