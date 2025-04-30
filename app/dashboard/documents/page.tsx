"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentsTable } from "@/components/documents/documents-table"
import { DocumentFilters } from "@/components/documents/document-filters"
import { DocumentDialog } from "@/components/documents/document-dialog"
import { fetchDocuments, fetchCategories, fetchCompanies } from "@/lib/api"
import type { Document } from "@/types"

export default function DocumentsPage() {
  const [open, setOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [filters, setFilters] = useState({
    categoryId: "",
    companyId: "",
    search: "",
  })

  const { data: documents, isLoading: isLoadingDocuments } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  })

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  })

  const isLoading = isLoadingDocuments || isLoadingCategories || isLoadingCompanies

  const filteredDocuments = documents?.filter((document: Document) => {
    const matchesCategory = !filters.categoryId || document.category_id.toString() === filters.categoryId
    const matchesCompany = !filters.companyId || document.company_id.toString() === filters.companyId
    const matchesSearch =
      !filters.search ||
      document.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      document.description.toLowerCase().includes(filters.search.toLowerCase())

    return matchesCategory && matchesCompany && matchesSearch
  })

  const handleEdit = (document: Document) => {
    setSelectedDocument(document)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedDocument(null)
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Documento
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre los documentos por categoría, empresa o texto</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentFilters
            categories={categories || []}
            companies={companies || []}
            filters={filters}
            setFilters={setFilters}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Documentos</CardTitle>
          <CardDescription>{filteredDocuments?.length || 0} documentos encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentsTable
            documents={filteredDocuments || []}
            categories={categories || []}
            companies={companies || []}
            isLoading={isLoading}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>
      <DocumentDialog
        open={open}
        setOpen={setOpen}
        document={selectedDocument}
        categories={categories || []}
        companies={companies || []}
      />
    </div>
  )
}
