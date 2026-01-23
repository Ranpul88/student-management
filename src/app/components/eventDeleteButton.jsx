import { useState } from "react"
import toast from "react-hot-toast"

export default function EventDeleteButton(props) {
  
    const [messageOpen, setMessageOpen] = useState(false)

    async function deleteEvent(){
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/events', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventID: props.eventID })
        })
        
        if(!res.ok){
            toast.error("Error deleting event. Please try again.")
            return
        }
 
        toast.success("Event deleted successfully!")
        props.reload()
    }
  
    return (
    <>
    {messageOpen ?
        <div className="bg-black/60 fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-md h-60 bg-white rounded-md border flex items-center flex-col justify-center p-4 relative">
                <div className="w-6 h-6 bg-red-600 rounded-full pb-0.5 absolute -top-6 -right-6 flex justify-center items-center cursor-pointer hover:bg-red-700" onClick={()=>{setMessageOpen(false)}}>
                 x
                </div>  
                <p className="text-lg font-semibold mb-8 text-secondary">Are you sure you want to delete this event?</p>
                <div className="flex justify-center items-center">
                    <button onClick={()=>{setMessageOpen(false)}} className="border px-3 py-2 bg-gray-600 rounded-md hover:bg-gray-500 cursor-pointer mr-2">
                        Cancel
                    </button>
                    <button onClick={deleteEvent} className="border px-3 py-2 bg-red-600 rounded-md hover:bg-red-500 cursor-pointer">
                        Delete
                    </button>
                </div>
            </div>
        </div>
     :
     <button onClick={()=>{setMessageOpen(true)}} className="border px-2 py-1 bg-red-600 rounded-md hover:bg-red-500 cursor-pointer">
        Delete
    </button>}
    </>
  )
}
