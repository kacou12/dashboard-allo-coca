export type DefaultFiltersPayload = {
  q?: string;
  page: number;
  country_id?: string;
  dates?: [Date, Date];
  limit?: number;
};
export type DefaultFiltersRequest = {
  q?: string;
  page: number;
  country_id?: string;
  start_date: string;
  end_date: string;
};
export type UserFiltersPayload = DefaultFiltersPayload & {
  sort_by?: string;
  sort_order?: string;
  active?: boolean;
  name_filter?: boolean;
  phone_verified?: boolean;
};

// export type OperationLogFiltersPayload = {
//   trace_id?: string
//   user_email?: string
//   user_phone?: string
//   method?: string
//   path?: string
//   status?: number
//   start_date?: string
//   end_date?: string
//   page?: number
//   limit?: number
// }

export type TransactionFiltersPayload = DefaultFiltersPayload & {
  status?: string;
  type?: string;
  payer_provider?: string;
  beneficiary_provider?: string;
  beneficiary_country_iso_code?: string;
  user_id?: string;
  limit: number;
  country_iso_code?: string;
  // has_relaunch_payment?: boolean
};
export type SupplyFiltersPayload = DefaultFiltersPayload & {
  status?: string;
  type?: string;
  limit: number;
  country_iso_code?: string;
  // has_relaunch_payment?: boolean
};

export type OperationLogFiltersPayload = DefaultFiltersPayload & {
  trace_id?: string;
  user_email?: string;
  user_phone?: string;
  method?: string;
  path?: string;
  status?: number;
  dates?: [Date, Date];
  // start_date?: string
  // end_date?: string
  page?: number;
  limit?: number;
};
export type NotificationFiltersPayload = DefaultFiltersPayload & {
  countries?: string[];
};

export type DashboardFiltersPayload = {
  country_iso_code?: string;
  dates?: [Date, Date];
};
export type DashboardFiltersRequest = {
  country_iso_code?: string;
  start_date: string;
  end_date: string;
};

export type DocumentFile = {
  id: string;
  x_id: string;
  filepath: string;
  public_id: string;
  file_type: string;
  description: string;
  created_at: string;
  updated_at: string;
  account_verification_request_id: string;
};

export type UserVerificationFiltersPayload = DefaultFiltersPayload & {
  typeDoc?: string;
  country_id?: string;
  status?: string;
};
export type GiftCardFiltersPayload = DefaultFiltersPayload & {
  country_iso_code?: string;
  status?: string;
};
export type GiftCardFiltersStatusPayload = DefaultFiltersPayload & {
  country_iso_code?: string;
  start_date: string;
  end_date: string;
};
export type GiftCardStatsFiltersPayload = {
  country_iso_code?: string;
  dates?: [Date, Date];
};

export type GiftCardFiltersRequest = GiftCardFiltersPayload & {
  start_date: string;
  end_date: string;
};

export type UserVerificationFiltersRequest = DefaultFiltersPayload & {
  typeDoc?: string;
  country_id?: string;
  status?: string;
  startDate: string;
  endDate: string;
};
