"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Save, Send } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function LogbookEntry() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    week: "",
    title: "",
    description: "",
    file: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent, action: "draft" | "submit") => {
    e.preventDefault()
    console.log("Saving as:", action, formData)
    // In real app, save to backend
    router.push("/student/dashboard")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, file })
  }

  return (
    <DashboardLayout userRole="student" userName="John Doe">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Weekly Log Entry</h1>
          <p className="text-gray-600">Document your weekly activities and experiences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Log Entry</CardTitle>
            <CardDescription>Fill in the details of your weekly activities</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="week">Week Number</Label>
                  <Select value={formData.week} onValueChange={(value) => setFormData({ ...formData, week: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select week" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          Week {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Week Period</Label>
                  <Input id="date" value="Jan 22 - 26, 2024" disabled className="bg-gray-50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Activity Title</Label>
                <Input
                  id="title"
                  placeholder="Brief title of your weekly activities"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Activity Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe in detail what you did this week, what you learned, challenges faced, and skills acquired..."
                  className="min-h-[200px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <p className="text-sm text-gray-500">
                  Provide comprehensive details about your daily activities, learning outcomes, and any challenges
                  encountered.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Supporting Documents (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="file" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload files or drag and drop
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">PDF, DOC, or images up to 10MB</span>
                    </label>
                    <input
                      id="file"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </div>
                  {formData.file && <p className="mt-2 text-sm text-green-600">Selected: {formData.file.name}</p>}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, "draft")} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
                <Button type="button" onClick={(e) => handleSubmit(e, "submit")} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
