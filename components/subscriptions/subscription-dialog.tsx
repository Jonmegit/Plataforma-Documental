"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createSubscription, updateSubscription } from "@/lib/api"
import type { Subscription, Company } from "@/types"
import { Loader2 } from "lucide-react"
import { format } from "date-fns"

const formSchema = z.object({
  plan_name: z.string().min(1, { message: "El nombre del plan es requerido" }),
  company_id: z.string().min(1, { message: "La empresa es requerida" }),
  start_date: z.string().min(1, { message: "La fecha de inicio es requerida" }),
  end_date: z.string().min(1, { message: "La fecha de fin es requerida" }),
  status: z.string().min(1, { message: "El estado es requerido" }),
  price: z.string().min(1, { message: "El precio es requerido" }),
})

interface SubscriptionDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  subscription: Subscription | null
  companies: Company[]
}

export function SubscriptionDialog({ open, setOpen, subscription, companies }: SubscriptionDialogProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const formatDateForInput = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "yyyy-MM-dd")
    } catch (error) {
      return ""
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan_name: subscription?.plan_name || "",
      company_id: subscription?.company_id.toString() || "",
      start_date: subscription?.start_date ? formatDateForInput(subscription.start_date) : "",
      end_date: subscription?.end_date ? formatDateForInput(subscription.end_date) : "",
      status: subscription?.status || "active",
      price: subscription?.price?.toString() || "",
    },
  })

  const createMutation = useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
      toast({
        title: "Suscripción creada",
        description: "La suscripción ha sido creada correctamente",
      })
      setOpen(false)
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear la suscripción. Intente nuevamente.",
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
      toast({
        title: "Suscripción actualizada",
        description: "La suscripción ha sido actualizada correctamente",
      })
      setOpen(false)
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar la suscripción. Intente nuevamente.",
      })
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const payload = {
        ...values,
        company_id: Number.parseInt(values.company_id),
        price: Number.parseFloat(values.price),
      }

      if (subscription) {
        await updateMutation.mutateAsync({
          id: subscription.id,
          data: payload,
        })
      } else {
        await createMutation.mutateAsync(payload)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{subscription ? "Editar Suscripción" : "Nueva Suscripción"}</DialogTitle>
          <DialogDescription>
            {subscription
              ? "Actualice la información de la suscripción"
              : "Complete la información para crear una nueva suscripción"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="plan_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Plan</FormLabel>
                  <FormControl>
                    <Input placeholder="Plan Básico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar empresa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id.toString()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Inicio</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Fin</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Activa</SelectItem>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="expired">Expirada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="99.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {subscription ? "Actualizando..." : "Creando..."}
                  </>
                ) : subscription ? (
                  "Actualizar"
                ) : (
                  "Crear"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
