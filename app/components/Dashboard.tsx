'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MyVenues from '@/app/components/MyVenues';

export default function Dashboard() {
    const [profile, setProfile] = useState<any>([]);
    const [err, setErr] = useState<any>("NO error yet :)");
    const params = useParams();
    const { username } = params;
    const [isManager, setIsManager] = useState<boolean>(false);
    

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
                setProfile(data.data);
                setIsManager(data.data.venueManager);
            } catch(err) {
                setErr(err);
            }
        }
        fetchUser();
    },[])



    const updateManager = (e: any) => {
        e.preventDefault();
        if(isManager) return;
        async function setManager() {
            const auth = localStorage.getItem('token');
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'Content-Type': 'application/json',
                        'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e'
                    },
                    body: JSON.stringify({ venueManager: true })
                })
                const data = await res.json();
                console.log(data);
            } catch(err) {
                console.error(err);
            }
        }
        setManager();
    }

    console.log(err);
    return(
        <>
            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="font-bold text-3xl mt-10">My Dashboard</h1>
                    <p className="text-neutral-600">Manage your trips and favorites</p>
                </div>
                <div className="grid grid-cols-1 gap-5 md:flex">
                    <div className="flex flex-col gap-5 border border-neutral-300/60 rounded-md md:w-1/4 p-5 h-100">
                        <div className="flex justify-center">
                            <div className="h-20 w-20 bg-blue-100 rounded-full flex justify-center items-center text-3xl">
                                {profile?.name?.[0].toUpperCase()}
                            </div>
                        </div>
                        <div className="text-center">
                            <h5 className="text-xl font-normal">{profile.name}</h5>
                            <p className="text-sm text-neutral-600">{profile.email}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-3 p-2 rounded-md text-sm font-medium cursor-pointer">
                                <img src="/calendar.svg" className="h-5" />
                                <p>Trips</p>
                            </div>
                            <div className="flex gap-3 items-center bg-blue-500 p-2 rounded-md text-white text-sm font-medium cursor-pointer">
                                <img src="/cal-white.svg" className="h-5" />
                                <p>Venues</p>
                            </div>
                            <div className="flex gap-3 p-2 rounded-md text-sm font-medium cursor-pointer">
                                <img src="/calendar.svg" className="h-5" />
                                <p>Profile</p>
                            </div>
                            <button className="flex gap-3 p-2 rounded-md text-sm font-medium cursor-pointer">
                                <img src="/calendar.svg" className="h-5" />
                                <p onClick={updateManager}>Venue Manager</p>
                            </button>
                        </div>
                    </div>
                    <div className="border border-neutral-300/60 rounded-md md:w-full min-h-100">
                        <MyVenues />
                    </div>
                    
                </div>
            </div>
        </>
        
    )
}