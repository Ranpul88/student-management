export default function AdminLayout({ children }){
    return(
        <div className="w-full h-full flex bg-accent items-center justify-center">
            <div className="w-75 h-full bg-accent"></div>
            <div className="w-[calc(99%-300px)] h-[98%] p-8 border-4 border-accent bg-primary rounded-4xl overflow-y-auto">
                {children}
            </div>
        </div>
    )
}