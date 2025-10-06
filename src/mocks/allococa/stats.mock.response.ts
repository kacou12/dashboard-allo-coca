export const mockStatsResponse: {
  code: number;
  msg: string;
  data: {
    total_sales: number;
    best_seller: {
      product_id: string;
      product_name: string;
      product_image_url: string;
      orders_count: number;
    };
    weekly_orders: number;
  };
} = {
  code: 200,
  msg: 'stats successfully retrieved',
  data: {
    total_sales: 634500258,

    best_seller: {
      // Correspondance : 'id' est devenu 'product_id'
      product_id: 'prod-001', 
      product_name: 'Coca-Cola Classique',
      // Correspondance : 'image_url' est devenu 'product_image_url'
      product_image_url: '/assets/images/coca-cola-classique.png', 
      orders_count: 547, // La commande a été supprimé
    },
    // Correspondance : 'total_orders' est devenu 'weekly_orders'
    weekly_orders: 547, 
  },
};