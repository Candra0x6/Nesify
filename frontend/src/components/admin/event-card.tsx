"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, MoreVertical, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    image: string
    totalTickets: number
    soldTickets: number
    status: "upcoming" | "live" | "ended"
  }
}

export default function EventCard({ event }: EventCardProps) {
  const soldPercentage = (event.soldTickets / event.totalTickets) * 100

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden">
        <CardHeader className="relative p-0">
          <div className="relative h-48 w-full">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute right-2 top-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit Event</DropdownMenuItem>
                  <DropdownMenuItem>View Analytics</DropdownMenuItem>
                  <DropdownMenuItem>Manage Tickets</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4">
            <CardTitle className="mb-2 text-xl">{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              {event.date}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              {event.soldTickets} / {event.totalTickets} tickets sold
            </div>
            <Progress value={soldPercentage} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 pt-0">
          <Button variant="outline" asChild>
            <Link href={`/admin/events/${event.id}`}>View Details</Link>
          </Button>
          <Button>Manage Tickets</Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

