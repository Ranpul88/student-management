import React, { useState } from 'react';
import { Calendar, Clock, MapPin, FileText } from 'lucide-react';
import { IoMdClose } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ModernCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    location: '',
    description: ''
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    
    const dateKey = clickedDate.toISOString().split('T')[0];
    if (events[dateKey]) {
      setFormData(events[dateKey]);
    } else {
      setFormData({ title: '', time: '', location: '', description: '' });
    }
    
    setShowModal(true);
  };

  const handleSubmit = () => {
    // const dateKey = selectedDate.toISOString().split('T')[0];
    
    // if (formData.title || formData.time || formData.location || formData.description) {
    //   setEvents({ ...events, [dateKey]: formData });
    // } else {
    //   const newEvents = { ...events };
    //   delete newEvents[dateKey];
    //   setEvents(newEvents);
    // }
    
    // setShowModal(false);
    // setFormData({ title: '', time: '', location: '', description: '' });
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ title: '', time: '', location: '', description: '' });
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const hasEvent = (day) => {
    const dateKey = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toISOString().split('T')[0];
    return events[dateKey] && (events[dateKey].title || events[dateKey].time);
  };

  return (
    <div className="h-full bg-primary pb-4">
      <div className="w-75 h-full mx-auto">
        {/* Calendar Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-accent to-[#0096db] p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                aria-label="Previous month"
              >
                <FaChevronLeft className="text-white" />
              </button>
              
              <h2 className="text-2xl text-white pb-1">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                aria-label="Next month"
              >
                <FaChevronRight className="text-white" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-secodary/60 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2">
              {[...Array(firstDay)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isTodayDate = isToday(day);
                const hasEventDate = hasEvent(day);
                
                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square rounded-xl text-sm flex flex-col items-center justify-center relative transition-all duration-100 hover:border
                      ${isTodayDate 
                        ? 'bg-linear-to-br from-accent to-[#0096db] text-white shadow-lg' 
                        : hasEventDate
                        ? 'bg-accent/10 text-secondary border border-accent/30'
                        : 'bg-primary text-secondary hover:bg-accent/5'
                      }`}
                  >
                    <span className="font-semibold">{day}</span>
                    {hasEventDate && (
                      <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isTodayDate ? 'bg-white' : 'bg-accent'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Event Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              {/* Modal Header */}
              <div className="bg-linear-to-r from-accent to-[#0096db] p-6 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-2 p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                  aria-label="Close modal"
                >
                  <IoMdClose className="w-5 h-5  text-white" />
                  {/* <X className="w-5 h-5 text-white" /> */}
                </button>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  {selectedDate && selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-5">
                {/* Event Title */}
                <div>
                  <label className="block text-sm font-semibold text-secondary mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter event name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-all duration-200 text-secondary"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-all duration-200 text-secondary"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Where will it be held?"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-all duration-200 text-seconary"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Add event details..."
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-all duration-200 resize-none text-secondary"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-secondary font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 rounded-xl bg-linear-to-r from-accent to-[#0096db] text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}