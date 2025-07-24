export const OperationLogRouteApi = {
  default: '/admin/api/v1/opera-logs',
  getOne: (id: string) => `/admin/api/v1/opera-logs/${id}`,
  getOneName: `/admin/api/v1/opera-logs/*`,
  filter: '/admin/api/v1/opera-logs',
} as const

export const OPERATION_LOG_TABLE_HEADERS = [
  { text: 'ID', value: 'id' },
  { text: 'Titre', value: 'title' },
  { text: 'Méthode', value: 'method' },
  { text: 'Chemin', value: 'path' },
  { text: 'Statut', value: 'status' },
  { text: 'Temps (ms)', value: 'cost_time' },
  { text: 'Email utilisateur', value: 'user_email' },
  { text: 'Date', value: 'created_time' },
  { text: 'Actions', value: 'actions' },
]

export const HTTP_METHODS = [
  { name: 'GET', value: 'GET' },
  { name: 'POST', value: 'POST' },
  { name: 'PUT', value: 'PUT' },
  { name: 'DELETE', value: 'DELETE' },
  { name: 'PATCH', value: 'PATCH' },
]

export const HTTP_STATUS = [
  { name: 'Succès (200)', value: 200 },
  { name: 'Créé (201)', value: 201 },
  { name: 'Mauvaise requête (400)', value: 400 },
  { name: 'Non autorisé (401)', value: 401 },
  { name: 'Interdit (403)', value: 403 },
  { name: 'Non trouvé (404)', value: 404 },
  { name: 'Erreur interne (500)', value: 500 },
]
