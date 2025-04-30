"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentDocuments } from "@/components/dashboard/recent-documents"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchDocuments, fetchCategories, fetchCompanies, fetchSubscriptions } from "@/lib/api"

export default function DashboardPage() {
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

  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  })

  const isLoading = isLoadingDocuments || isLoadingCategories || isLoadingCompanies || isLoadingSubscriptions

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="recent">Documentos Recientes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documentos Totales</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingDocuments ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">{documents?.length || 0}</div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingCategories ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">{categories?.length || 0}</div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Empresas</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingCompanies ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">{companies?.length || 0}</div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Suscripciones</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingSubscriptions ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-2xl font-bold">{subscriptions?.length || 0}</div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview isLoading={isLoading} documents={documents} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Documentos Recientes</CardTitle>
                <CardDescription>Últimos documentos agregados al sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentDocuments isLoading={isLoadingDocuments} documents={documents?.slice(0, 5) || []} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Recientes</CardTitle>
              <CardDescription>Lista completa de los últimos documentos agregados al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentDocuments isLoading={isLoadingDocuments} documents={documents || []} showAll />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
