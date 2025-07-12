"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, FileText, CheckCircle, Clock, AlertCircle, Plus } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function StudentDashboard() {
  const [logs] = useState([
    {
      week: 1,
      title: "Orientation and Introduction",
      status: "approved",
      submittedDate: "2024-01-08",
      feedback: "Good start!",
    },
    {
      week: 2,
      title: "Learning Company Processes",
      status: "approved",
      submittedDate: "2024-01-15",
      feedback: "Well documented",
    },
    { week: 3, title: "Software Development Training", status: "pending", submittedDate: "2024-01-22", feedback: "" },
    { week: 4, title: "Project Assignment", status: "draft", submittedDate: "", feedback: "" },
  ])

  const completedWeeks = logs.filter((log) => log.status === "approved").length
  const totalWeeks = 24
  const progressPercentage = (completedWeeks / totalWeeks) * 100

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
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Draft</Badge>
    }
  }

  return (
    <DashboardLayout userRole="student" userName="John Doe">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-600">Track your SIWES progress and manage logbook entries</p>
          </div>
          <Link href="/student/logbook">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Log Entry
            </Button>
          </Link>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedWeeks}/{totalWeeks} weeks
              </div>
              <Progress value={progressPercentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">{progressPercentage.toFixed(1)}% completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logs.filter((log) => log.status === "pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting supervisor approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Week {logs.length}</div>
              <p className="text-xs text-muted-foreground">January 22 - 26, 2024</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Log Entries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Log Entries</CardTitle>
            <CardDescription>Your weekly activity submissions and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.week}>
                    <TableCell className="font-medium">Week {log.week}</TableCell>
                    <TableCell>{log.title}</TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell>{log.submittedDate || "Not submitted"}</TableCell>
                    <TableCell className="max-w-xs truncate">{log.feedback || "No feedback yet"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {log.status === "draft" && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                      </div>
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
