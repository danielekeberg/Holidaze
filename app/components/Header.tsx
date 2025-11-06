'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>();
    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn')
        const username = localStorage.getItem('username')
        setIsLoggedIn(!!loggedIn);
        setUsername(username);
    })
    return (
        <>
            <div className="flex sticky top-0 z-999 justify-between px-[15%] py-5 items-center text-[#1E2A38] bg-white/70 border-b border-neutral-800/20 text-neutral-600 backdrop-blur-sm">
                <Link href="../">
                    <img className="h-10" src="/logo.png" />
                </Link>
                <div className="flex gap-4 items-center font-bold text-sm">
                    <Link href="../" className="hover:text-[#1E2A38] cursor-pointer">Home</Link>
                    <Link href="/properties/displayall" className="hover:text-[#1E2A38] cursor-pointer">Properties</Link>
                </div>
                {isLoggedIn ?
                    <div className="flex gap-4 items-center font-bold text-sm">
                        <Link href={`/profile/${username}`} className="text-white bg-blue-500 p-2 rounded-md">
                            <img src="/user.svg" className="h-5" />
                        </Link>
                        </div>
                        :
                        <div className="flex gap-4 items-center font-bold text-sm">
                        <Link href="/login" className="text-white bg-blue-500 p-2 rounded-md">
                            <p>Sign in</p>
                        </Link>
                    </div>
                }
            </div>
        </>
        
    )
}