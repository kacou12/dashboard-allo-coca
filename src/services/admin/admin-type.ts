import { z } from 'zod'
import type { adminRoleSchema, adminSchema } from './admin-schema'
import type { AdminRole } from './admin-constants'
import type { CountryResponse } from '../country/country-type'

export type AdminForm = z.infer<typeof adminSchema>
export type AdminRoleForm = z.infer<typeof adminRoleSchema>

export type AdminRequest = {
  email: string
  name: string
  phone: string
  // role_id: string
}
export type AdminRoleRequest = AdminRoleForm & {
  description: string
  permissions: PermissionRequest[]
}
export type AdminRoleUpdatePayload = {
  id?: string
  name?: string
  description?: string
  permissions?: PermissionRequest[]
}

export type PermissionRequest = {
  v1: string
  v2: string
}

export type AdminResponse = {
  id: string
  active: boolean
  email: string
  name: string
  phone: string
  created_at: string
  updated_at: string
}

export type AdminUpdatePayload = {
  // id?: string

  active?: boolean
  email?: string
  name?: string
  phone?: string
}

export type PermissionResponse = {
  v1: string
  v2: string
}
export type PermissionDefaultResponse = {
  v1_object: string
  v2_action: string
  subject: string
}

// v1: permission.object,
// v2: permission.action

export type RoleResponse = {
  id: string
  name: string
  description: string
  permissions?: PermissionResponse[]
  created_at:string
  updated_at:string
}
