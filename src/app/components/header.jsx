import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full h-14 text-accent shadow-2xl flex flex-row">
        <img src="./logo.png" alt="logo" className="h-14 object-cover" />
        <div className="w-full flex items-center justify-center gap-6">
            <Link href='/' className="hover:scale-105">Home</Link>
            <Link href='/courses' className="hover:scale-105">Courses</Link>
            <Link href='/about-us' className="hover:scale-105">About Us</Link>
            <Link href='/contact-us' className="hover:scale-105">Contact Us</Link>
        </div>
    </div>
  )
}
