export interface User {
  id: number
  name: string
  email: string
  created_at: string
}

export interface Document {
  id: number
  title: string
  description: string
  category_id: number
  company_id: number
  file_url?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Company {
  id: number
  name: string
  contact_email?: string
  contact_phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: number
  plan_name: string
  company_id: number
  start_date: string
  end_date: string
  status: string
  price?: number
  created_at: string
  updated_at: string
}
