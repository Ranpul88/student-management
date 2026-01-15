'use client'

import Loader from '@/app/components/loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function login(){
    setIsLoading(true)
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })

        if(!res.ok){
          toast.error("Login failed! Please check your credentials and try again.")
          setIsLoading(false)
          return
        }

      const data = await res.json()

      if(data.role == "admin"){
        router.push('/admin/students')
        setIsLoading(false)
        toast.success("Login successful!.")
      }else{
        router.push('/')
        setIsLoading(false)
        toast.success("Login successful!.")
      }
    }catch(error){
      console.log("Error during login: ")
      console.log(error)
      toast.error("Login failed! Please check your credentials and try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full h-[calc(100%-100px)] flex justify-center items-center '>
      {isLoading ? <Loader /> : <div className='w-82 h-100 border-3 rounded-3xl p-4 flex flex-col items-center'>
        <h1 className='w-full text-center text-[30px] font-semibold mt-2 mb-10'>Login</h1>
        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter email here...' className='w-[90%] p-1.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-0 mb-2' />
        <input type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter password here...' className='w-[90%] p-1.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-0' />
        <p className='w-[90%] text-right text-[13px] mb-8 mr-1'>Forgot password? <Link href='/forgot-password' className='italic lg:text-secondary text-accent hover:text-accent'>Reset here</Link></p>
        <button onClick={login} disabled={isLoading} className='w-[90%] h-9 border rounded-lg mb-2 bg-accent text-white font-semibold cursor-pointer hover:bg-accent/90'>Login</button>
        <button className='w-[90%] h-9 flex items-center justify-center gap-1 border rounded-lg bg-accent text-white font-semibold cursor-pointer hover:bg-accent/90'>Login with <FaGoogle /></button>
        <p className='w-[90%] text-right text-[13px]'>Don't have an account? <Link href='/auth/register' className='italic text-accent lg:text-secondary hover:text-accent mr-1'>Register here</Link></p>
      </div>}
    </div>
  )
}
