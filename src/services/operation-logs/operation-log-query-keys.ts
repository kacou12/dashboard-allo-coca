import type { OperationLogFiltersPayload } from './operation-log-type'

export const operationLogsQueryKeys = {
  all: ['operation-logs'] as const,
  operationLogsFilters: (payload: OperationLogFiltersPayload) =>
    [
      'operation-logs',
      { page: payload.page },
      { q: payload.q },
      { method: payload.method },
      { status: payload.status },
      // {date_start: payload.date_start},
      { dates: payload.dates },
      { trace_id: payload.trace_id },
      { user_email: payload.user_email },
      { user_phone: payload.user_phone },
      { method: payload.method },
      { path: payload.path },
      { limit: payload.limit },
    ] as const,
  operationLog: (id: string) => ['operation-logs', { id }] as const,
}
