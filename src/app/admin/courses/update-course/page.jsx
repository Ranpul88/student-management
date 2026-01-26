'use client'

import Loader from "@/app/components/loader";
import {  useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateCourse() {

    const searchParams = useSearchParams();
    const courseName = searchParams.get('courseName');

    const [course, setCourse] = useState([]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/courses/' + courseName, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        })
        .then(res => res.json())
        .then((data) => {
            setCourse(data);
        })
    }, [])

    const type = course.type;
    const department = course.department;
    const [duration, setDuration] = useState(course.duration);
    const [Mode, setMode] = useState(course.mode);
    const [delivery, setDelivery] = useState(course.delivery);
    const [description, setDescription] = useState(course.description);
    const [entryRequirements, setEntryRequirements] = useState(course.entryRequirements);
    const [hallNo, setHallNo] = useState(course.hallNo);
    const [intakes, setIntakes] = useState(course.intakes);
    // const [files, setFiles] = useState([]);
    const [availability, setAvailability] = useState(course.availability);
    const [isLoading, setIsLoading] = useState();

    const router = useRouter();

    async function updateCourse(){
        if(courseName.trim() == "" || department.trim() == "" || duration.trim() == "" || mode.trim() == "" || delivery.trim() == "" || description.trim() == "" || entryRequirements.trim() == "" || intakes.trim() == ""){
        toast.error("Please fill in all required fields.")
        return
        }
        
        setIsLoading(true)

        const modeInArray = mode.split(',')
        const deliveryInArray = delivery.split(',')
        const intakesInArray = intakes.split(',')

        const res = await fetch( process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/courses', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            duration: duration,
            mode: modeInArray,
            delivery: deliveryInArray,
            description: description,
            entryRequirements: entryRequirements,
            hallNo: hallNo,
            intakes: intakesInArray,
            availability: availability
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
                <label className="mb-1 font-medium text-gray-700">Hall No</label>
                <textarea type="text" value={hallNo} onChange={(e) => setHallNo(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
            </div>
            <div className="flex flex-col">
                <label className="flex items-baseline mb-1 font-medium text-gray-700">Intakes<p className="text-sm text-gray-500">(monthes)</p></label>
                <input type="text" value={intakes} onChange={(e) => setIntakes(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            {/* <div className="flex flex-col">
                <label className="flex items-baseline mb-1 font-medium text-gray-700">Course Content</label>
                <input type="file" multiple={true} value={files} onChange={(e) => setFiles(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer" />
            </div> */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Availability</label>
                <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent">
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