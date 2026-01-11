import Header from "../components/header";

export default function publicLayout({ children }){
    return(
        <div className="w-full h-full">
            <Header />
            <div className="w-full h-[calc(100%-56px)]">{children}</div>
        </div>
    )
}