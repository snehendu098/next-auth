"use client"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Link from "next/link"
import React, {useState, useEffect} from "react"

export default function VerufyEmailPage() {
  

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {token})
      setVerified(true)
    } catch (err:any) {
      setError(true)
      console.log(err.response.data)
    }
  }

  useEffect(()=>{
    const tok = window.location.search.split("=")[1]
    setToken(tok || "")
  }, [])

  useEffect(()=>{
    if(token.length > 0) verifyUserEmail()
  },[token])

  return <div>
    <h1 className="text-4xl my-5" >Verify Token</h1>
    <p>{token? `${token}` : "no token found" }</p>
    {verified && <Button asChild className="my-5" ><Link href={"/login"} >Log In</Link></Button>}
    {error && <p>Error</p>}
  </div>

}
