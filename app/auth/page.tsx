"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [processing, setProcessing] = useState<boolean>(false);
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
    role: "student",
  })
  const [signupData, setSignupData] = useState({
    userId: "",
    fullName: "",
    department: "",
    phoneNumber: "",
    email: "",
    level: "",
    password: "",
    role: "student",
  })

  const isStudent = useMemo(() => {
    console.log(signupData)
    return signupData?.role === "student"
  }, [signupData])

  const handleLogin = (e: React.FormEvent) => {
    setProcessing(true)
    e.preventDefault()
    
    const { role } = loginData

    if (role === "student") {
      router.push("/student/dashboard")
    } else if (role === "industry-supervisor") {
      router.push("/industry-supervisor/dashboard")
    } else if (role === "school-supervisor") {
      router.push("/school-supervisor/dashboard")
    } else if (role === "admin") {
      router.push("/admin/dashboard")
    }

  }

  const handleSignup = (e: React.FormEvent) => {
    setProcessing(true)
    e.preventDefault()

    console.log("Signup data:", signupData)

    const { role } = signupData

    if (role === "student") {
      router.push("/student/onboarding")
    } else if (role === "industry-supervisor" || role === "school-supervisor") {
      router.push("/school-supervisor/onboarding")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/siwes.png" className="w-24 mb-8 mx-auto aspect-square" alt="Logo" />
          <h1 className="text-3xl font-bold text-gray-900">SIWES</h1>
          <p className="text-gray-600 mt-2">Student Industrial Work Experience Scheme</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your SIWES account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID (Staff ID/Matric Number)</Label>
                    <Input
                      id="userId"
                      type="text"
                      placeholder="Enter your ID"
                      value={loginData.userId}
                      onChange={(e) => setLoginData({ ...loginData, userId: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={loginData.role}
                      onValueChange={(value) => setLoginData({ ...loginData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        {/* <SelectItem value="industry-supervisor">Industry Supervisor</SelectItem> */}
                        <SelectItem value="school-supervisor">School Supervisor</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" isProcessing={processing}>
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Register for SIWES system</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupUserId">User ID</Label>
                      <Input
                        id="signupUserId"
                        placeholder="Staff ID/Matric No"
                        value={signupData.userId}
                        onChange={(e) => setSignupData({ ...signupData, userId: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupRole">Role</Label>
                      <Select
                        value={signupData.role}
                        onValueChange={(value) => setSignupData({ ...signupData, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          {/* <SelectItem value="industry-supervisor">Industry Supervisor</SelectItem> */}
                          <SelectItem value="school-supervisor">School Supervisor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter full name"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        placeholder="Phone number"
                        value={signupData.phoneNumber}
                        onChange={(e) => setSignupData({ ...signupData, phoneNumber: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  

                  {isStudent && <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        placeholder="Department"
                        value={signupData.department}
                        onChange={(e) => setSignupData({ ...signupData, department: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select
                        value={signupData.level}
                        onValueChange={(value) => setSignupData({ ...signupData, level: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="200">200 Level</SelectItem>
                          <SelectItem value="300">300 Level</SelectItem>
                          <SelectItem value="400">400 Level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>}

                  <Button type="submit" className="w-full" isProcessing={processing}>
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
