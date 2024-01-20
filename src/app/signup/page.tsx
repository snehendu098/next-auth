"use client";
import Link from "next/link";
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const {toast} = useToast()

  const router = useRouter()
  const [user, setUser] = React.useState({email: "", password: "", username: ""})
  const [btnDisabled, setBtnDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      setBtnDisabled(true)
      const response = await axios.post("/api/users/signup", user)
      console.log(response.data)

      toast({title: "Account created successfully", description: "Please log in now"})

      router.push("/login")


    } catch (err: any) {
      console.log(err.message)

      toast({
        variant: "destructive",
        title: "Someting Went Wrong",
        description: err.message
      })
    } finally {

    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [user])

  return (
  <>
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      <Card className="w-[30vw]">
          <CardHeader>
            <CardTitle className="text-4xl font-bold" >Sign Up</CardTitle>
            <CardDescription>
            Sign Up to create a new account and continue to the application
          </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input id="email" onChange={e => setUser({...user, email: e.target.value})} type="email" placeholder="John Doe" />
            </div>
          <div className="sapce-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="pass" onChange={e => setUser({...user, password: e.target.value})} type="password" placeholder="secure password" />
          </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="@doejohn" onChange={e => setUser({...user, username: e.target.value})} />
            </div>
          </CardContent>
          <CardFooter className="flex w-full flex-col justify-start items-start"  >
            {btnDisabled ? <Button disabled >{!loading ? "Sign Up" : <Loader2 className="mr-2 w-4 h-4" />}</Button> : <Button onClick={onSignup} >{!loading ? "Sign Up" : <Loader2 className="mr-2 w-4 h-4" />}</Button>}
            <div className="mt-5" >
            <p className="text-muted-foreground text-xs" >Already have an account? <span className="text-white" ><Link href={"/login"}>login</Link></span></p>
            </div>
          </CardFooter>
        </Card>
  </div>
  </>
  )
}
