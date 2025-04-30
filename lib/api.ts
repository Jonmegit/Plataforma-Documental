// Asegurarse de que las URLs base sean absolutas y no dependan de localhost
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || "https://x8ki-letl-twmt.n7.xano.io/api:ga-mNu2I";
const DOCS_API_URL = process.env.NEXT_PUBLIC_DOCS_API_URL || "https://x8ki-letl-twmt.n7.xano.io/api:TdnYTjid";

// Debugging: Log the API URL to ensure it's loaded correctly
console.log("AUTH_API_URL:", AUTH_API_URL);
console.log("DOCS_API_URL:", DOCS_API_URL);

// Función para obtener el token de autenticación
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

// Función para realizar peticiones a la API
const fetchAPI = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  // Debugging: Log headers for troubleshooting
  console.log("Request Headers:", headers);

  // Debugging: Log the request details for troubleshooting
  console.log("Request URL:", url);
  console.log("Request Options:", options);

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "Error en la petición")
  }

  return response.json()
}

// Autenticación
export const loginUser = async (email: string, password: string) => {
  return fetchAPI(`${AUTH_API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export const signupUser = async (name: string, email: string, password: string) => {
  return fetchAPI(`${AUTH_API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  })
}

export const getCurrentUser = async () => {
  return fetchAPI(`${AUTH_API_URL}/auth/me`)
}

// Documentos
export const fetchDocuments = async () => {
  return fetchAPI(`${DOCS_API_URL}/document`)
}

export const fetchDocument = async (id: number) => {
  return fetchAPI(`${DOCS_API_URL}/document/${id}`)
}

export const createDocument = async (data: any) => {
  return fetchAPI(`${DOCS_API_URL}/document`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateDocument = async ({ id, data }: { id: number; data: any }) => {
  return fetchAPI(`${DOCS_API_URL}/document/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export const deleteDocument = async (id: number) => {
  return fetchAPI(`${DOCS_API_URL}/document/${id}`, {
    method: "DELETE",
  })
}

// Categorías
export const fetchCategories = async () => {
  return fetchAPI(`${DOCS_API_URL}/category`)
}

export const fetchCategory = async (id: number) => {
  return fetchAPI(`${DOCS_API_URL}/category/${id}`)
}

export const createCategory = async (data: any) => {
  return fetchAPI(`${DOCS_API_URL}/category`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateCategory = async ({ id, data }: { id: number; data: any }) => {
  return fetchAPI(`${DOCS_API_URL}/category/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export const deleteCategory = async (id: number) => {
  return fetchAPI(`${DOCS_API_URL}/category/${id}`, {
    method: "DELETE",
  })
}

// Empresas
export const fetchCompanies = async () => {
  return fetchAPI(`${DOCS_API_URL}/company`)
}

export const fetchCompany = async (id: number) => {
  return fetchAPI(`${DOCS_API_URL}/company/${id}`)
}

export const createCompany = async (data: any) => {
  return fetchAPI(`${DOCS_API_URL}/company`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateCompany = async ({ id, data }: { id: number; data: any }) => {
  return fetchAPI(`${DOCS_API_URL}/company/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export const deleteCompany = async (id: number) => {
  return fetchAPI(`${DOCS_API_URL}/company/${id}`, {
    method: "DELETE",
  })
}

// Suscripciones
export const fetchSubscriptions = async () => {
  return fetchAPI(`${DOCS_API_URL}/subscription`)
}

export const fetchSubscription = async (id: number) => {
  return fetchAPI(`${DOCS_API_URL}/subscription/${id}`)
}

export const createSubscription = async (data: any) => {
  return fetchAPI(`${DOCS_API_URL}/subscription`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateSubscription = async ({ id, data }: { id: number; data: any }) => {
  return fetchAPI(`${DOCS_API_URL}/subscription/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export const deleteSubscription = async (id: number) => {
  return fetchAPI(`${DOCS_API_URL}/subscription/${id}`, {
    method: "DELETE",
  })
}
