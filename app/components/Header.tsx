'use client';
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>();
    const [venueManager, setVenueManager] = useState<string | null>();
    const [hamburger, setHamburger] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn')
        const username = localStorage.getItem('username')
        setIsLoggedIn(!!loggedIn);
        setUsername(username);

        async function checkIfManager() {
            try {
                const auth = localStorage.getItem("token");
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e',
                    }
                })
                const data = await res.json();
                localStorage.setItem("manager", data.data.venueManager)
                const venueManager = localStorage.getItem("manager");
                setVenueManager(venueManager);
            } catch(err) {
                console.error(err);
            }
        }
        checkIfManager();
    },[])

    const handleLogout = () => {
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        window.location.href = '../login'
    }

    const handleHamburger = () => {
        if(hamburger) {
            return setHamburger(false);
        }
        setHamburger(true);
    }

    return (
        <>
            <div className="flex sticky top-0 z-999 justify-between items-center px-5 md:px-[15%] py-5 items-center text-[#1E2A38] bg-white/70 border-b border-neutral-800/20 text-neutral-600 backdrop-blur-sm">
                <Link href="../" className="hidden md:block">
                    <img className="h-10" src="/logo.png" />
                </Link>
                <div className="flex gap-4 items-center font-bold text-md md:text-sm">
                    <Link href="../" className="hover:text-[#1E2A38] cursor-pointer">Home</Link>
                    <Link href="/properties/displayall" className="hover:text-[#1E2A38] cursor-pointer">Properties</Link>
                </div>
                <div>
                    <button onClick={handleHamburger} className="font-bold cursor-pointer text-3xl md:text-sm">&#9776;</button>
                    <div className="relative">
                        {hamburger ? 
                            <div className="absolute top-0 right-0 bg-white border border-neutral-400/60 w-40 rounded-xl text-center overflow-hidden">
                                {isLoggedIn ? 
                                    <>
                                        <Link href={`../profile/${username}`}>
                                            <p className="cursor-pointer hover:bg-neutral-200 py-2 px-5 border-b border-neutral-300">My Profile</p>
                                        </Link>
                                        {venueManager === "true" ?
                                        <Link href="../create">
                                            <p className="cursor-pointer hover:bg-neutral-200 py-2 px-5 border-b border-neutral-300">Create</p>
                                        </Link>
                                        :
                                        null}
                                        <Link href="">
                                            <p className="cursor-pointer hover:bg-neutral-200 py-2 px-5 border-b border-neutral-300 ">About Us</p>
                                        </Link>
                                        <Link href="">
                                            <p className="cursor-pointer hover:bg-neutral-200 py-2 px-5 border-b border-neutral-300">Contact Us</p>
                                        </Link>
                                        <button onClick={handleLogout} className="cursor-pointer hover:bg-neutral-200 py-2 px-5 w-full">Logout</button>
                                    </>
                                :
                                    <>
                                        <Link href="">
                                            <p className="cursor-pointer hover:bg-neutral-200 py-2 px-5 border-b border-neutral-300">About Us</p>
                                        </Link>
                                        <Link href="">
                                            <p className="cursor-pointer hover:bg-neutral-200 py-2 px-5 border-b border-neutral-300">Contact Us</p>
                                        </Link>
                                        <Link href="../login/">
                                            <p className="cursor-pointer w-full hover:bg-neutral-200 py-2 px-5 border-b border-neutral-300">Login</p>
                                        </Link>
                                    </>
                                }
                            </div>
                        :
                            null
                        }
                    </div>
                    
                </div>
                {/* {isLoggedIn ?
                    <div className="flex gap-4 items-center font-bold text-sm">
                        <div className="flex gap-5">
                            <button onClick={handleLogout} className="cursor-pointer">
                                <img src="/logout.svg" className="h-5" />    
                            </button>
                            <Link href={`/profile/${username}`} className="text-white bg-blue-500 p-2 rounded-md">
                                <img src="/user.svg" className="h-5" />
                            </Link>
                        </div>
                    </div>
                    :
                    <div className="flex gap-4 items-center font-bold text-sm">
                    <Link href="/login" className="text-white bg-blue-500 p-2 rounded-md">
                        <p>Sign in</p>
                    </Link>
                </div>
                } */}
            </div>
        </>
        
    )
}