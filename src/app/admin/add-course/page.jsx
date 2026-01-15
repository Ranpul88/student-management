'use client'

import Loader from "@/app/components/loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function addCourse() {

  const [courseName, setCourseName] = useState('');
  const [type, setType] = useState('');
  const [department, setDepartment] = useState('');
  const [duration, setDuration] = useState('');
  const [mode, setMode] = useState('');
  const [delivery, setDelivery] = useState('');
  const [description, setDescription] = useState('');
  const [entryRequirements, setEntryRequirements] = useState('');
  const [intakes, setIntakes] = useState('');
  const [files, setFiles] = useState([]);
  const [availability, setAvailability] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function addCourse(){
    if(courseName.trim() == "" || department.trim() == "" || duration.trim() == "" || mode.trim() == "" || delivery.trim() == "" || description.trim() == "" || entryRequirements.trim() == "" || intakes.trim() == ""){
      toast.error("Please fill in all required fields.")
      return
    }
    
    setIsLoading(true)

    const res = await fetch( process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courseName: courseName,
        type: type,
        department: department,
        duration: duration,
        mode: mode,
        delivery: delivery,
        description: description,
        entryRequirements: entryRequirements,
        intakes: intakes,
        availability: availability
      })
    });

    if(!res.ok){
      toast.error("Error adding course. Please try again.")
      setIsLoading(false)
      return
    }

    toast.success("Course added successfully!")
    setCourseName('')
    setType('')
    setDepartment('')
    setDuration('')
    setMode('')
    setDelivery('')
    setDescription('')
    setEntryRequirements('')
    setIntakes('')
    setFiles([])
    setAvailability(true)
    router.push('/admin/courses');
    setIsLoading(false)
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
        {isLoading ? <Loader /> : <div className="w-135 h-170 border-2  p-6 rounded-2xl shadow-lg bg-white overflow-y-scroll">
        <h2 className="text-2xl font-semibold mb-6 text-accent border-b pb-3">Add New Course</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Course Name</label>
            <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="flex flex-col">
            <label className="flex items-baseline mb-1 font-medium text-gray-700">Type<p className="text-sm text-gray-500">(eg: diploma, higher diploma or degree)</p></label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Department</label>
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Duration</label>
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="flex flex-col">
            <label className="flex mb-1 font-medium items-baseline text-gray-700">Mode<p className="text-sm text-gray-500">(eg: part-time or full-time)</p></label>
            <input type="text" value={mode} onChange={(e) => setMode(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="flex flex-col">
            <label className="flex mb-1 font-medium items-baseline text-gray-700">Delivery<p className="text-sm text-gray-500">(eg: online, physical or hybrid)</p></label>
            <input type="text" value={delivery} onChange={(e) => setDelivery(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" name="" id=""></textarea>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Entry Requirements</label>
            <textarea type="text" value={entryRequirements} onChange={(e) => setEntryRequirements(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
          </div>
          <div className="flex flex-col">
            <label className="flex items-baseline mb-1 font-medium text-gray-700">Intakes<p className="text-sm text-gray-500">(monthes)</p></label>
            <input type="text" value={intakes} onChange={(e) => setIntakes(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="flex flex-col">
            <label className="flex items-baseline mb-1 font-medium text-gray-700">Course Content</label>
            <input type="file" multiple={true} value={files} onChange={(e) => setFiles(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer" />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Availability</label>
            <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
          </div>
          <button onClick={addCourse} className="mt-4 bg-accent text-white cursor-pointer px-4 py-2 rounded-md hover:bg-accent/80 transition-colors duration-200">
            Add Course
          </button>

        </div>
        </div>}
    </div>
  )
}
