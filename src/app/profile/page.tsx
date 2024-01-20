"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserData {
  _id: String,
  username: String
}

export default function ProfilePage(){
  const router = useRouter()
  const [data, setData] = useState<UserData | null>(null)


  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast({title: "Logged out succesfully"})
      router.push("/login")
    } catch (error:any) {
      toast({title: error.message, variant: "destructive"})
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me")
      console.log(res.data)
      setData(res.data.data)

    } catch (error:any) {
      toast({title: error.message, variant: "destructive"})
    }
  }

  return (
    <div>
      Profile Page
      <Button className="mt-5" onClick={logout} >Log Out</Button>
      <Button className="mt-5" onClick={getUserDetails} >Get Data</Button>

      {data && <h1>{data?._id} | {data?.username}</h1>}

    </div>
  )
}
