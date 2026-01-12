'use client'

import Loader from "@/app/components/loader";
import { useEffect, useState } from "react";

export default function AdminStudentPage() { 
  
  const [lecturers, setLecturers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const res = fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/lecturers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data)=>{
      setLecturers(data)
      setIsLoading(false)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-primary via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">Lecturers Directory</h1>
          <p className="text-gray-600">View all registered lecturers</p>
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
                    <p className="text-sm font-medium opacity-90">Total Lecturers</p>
                    <p className="text-2xl font-bold">{lecturers.length}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
                        User ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        First Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Last Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Courses
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lecturers.map((lecturer) => (
                      <tr 
                        key={lecturer.userID}
                        className="hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="shrink-0 h-10 w-10 bg-linear-to-br from-accent to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {lecturer.firstName?.charAt(0)}{lecturer.lastName?.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-secondary">{lecturer.userID}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lecturer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{lecturer.firstName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{lecturer.lastName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-accent">
                            {lecturer.coursesTeaching || 0} Courses
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {lecturers.length === 0 && (
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
    </div>
  )
}