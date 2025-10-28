import Link from "next/link";

export default function Header() {
    return (
        <>
            <div className="flex sticky top-0 z-999 justify-between px-[15%] py-5 items-center text-[#1E2A38] bg-white/70 border-b border-neutral-800/20 text-neutral-600 backdrop-blur-sm">
                <Link href="../">
                    <img className="h-10" src="/logo.png" />
                </Link>
                <div className="flex gap-4 items-center font-bold text-sm">
                    <Link href="../" className="text-[#1E2A38] cursor-pointer">Home</Link>
                    <p className="hover:text-[#1E2A38] cursor-pointer">Properties</p>
                </div>
                <div className="flex gap-4 items-center font-bold text-sm">
                    <p>Home</p>
                    <Link href="/login" className="text-white bg-blue-500 p-2 rounded-md">Sign In</Link>
                </div>
            </div>
        </>
        
    )
}