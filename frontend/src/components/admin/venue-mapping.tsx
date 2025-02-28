"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, Plus, Save, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Section {
  id: string
  name: string
  capacity: number
  price: number
  color: string
  points: { x: number; y: number }[]
}

interface VenueMappingProps {
  initialSections?: Section[]
  onSave?: (sections: Section[]) => void
}

export default function VenueMapping({ initialSections, onSave }: VenueMappingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [sections, setSections] = useState<Section[]>(initialSections || [])
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [drawing, setDrawing] = useState(false)
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([])

  // Colors for different sections
  const sectionColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#D4A5A5", "#9B59B6", "#3498DB"]

  useEffect(() => {
    drawVenue()
  }, [sections]) //Fixed unnecessary dependency

  const drawVenue = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw all sections
    sections.forEach((section) => {
      if (section.points.length < 3) return

      ctx.beginPath()
      ctx.moveTo(section.points[0].x, section.points[0].y)
      section.points.slice(1).forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.closePath()

      // Fill section
      ctx.fillStyle = section.color + "80" // Add transparency
      ctx.fill()

      // Draw border
      ctx.strokeStyle = section.color
      ctx.lineWidth = section.id === activeSection ? 3 : 1
      ctx.stroke()

      // Add section name
      const centerX = section.points.reduce((sum, point) => sum + point.x, 0) / section.points.length
      const centerY = section.points.reduce((sum, point) => sum + point.y, 0) / section.points.length

      ctx.fillStyle = "#FFFFFF"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(section.name, centerX, centerY)
    })

    // Draw current points if drawing
    if (drawing && currentPoints.length > 0) {
      ctx.beginPath()
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y)
      currentPoints.slice(1).forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCurrentPoints([...currentPoints, { x, y }])
  }

  const handleAddSection = () => {
    if (currentPoints.length < 3) return

    const newSection: Section = {
      id: Date.now().toString(),
      name: `Section ${sections.length + 1}`,
      capacity: 100,
      price: 50,
      color: sectionColors[sections.length % sectionColors.length],
      points: currentPoints,
    }

    setSections([...sections, newSection])
    setCurrentPoints([])
    setDrawing(false)
  }

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))
    if (activeSection === id) {
      setActiveSection(null)
    }
  }

  const handleUpdateSection = (id: string, updates: Partial<Section>) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, ...updates } : section)))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6 lg:grid-cols-[2fr,1fr]"
    >
      {/* Canvas Card */}
      <Card>
        <CardHeader>
          <CardTitle>Venue Layout</CardTitle>
          <CardDescription>Click to create sections or select existing ones to edit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onClick={handleCanvasClick}
              className="border border-border rounded-lg bg-black/50 w-full h-auto cursor-crosshair"
            />
            <div className="absolute top-4 right-4 space-x-2">
              <Button
                variant={drawing ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setDrawing(!drawing)
                  setCurrentPoints([])
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                {drawing ? "Finish Section" : "Add Section"}
              </Button>
              {drawing && currentPoints.length >= 3 && (
                <Button size="sm" onClick={handleAddSection}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Section
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sections Card */}
      <Card>
        <CardHeader>
          <CardTitle>Sections</CardTitle>
          <CardDescription>Manage your venue sections and their properties</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`rounded-lg border p-4 ${section.id === activeSection ? "border-primary" : ""}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: section.color }} />
                  <Input
                    value={section.name}
                    onChange={(e) => handleUpdateSection(section.id, { name: e.target.value })}
                    className="h-8 w-[140px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => setActiveSection(section.id)}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteSection(section.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {section.id === activeSection && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input
                      type="number"
                      value={section.capacity}
                      onChange={(e) =>
                        handleUpdateSection(section.id, {
                          capacity: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={section.price}
                      onChange={(e) =>
                        handleUpdateSection(section.id, {
                          price: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Color</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: section.color }} />
                          Select Color
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {sectionColors.map((color) => (
                          <DropdownMenuItem key={color} onClick={() => handleUpdateSection(section.id, { color })}>
                            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
                            {color}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            </div>
          ))}

          {sections.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No sections created yet. Click "Add Section" to begin mapping your venue.
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

