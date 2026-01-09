'use client'

import Loader from '@/app/components/loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Register() {
  const[firstName, setFirstName] = useState('')
  const[lastName, setLastName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[confirmPassword, setConfirmPassword] = useState('')
  const[isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function register(){
    if(firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){return}

    if(password !== confirmPassword){return}

    setIsLoading(true)

    try {
        await fetch(process.env.BACKEND_URL + '/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
            })
        })

      router.push('/auth/login')
      setIsLoading(false)
      toast.success("register successful!.")

    }catch(error){
      console.log("Error during register: ")
      console.log(error)
      toast.error("Registration failed! Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full h-[calc(100%-100px)] flex justify-center items-center '>
      {isLoading ? <Loader /> : <div className='w-82 h-114 border-3 rounded-3xl p-4 flex flex-col items-center'>
        <h1 className='w-full text-center text-[30px] font-semibold mt-2 mb-8'>Register</h1>
        <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder='Your first name' className='w-[90%] p-1.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-0 mb-2' />
        <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder='Your last name' className='w-[90%] p-1.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-0 mb-2' />
        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Your email' className='w-[90%] p-1.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-0 mb-2' />
        <input type="text"  value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='your password' className='w-[90%] p-1.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-0 mb-2' />
        <input type="text"  value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='confirm your password' className='w-[90%] p-1.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-0 mb-8' />
        <button onClick={register} disabled={isLoading} className='w-[90%] h-9 border rounded-lg  bg-accent text-white font-semibold cursor-pointer hover:bg-accent/90'>Register</button>
        <p className='w-[90%] text-right text-[13px]'>Already have an account? <Link href='/auth/login' className='italic text-accent lg:text-secondary hover:text-accent mr-1'>Login here</Link></p>
      </div>}
    </div>
  )
}
