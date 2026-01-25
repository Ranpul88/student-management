'use client'

import Loader from "@/app/components/loader";
import { is } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminStudentPage() { 
  
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(res =>{
      if(!res.ok){
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data)=>{
      setCourses(data)
      setIsLoading(false)
    })
    .catch(err=>{
      console.log(err)
      toast.error('Failed to fetch courses')
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="h-full bg-linear-to-br from-primary via-white to-blue-50 pt-2 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">Courses Directory</h1>
          <p className="text-gray-600">View all courses</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* Stats Bar */}
              <div className="bg-linear-to-r from-accent to-blue-600 px-6 py-4">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="text-sm font-medium opacity-90">Total Courses</p>
                    <p className="text-2xl font-bold">{courses.length}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Course Name
                      </th>
                      
                      <th className="px-5 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Mode
                      </th>
                      <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Delivery
                      </th>
                      <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Intakes
                      </th>
                      <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course, index) => (
                      <tr 
                        key={index}
                        className="hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <p className="text-sm font-medium text-secondary">{course.courseName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-center font-medium text-gray-900">{course.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-center font-medium text-gray-900">{course.duration}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-center font-medium text-gray-900">{course.delivery.join('/')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-center font-medium text-gray-900">{course.mode.join('/')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-center font-medium text-gray-900">{course.intakes.join('/')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white flex justify-center gap-2">
                            <Link href={{pathname:"/admin/courses/update-course",
                              query: {
                                courseName: course.courseName,
                                type: course.type,
                                department: course.department,
                                duration: course.duration,
                                mode: course.mode.join(','),
                                delivery: course.delivery.join(','),
                                description: course.description,
                                entryRequirements: course.entryRequirements,
                                intakes: course.intakes.join(','),
                                availability: course.availability,
                              }}}
                              className="px-2 py-1 rounded-md bg-accent hover:bg-accent/80">
                              Edit
                            </Link>
                            <button className="border px-2 py-1 bg-red-600 rounded-md hover:bg-red-500 cursor-pointer">
                              Block
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {courses.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No lecturers found</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding a new lecturer.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Link href="/admin/add-course" className="w-17 h-17 bg-accent fixed bottom-8 right-12 rounded-full text-white text-5xl text-center items-center justify-center flex hover:bg-accent/80 cursor-pointer pb-2">+</Link>
    </div>
  )
}