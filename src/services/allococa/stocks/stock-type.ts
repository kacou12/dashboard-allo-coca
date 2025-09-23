import type { ProductStatus } from "@/mocks/allococa/products.mock.response"

export type StockUpdatePayload = {
  product_name?: string
  volume?: string
  image_url?: string
  status?: string
  quantity?: number
  min_threshold?: number
  max_threshold?: number
}

export type StockCreatePayload = {
  product_name: string
  volume: string
  image_url: string
  quantity: number
  min_threshold?: number
  max_threshold?: number
}

export type StockStatusUpdatePayload = {
  status?: string
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
  q?: string;
  page: number;
  status?: string;
  dates?: [Date, Date];
  limit?: number;
};

export type StockResponse = {
    id: string;
    product_name: string;
    volume: string;
    image_url: string;
    status: ProductStatusEnum;
    created_at?: string
}

