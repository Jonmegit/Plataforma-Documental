"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CompaniesTable } from "@/components/companies/companies-table"
import { CompanyDialog } from "@/components/companies/company-dialog"
import { fetchCompanies } from "@/lib/api"
import type { Company } from "@/types"

export default function CompaniesPage() {
  const [open, setOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  })

  const handleEdit = (company: Company) => {
    setSelectedCompany(company)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedCompany(null)
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Empresa
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
          <CardDescription>{companies?.length || 0} empresas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <CompaniesTable companies={companies || []} isLoading={isLoading} onEdit={handleEdit} />
        </CardContent>
      </Card>
      <CompanyDialog open={open} setOpen={setOpen} company={selectedCompany} />
    </div>
  )
}
