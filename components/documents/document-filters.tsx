"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { Category, Company } from "@/types"
import { Search, X } from "lucide-react"

interface DocumentFiltersProps {
  categories: Category[];
  companies: Company[];
  filters: {
    categoryId: string;
    companyId: string;
    search: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      categoryId: string;
      companyId: string;
      search: string;
    }>
  >;
  isLoading: boolean;
}

export function DocumentFilters({ categories, companies, filters, setFilters, isLoading }: DocumentFiltersProps) {
  const handleReset = () => {
    setFilters({
      categoryId: "",
      companyId: "",
      search: "",
    })
  }

  // Ensure valid data for categories and companies
  const validCategories = categories.filter((category) => category.id && category.name)
  const validCompanies = companies.filter((company) => company.id && company.name)

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar documentos..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="h-10"
        />
      </div>
      <Select value={filters.categoryId} onValueChange={(value) => setFilters({ ...filters, categoryId: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {validCategories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={filters.companyId} onValueChange={(value) => setFilters({ ...filters, companyId: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por empresa" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las empresas</SelectItem>
          {validCompanies.map((company) => (
            <SelectItem key={company.id} value={company.id.toString()}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(filters.categoryId !== "" || filters.companyId !== "" || filters.search !== "") && (
        <Button variant="ghost" onClick={handleReset} className="flex items-center gap-1 md:col-span-3 md:w-fit">
          <X className="h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )
}
