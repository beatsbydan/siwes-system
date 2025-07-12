"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Users, FileText, CheckCircle, Clock, Eye } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function IndustrySupervisorDashboard() {
  const [students] = useState([
    {
      id: 1,
      name: "John Doe",
      matricNo: "CSC/2021/001",
      department: "Computer Science",
      week: 3,
      status: "pending",
      lastSubmission: "2024-01-22",
    },
    {
      id: 2,
      name: "Jane Smith",
      matricNo: "CSC/2021/002",
      department: "Computer Science",
      week: 2,
      status: "approved",
      lastSubmission: "2024-01-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      matricNo: "ENG/2021/003",
      department: "Engineering",
      week: 4,
      status: "pending",
      lastSubmission: "2024-01-23",
    },
  ])

  const [selectedLog, setSelectedLog] = useState<any>(null)
  const [feedback, setFeedback] = useState("")

  const handleReview = (student: any, action: "approve" | "reject") => {
    console.log(`${action} log for ${student.name}`, feedback)
    setSelectedLog(null)
    setFeedback("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        )
      default:
        return <Badge variant="outline">No Submission</Badge>
    }
  }

  return (
    <DashboardLayout userRole="industry-supervisor" userName="Dr. Sarah Wilson">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Industry Supervisor Dashboard</h1>
          <p className="text-gray-600">Monitor and review student logbook submissions</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">Currently supervising</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.filter((s) => s.status === "pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting your review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Week 4</div>
              <p className="text-xs text-muted-foreground">Current training week</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Submissions</CardTitle>
            <CardDescription>Review and approve weekly logbook entries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Matric No.</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Current Week</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Submission</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.matricNo}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>Week {student.week}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{student.lastSubmission}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedLog(student)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Review Log Entry - {student.name}</DialogTitle>
                            <DialogDescription>Week {student.week} submission for review</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold">Activity Title:</h4>
                              <p className="text-gray-700">Software Development Training and Database Design</p>
                            </div>
                            <div>
                              <h4 className="font-semibold">Description:</h4>
                              <p className="text-gray-700">
                                This week I was introduced to the company's software development lifecycle. I learned
                                about their coding standards, version control using Git, and participated in daily
                                standup meetings. I also started working on a small database design project for the
                                inventory management system.
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="feedback">Your Feedback</Label>
                              <Textarea
                                id="feedback"
                                placeholder="Provide feedback on the student's work..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleReview(student, "approve")}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                              <Button variant="destructive" onClick={() => handleReview(student, "reject")}>
                                Reject
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
