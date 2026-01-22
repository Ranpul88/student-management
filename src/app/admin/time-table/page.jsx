'use client'

import ModernCalendar from "@/app/components/calendar";
import Loader from "@/app/components/loader";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TimeTable() { 
  
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const res = fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data)=>{
      setEvents(data)
      setIsLoading(false)
    })
    .catch(err => console.log(err))
  }, [isLoading])

  return (
    <div className="h-full bg-linear-to-br from-primary via-white to-blue-50 pt-2 px-8">
      <div className="max-w-7xl mx-auto pb-6">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-secondary mb-2">Time Table</h1>
          <p className="text-gray-600">View all lecture and event times</p>
        </div>

        <div className="w-full flex items-center justify-center py-6">
            <ModernCalendar events={events} reload={()=>{setIsLoading(true)}} />
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
                    <p className="text-sm font-medium opacity-90">Today's Time Table</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event, index) => (
                      <tr 
                        key={index}
                        className="hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                      >
                        <td className="px-5 py-4 whitespace-nowrap">
                            <div className="">
                              <p className="text-sm font-medium text-secondary">{event.date}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{event.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{event.eventTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{event.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{event.description}</div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="text-sm text-white flex gap-2">
                            <Link href='/' className="px-2 py-1 rounded-md bg-accent hover:bg-accent/80">
                              Edit
                            </Link>
                            <button className="border px-2 py-1 bg-red-600 rounded-md hover:bg-red-500 cursor-pointer">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {events.length === 0 && (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding a new event.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}