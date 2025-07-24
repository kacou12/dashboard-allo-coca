import { z } from 'zod'
import type { adminAlertSchema } from './admin-alerts-schema'

export type AdminAlert = z.infer<typeof adminAlertSchema>

export type AdminAlertRequest = AdminAlert

export type AdminAlertResponse = {
  created_at: string
  description: string
  id: string
  is_resolved: boolean
  metadata: number[]
  resolved_at: string
  title: string
  type: 'failed_transactions' | 'system_error' | 'provider_issue'
  severity: 'low' | 'medium' | 'high'
  updated_at: string
}

export type AdminAlertUpdatePayload = Partial<AdminAlert>

export type AdminAlertStatsResponse = {
  total: number
  resolved: number
  unresolved: number
  bySeverity: {
    critical: number
    high: number
    medium: number
    low: number
  }
  byType: Record<string, number>
}

export type AdminAlertStatusUpdate = {
  status: 'resolved' | 'unresolved' | 'archived'
}
