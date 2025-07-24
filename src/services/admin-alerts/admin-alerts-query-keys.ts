export const AdminAlertsQueryKeys = {
  default: ['adminAlerts'] as const,
  all: ['adminAlerts'] as const,
  lists: () => [...AdminAlertsQueryKeys.all, 'list'] as const,
  details: (id: string) => [...AdminAlertsQueryKeys.all, 'detail', id] as const,
}
