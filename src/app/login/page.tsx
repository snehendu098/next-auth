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

export default function Login() {
  const [user, setUser] = React.useState({email: "", password: ""})
  const [btnDisabled, setBtnDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const {toast} = useToast()

  const onLogin = async () => {
    try {
      setLoading(true)
      setBtnDisabled(true)
      const res = await axios.post("/api/users/login", user)
      console.log(res.data)

      toast({title: "Logged in successfully"})

      router.push("/profile")
      

    } catch (err:any) {
      console.log(err)
      toast({variant: "destructive", title: err.response.data.error})
    } finally {
      setLoading(false)
      setBtnDisabled(false)
    }
  }

   useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [user])

   

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      <Card className="w-[30vw]" >
          <CardHeader>
            <CardTitle className="text-4xl font-bold" >Log In</CardTitle>
            <CardDescription>
            Log in to your account
          </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input id="email" onChange={e => setUser({...user, email: e.target.value})} type="email" placeholder="John Doe" />
            </div>
          <div className="sapce-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="pass" onChange={e => setUser({...user, password: e.target.value})} type="password" placeholder="Enter Password" />
          </div>
          </CardContent>
          <CardFooter className="flex w-full flex-col justify-start items-start"  >
            {btnDisabled ? <Button disabled >{!loading ? "Login" : <Loader2 className="mr-2 w-4 h-4" />}</Button> : <Button onClick={onLogin} >{!loading ? "Login" : <Loader2 className="mr-2 w-4 h-4" />}</Button>}
            <p className="text-muted-foreground text-xs mt-5" >Don't have an account? <span className="text-white" ><Link href={"/signup"}>sign up</Link></span></p>

          </CardFooter>
        </Card>
    </div>
  )
}
