"use client"

import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import type { Document } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText } from "lucide-react"
import Link from "next/link"

interface RecentDocumentsProps {
  isLoading: boolean
  documents: Document[]
  showAll?: boolean
}

export function RecentDocuments({ isLoading, documents, showAll = false }: RecentDocumentsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No hay documentos</h3>
        <p className="text-sm text-muted-foreground">No se encontraron documentos en el sistema.</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true, locale: es })
    } catch (error) {
      return "Fecha desconocida"
    }
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <Link
          key={document.id}
          href={`/dashboard/documents?id=${document.id}`}
          className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-medium leading-none">{document.title}</p>
            <p className="text-sm text-muted-foreground">{formatDate(document.created_at)}</p>
          </div>
        </Link>
      ))}
      {!showAll && documents.length > 0 && (
        <Link
          href="/dashboard/documents"
          className="block text-center text-sm font-medium text-primary hover:underline"
        >
          Ver todos los documentos
        </Link>
      )}
    </div>
  )
}
