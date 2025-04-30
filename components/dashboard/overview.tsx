"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import type { Document } from "@/types"

interface OverviewProps {
  isLoading: boolean
  documents?: Document[]
}

export function Overview({ isLoading, documents }: OverviewProps) {
  // Función para agrupar documentos por mes
  const groupDocumentsByMonth = (docs: Document[] = []) => {
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

    const currentYear = new Date().getFullYear()
    const data = months.map((name, index) => ({
      name,
      total: 0,
      month: index,
    }))

    docs.forEach((doc) => {
      const date = new Date(doc.created_at)
      if (date.getFullYear() === currentYear) {
        const monthIndex = date.getMonth()
        data[monthIndex].total += 1
      }
    })

    return data
  }

  const data = groupDocumentsByMonth(documents)

  if (isLoading) {
    return <Skeleton className="h-[350px] w-full" />
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
