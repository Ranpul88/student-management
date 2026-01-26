'use client'

import Loader from "@/app/components/loader";
import {  useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpdateCourse() {

    const searchParams = useSearchParams();
    
    const courseName = searchParams.get('courseName');
    const type = searchParams.get('type');
    const department = searchParams.get('department');
    const duration = searchParams.get('duration');
    const mode = searchParams.get('mode');
    const delivery = searchParams.get('delivery');
    const description = searchParams.get('description');
    const entryRequirements = searchParams.get('entryRequirements');
    const intakes = searchParams.get('intakes');
    const availability = searchParams.get('availability');

    const [newDuration, setNewDuration] = useState(duration);
    const [newMode, setNewMode] = useState(mode);
    const [newDelivery, setNewDelivery] = useState(delivery);
    const [newDescription, setNewDescription] = useState(description);
    const [newEntryRequirements, setNewEntryRequirements] = useState(entryRequirements);
    const [newIntakes, setNewIntakes] = useState(intakes);
    const [newAvailability, setNewAvailability] = useState(availability);
    const [isLoading, setIsLoading] = useState();

    const router = useRouter();

    async function updateCourse(){
        if(courseName.trim() == "" || department.trim() == "" || duration.trim() == "" || mode.trim() == "" || delivery.trim() == "" || description.trim() == "" || entryRequirements.trim() == "" || intakes.trim() == ""){
        toast.error("Please fill in all required fields.")
        return
        }
        
        setIsLoading(true)

        const modeInArray = newMode.split(',')
        const deliveryInArray = newDelivery.split(',')
        const intakesInArray = newIntakes.split(',')

        const res = await fetch( process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/courses', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            duration: newDuration,
            mode: modeInArray,
            delivery: deliveryInArray,
            description: newDescription,
            entryRequirements: newEntryRequirements,
            intakes: intakesInArray,
            availability: newAvailability
        })
        });

        if(!res.ok){
        toast.error("Error updating course. Please try again.")
        setIsLoading(false)
        return
        }

        toast.success("Course updated successfully!")
        router.push('/admin/courses');
        setIsLoading(false)
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            {isLoading ? <Loader /> : <div className="w-135 h-170 border-2  p-6 rounded-2xl shadow-lg bg-white overflow-y-scroll">
            <h2 className="text-2xl font-semibold mb-6 text-accent border-b pb-3">Update Course</h2>
            <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Course Name</label>
                <input type="text" disabled={true} value={courseName} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div className="flex flex-col">
                <label className="flex items-baseline mb-1 font-medium text-gray-700">Type<p className="text-sm text-gray-500">(eg: diploma, higher diploma or degree)</p></label>
                <input type="text" disabled={true} value={type} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Department</label>
                <input type="text" disabled={true} value={department} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Duration</label>
                <input type="text" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div className="flex flex-col">
                <label className="flex mb-1 font-medium items-baseline text-gray-700">Mode<p className="text-sm text-gray-500">(eg: part-time or full-time)</p></label>
                <input type="text" value={newMode} onChange={(e) => setNewMode(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div className="flex flex-col">
                <label className="flex mb-1 font-medium items-baseline text-gray-700">Delivery<p className="text-sm text-gray-500">(eg: online, physical or hybrid)</p></label>
                <input type="text" value={newDelivery} onChange={(e) => setNewDelivery(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Description</label>
                <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" name="" id=""></textarea>
            </div>
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Entry Requirements</label>
                <textarea type="text" value={newEntryRequirements} onChange={(e) => setNewEntryRequirements(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
            </div>
            <div className="flex flex-col">
                <label className="flex items-baseline mb-1 font-medium text-gray-700">Intakes<p className="text-sm text-gray-500">(monthes)</p></label>
                <input type="text" value={newIntakes} onChange={(e) => setNewIntakes(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            {/* <div className="flex flex-col">
                <label className="flex items-baseline mb-1 font-medium text-gray-700">Course Content</label>
                <input type="file" multiple={true} value={files} onChange={(e) => setFiles(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer" />
            </div> */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Availability</label>
                <select value={newAvailability} onChange={(e) => setNewAvailability(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button onClick={updateCourse} className="mt-4 bg-accent text-white cursor-pointer px-4 py-2 rounded-md hover:bg-accent/80 transition-colors duration-200">
                Update Course
            </button>

            </div>
            </div>}
        </div>
    )
}