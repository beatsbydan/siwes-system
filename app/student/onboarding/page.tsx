"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { format } from "date-fns"

export default function StudentOnboarding() {
  const router = useRouter()

  const [processing, setProcessing] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    academicSession: "2024/2025",
    startDate: undefined as Date | undefined,
    duration: "",
    schoolSupervisor: "",
    companyName: "",
    companyAddress: "",
    sectionAttached: "",
    companySupervisor: "",
    profileImage: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    setProcessing(true)
    e.preventDefault()
    console.log("Onboarding data:", formData)
    router.push("/student/dashboard")
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, profileImage: file })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Student Onboarding</h1>
          <p className="text-gray-600 mt-2">Complete your SIWES registration</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>IT Program Details</CardTitle>
            <CardDescription>Provide information about your industrial training</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academicSession">Academic Session</Label>
                  <Select
                    value={formData.academicSession}
                    onValueChange={(value) => setFormData({ ...formData, academicSession: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select session" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024/2025">2024/2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (weeks)</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 weeks</SelectItem>
                      <SelectItem value="24">24 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate ? format(formData.startDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolSupervisor">School Supervisor</Label>
                <Select
                  value={formData.schoolSupervisor}
                  onValueChange={(value) => setFormData({ ...formData, schoolSupervisor: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prof-johnson">Prof. Mike Johnson</SelectItem>
                    <SelectItem value="dr-smith">Dr. Jane Smith</SelectItem>
                    <SelectItem value="dr-brown">Dr. Robert Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input
                  id="companyAddress"
                  placeholder="Enter company address"
                  value={formData.companyAddress}
                  onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sectionAttached">Section/Department</Label>
                  <Input
                    id="sectionAttached"
                    placeholder="e.g., IT Department"
                    value={formData.sectionAttached}
                    onChange={(e) => setFormData({ ...formData, sectionAttached: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySupervisor">Company Supervisor</Label>
                  <Input
                    id="companySupervisor"
                    placeholder="Supervisor name"
                    value={formData.companySupervisor}
                    onChange={(e) => setFormData({ ...formData, companySupervisor: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="profileImage" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Upload profile image</span>
                      <span className="mt-1 block text-sm text-gray-500">PNG, JPG up to 5MB</span>
                    </label>
                    <input
                      id="profileImage"
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleImageChange}
                    />
                  </div>
                  {formData.profileImage && (
                    <p className="mt-2 text-sm text-green-600">Selected: {formData.profileImage.name}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" isProcessing={processing}>
                Complete Onboarding
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
