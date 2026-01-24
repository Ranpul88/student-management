import { Calendar, Clock, FileText, MapPin } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

export default function EventEditButton(props) {
    
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(props.event.eventTitle);
    const [time, setTime] = useState(props.event.time);
    const [location, setLocation] = useState(props.event.location);
    const [description, setDescription] = useState(props.event.description);
    const [disable, setDisable] = useState(true);

    async function updateEvent() {

        if(title.trim() === '' || time.trim() === '' || location.trim() === '') {
            toast.error("Please fill in all required fields (Title, Time, Location).");
            return;
        }

        setDisable(true);

        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/events', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventID: props.event.eventID, eventTitle: title, description: description, date: props.event.date, time: time, location: location })
        })
        
        if(!res.ok){
            toast.error("Error updating event. Please try again.")
            return
        }
 
        toast.success("Event updated successfully!")
        props.reload()
    }

  return (
    <>
    {showModal ?<div className="h-full w-full fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        
            <div className="bg-linear-to-r from-accent to-[#0096db] p-6 relative">
            <button
                onClick={()=>{setShowModal(false)}}
                className="absolute top-3 right-2 p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                aria-label="Close modal"
            >
                <IoMdClose className="w-5 h-5  text-white" />
            </button>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-6 h-6" />

            </h3>
            </div>

            <div className="p-6 space-y-5">
            <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                Event Title
                </label>
                <input
                type="text"
                value={title}
                onChange={(e) => {setTitle(e.target.value), setDisable(false)}}
                placeholder="Enter event name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-all duration-200 text-secondary"
                />
            </div>

            <div>
                <label className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Time
                </label>
                <input
                type="time"
                value={time}
                onChange={(e) => {setTime(e.target.value), setDisable(false)}}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-all duration-200 text-secondary"
                />
            </div>

            <div>
                <label className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                Location
                </label>
                <input
                type="text"
                value={location}
                onChange={(e) => {setLocation(e.target.value), setDisable(false)}}
                placeholder="Where will it be held?"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-all duration-200 text-secondary"
                />
            </div>

            <div>
                <label className="text-sm font-semibold text-secondary mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                Description
                </label>
                <textarea
                value={description}
                onChange={(e) =>{setDescription(e.target.value), setDisable(false)}}
                placeholder="Add event details..."
                rows="3"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent focus:outline-none transition-all duration-200 resize-none text-secondary"
                />
            </div>

            <div className="flex gap-3 pt-2">
                <button
                onClick={() =>{setShowModal(false)}}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-secondary font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                Cancel
                </button>
                <button
                // onClick={handleSubmit}
                disabled={disable}
                onClick={updateEvent}
                className={`flex-1 px-6 py-3 rounded-xl text-white font-semibold  ${disable ? 'bg-accent/80 hover:cursor-not-allowed' : 'bg-linear-to-r from-accent to-[#0096db] hover:shadow-lg hover:scale-105 transition-all duration-200'}`}
                >
                Update changes
                </button>
            </div>
            </div>
        </div>
    </div> :
    <button onClick={()=>setShowModal(true)} className="px-2 py-1 rounded-md bg-accent hover:bg-accent/80">
        Edit
    </button>}
    </>
  )
}
