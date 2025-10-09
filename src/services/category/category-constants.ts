export const CategoryRouteApi = {
  default: '/admin/api/v1/category',
  getOne: (id: string) => `/merchant/api/v1/category/${id}`,
} as const

export const CATEGORY_TABLE_HEADERS = [
  { text: 'ID', value: 'id' },
  { text: 'Nom', value: 'name' },
  { text: 'Description', value: 'description' },
  { text: 'Date de création', value: 'created_at' },
  { text: 'Actions', value: 'actions' },
]