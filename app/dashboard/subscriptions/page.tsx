"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SubscriptionsTable } from "@/components/subscriptions/subscriptions-table"
import { SubscriptionDialog } from "@/components/subscriptions/subscription-dialog"
import { fetchSubscriptions, fetchCompanies } from "@/lib/api"
import type { Subscription } from "@/types"

export default function SubscriptionsPage() {
  const [open, setOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)

  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  })

  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
  })

  const isLoading = isLoadingSubscriptions || isLoadingCompanies

  const handleEdit = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setOpen(true)
  }

  const handleCreate = () => {
    setSelectedSubscription(null)
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Suscripciones</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Suscripción
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Suscripciones</CardTitle>
          <CardDescription>{subscriptions?.length || 0} suscripciones encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <SubscriptionsTable
            subscriptions={subscriptions || []}
            companies={companies || []}
            isLoading={isLoading}
            onEdit={handleEdit}
          />
        </CardContent>
      </Card>
      <SubscriptionDialog
        open={open}
        setOpen={setOpen}
        subscription={selectedSubscription}
        companies={companies || []}
      />
    </div>
  )
}
