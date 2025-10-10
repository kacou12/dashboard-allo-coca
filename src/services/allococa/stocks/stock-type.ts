import type { ProductStatus } from "@/mocks/allococa/products.mock.response"

export type StockUpdatePayload = {
  name?: string
  description?: string
  category_id?: string
  image?: File
}

export type StockCreatePayload = {
  name: string
  description: string
  category_id: string
  image?: File
}

export type StockProductVariantCreatePayload = {
  product_id:string 
  size: string
  label: string
  description: string
  quantity: number //0
  unit_price: number
  images?: File[]
  sort_order?: number //0
}
export type StockProductVariantUpdatePayload = {
  product_id?:string 
  size?: string
  label?: string
  description?: string
  quantity?: number //0
  unit_price?: number
  sort_order?: number //0
  image?: File
  icon_image?: File
}

// Partial<StockProductVariantCreatePayload>

export type StockStatusUpdatePayload = {
  status?: boolean
}

export type StockQuantityUpdatePayload = {
  quantity: number
  operation: 'add' | 'subtract' | 'set'
}

export enum ProductStatusEnum {
  DISPONIBLE = 'Disponible',
  INDISPONIBLE = 'Indisponible'
}

export const ProductStatusConfig = Object.freeze({
  DISPONIBLE: { value: 'Disponible', name: 'Disponible', color: '#C8E6C9', textColor: '#388E3C' },
  INDISPONIBLE: { value: 'Indisponible', name: 'Indisponible', color: '#FFCDD2', textColor: '#D32F2F' },
})

export type StockFiltersPayload = {
  search?: string;
  page: number;
  status?: string;
  dates?: [Date, Date];
  limit?: number;
};
export type StockProductVariantFiltersPayload = {
  search?: string;
  page: number;
  product_id?: string
  status?: string;
  dates?: [Date, Date];
  limit?: number;
};

export type StockResponse = {
  id: string
  name: string
  description: string
  image_url: string
  category_id: string
  created_at: string
  updated_at: string
  status: boolean
}
export type StockProductVariantResponse = {
  product_id: string
  size: string
  label: string
  description: string
  quantity: number
  unit_price: number
  image_url: string
  icon_url: string
  sort_order: number
  id: string
  created_at: string
  updated_at: string
  status: boolean
  product: Product
}

interface Product {
  id: string
  name: string
  description: string
  image_url: string
  category_id: string
  created_at: string
  status: boolean
}

