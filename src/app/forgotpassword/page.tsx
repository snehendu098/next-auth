"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React, {useState} from "react";


export default function Forgot () {

  const [email, setEmail] = useState("")

  const emailHandler = async () => {
  try {
      const res = await axios.post("/api/users/forgetpass/sendemail", {email})
      if (res.data.success) {
        toast({title: res?.data?.message})
      } else {
        toast ({
          variant: "destructive", title: res.data.message
        })
      }
    } catch (error:any) {
      toast({variant: "destructive", title: "Error Occurred"})
    }
  }

  return ( <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      <Card className="w-[30vw]" >
        <CardHeader>
          <CardTitle className="text-4xl font-bold" >Enter Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2" >
          <div className="space-y-2" >
            <Label htmlFor="email" >Email</Label>
            <Input id="email" placeholder="johndoe@john.com" type="email" onChange={(e) => setEmail(e.target.value)}  />
          </div>
          <Button className="mt-6" onClick={emailHandler} >Send Email</Button>
        </CardContent>
      </Card>
    </div>
)
}


