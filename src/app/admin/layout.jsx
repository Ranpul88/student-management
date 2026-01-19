import Link from "next/link";

export default function AdminLayout({ children }){
    return(
        <div className="w-full h-full flex bg-accent items-center justify-center">
            <div className="w-75 h-full bg-accent flex justify-center p-3">
                <div className="w-full h-full flex flex-col items-center bg-white rounded-4xl pt-4">
                    <div className="w-40 h-30 flex items-center">
                        <img src="/logo.png" alt="logo" className="h-25 pt-4"/>
                        <h2 className="text-xl font-medium text-accent text-center">Admin</h2>
                    </div>
                    <div className="w-full h-[calc(100%-120px)] flex flex-col items-center text-2xl pt-6 gap-2">
                        <Link href="/admin" className="w-30 flex items-center h-12 hover:text-accent">Students</Link>
                        <Link href="/admin/lecturers" className="w-30 flex items-center h-12 hover:text-accent">Lecturers</Link>
                        <Link href="/admin/courses" className="w-30 flex items-center h-12 hover:text-accent">Courses</Link>
                        <Link href="/admin/time-table" className="w-30 flex items-center h-12 hover:text-accent">Time Table</Link>
                    </div>
                </div>
            </div>
            <div className="w-[calc(99%-300px)] h-[98%] p-8 border-4 border-accent bg-primary rounded-4xl overflow-y-auto">
                {children}
            </div>
        </div>
    )
}