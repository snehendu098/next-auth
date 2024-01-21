"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function UpdatePass() {

  const router = useRouter()
  const [pass, setPass] = React.useState("")
  const [conf, setConf] = React.useState("")
  const [token, setToken] = React.useState("")

  const updatePass = async () => {
    try {

      toast({title: "Updating Password"})

      const {data} = await axios.post("/api/users/forgetpass", {token, password: pass})
      
      if (data.success) {
        toast({variant: "default", title: data.message})
        router.push("/login")
      } else {
        toast({title: data.message})
      }

    } catch (err: any) {
      console.log(err)
      toast({title: "Error Occurred"})
    }
  }

  useEffect(() => {
    const tok = window.location.search.split("=")[1]
    setToken(tok || "")
  }, [])

    return (

    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      <Card className="w-[30vw]" >
        <CardHeader>
          <CardTitle className="text-4xl font-bold" >Enter Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2" >
          <div className="space-y-1" >
            <Label htmlFor="email" >Password</Label>
            <Input id="pass" placeholder="Enter Password" type="password" onChange={e => setPass(e.target.value)}  />
          </div>
<div className="space-y-1" >
            <Label htmlFor="email" >Confirm Password</Label>
            <Input id="conpass" placeholder="Confirm Password" type="password" onChange={e => setConf(e.target.value)}  />
          </div>
          <Button className="mt-5" onClick={updatePass} >Update Password</Button>
        </CardContent>
      </Card>
    </div>
  )
}
