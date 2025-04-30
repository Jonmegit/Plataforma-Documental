"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoriesTable } from "@/components/categories/categories-table"
import { CategoryDialog } from "@/components/categories/category-dialog"
import { fetchCategories } from "@/lib/api"
import type { Category } from "@/types"

export default function CategoriesPage() {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedCategory(null)
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Categorías</CardTitle>
          <CardDescription>{categories?.length || 0} categorías encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoriesTable categories={categories || []} isLoading={isLoading} onEdit={handleEdit} />
        </CardContent>
      </Card>
      <CategoryDialog open={open} setOpen={setOpen} category={selectedCategory} />
    </div>
  )
}
