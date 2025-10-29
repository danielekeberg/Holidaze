'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Dashboard() {
    const [profile, setProfile] = useState<any>([]);
    const [err, setErr] = useState<any>("NO error yet :)");
    const params = useParams();
    const { username } = params;

    useEffect(() => {
        const auth = localStorage.getItem('token');
        async function fetchUser() {
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'X-Noroff-API-key': 'd937e2e1-dc41-4685-9054-22798ad19d5e'
                    }
                })
                const data = await res.json();
                const test = data.data.name;
                console.log(test)
                console.log(data.data);
                setProfile(data.data);
            } catch(err) {
                setErr(err);
            }
        }
        fetchUser();
    },[])
    console.log(err);
    return(
        <>
            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="font-bold text-3xl mt-10">My Dashboard</h1>
                    <p className="text-neutral-600">Manage your trips and favorites</p>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-5 border border-neutral-300/60 rounded-md p-5 w-1/4">
                        <div className="flex justify-center">
                            <div className="h-20 w-20 bg-blue-100 rounded-full flex justify-center items-center text-3xl">
                                {profile?.name?.[0].toUpperCase()}
                            </div>
                        </div>
                        <div className="text-center">
                            <h5 className="text-xl font-[400]">{profile.name}</h5>
                            <p className="text-sm text-neutral-600">{profile.email}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-3 items-center bg-blue-500 p-2 rounded-md text-white text-sm font-[500] cursor-pointer">
                                <img src="/cal-white.svg" className="h-5" />
                                <p>My Trips</p>
                            </div>
                            <div className="flex gap-3 p-2 rounded-md text-sm font-[500] cursor-pointer">
                                <img src="/calendar.svg" className="h-5" />
                                <p>Saved</p>
                            </div>
                            <div className="flex gap-3 p-2 rounded-md text-sm font-[500] cursor-pointer">
                                <img src="/calendar.svg" className="h-5" />
                                <p>Profile</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border border-black rounded-md">
                        <p>Hello</p>
                    </div>
                </div>
            </div>
        </>
        
    )
}