'use client'

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if(error === 'unauthorized'){
      toast.error("You are not authorized to access that page.")
    }
  }, [error])

  return (
    <div className="w-full h-full text-secondary ">
      Home Page
    </div>
  );
}
