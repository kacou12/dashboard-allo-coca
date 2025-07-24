export type CountryResponse = {
  id: string
  x_id: string
  name: string
  code: string
  iso_code: string
  phonenumber_length: number
}
export type CountryUpdatePayload = {
  name?: string
  code?: string
  iso_code?: string
  phonenumber_length?: number
}
export type CountryRequest = {
  name: string
  code: string
  iso_code: string
  phonenumber_length: number
}
