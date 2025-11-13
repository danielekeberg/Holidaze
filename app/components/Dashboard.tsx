'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MyVenues from '@/app/components/MyVenues';
import MyTrips from "@/app/components/MyTrips";
import MyProfile from "@/app/components/MyProfile";

export default function Dashboard() {
    const [profile, setProfile] = useState<any>([]);
    const [err, setErr] = useState<any>("");
    const params = useParams();
    const { username } = params;
    const [isManager, setIsManager] = useState<boolean>(false);
    const [displayed, setDisplayed] = useState<string>("MyTrips");    

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
                console.log(data)
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

    const handleTrips = () => {
        setDisplayed('MyTrips');
    }
    const handleVenues = () => {
        setDisplayed('MyVenues');
    }
    const handleProfile = () => {
        setDisplayed('MyProfile');
    }
    return(
        <>
            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="font-bold text-3xl mt-10">My Dashboard</h1>
                    <p className="text-neutral-600">Manage your trips and favorites</p>
                </div>
                <div className="grid grid-cols-1 gap-5 md:flex h-100">
                    <div className="flex flex-col gap-5 border border-neutral-300/60 rounded-md md:w-1/4 p-5 min-h-120 bg-white">
                        <div className="flex justify-center">
                            <div className="h-20 w-20 bg-blue-100 rounded-full flex justify-center items-center text-3xl overflow-hidden">
                                <img src={profile.avatar?.url} className="h-full" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h5 className="text-xl font-normal">{profile.name}</h5>
                            <p className="text-sm text-neutral-600">{profile.email}</p>
                            <div className="flex justify-center">
                                <p className="bg-neutral-200 text-sm font-bold py-2 px-3 border border-neutral-300/60 rounded-md mt-2">Venue Manager: {profile.venueManager ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="bg-neutral-200 rounded-md border border-neutral-300 min-h-15 max-h-20 text-left p-2 mt-3 overflow-y-auto">
                                <p>{profile.bio}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <button onClick={handleTrips} className={`flex gap-3 p-2 rounded-md text-sm font-medium cursor-pointer hover:bg-blue-500 hover:text-white ${displayed === "MyTrips" ? 'bg-blue-500 text-white' : null}`}>
                                <img src="/calendar.svg" className="h-5" />
                                <p>Trips</p>
                            </button>
                            <button onClick={handleVenues} className={`flex gap-3 p-2 rounded-md text-sm font-medium cursor-pointer hover:bg-blue-500 hover:text-white ${displayed === "MyVenues" ? 'bg-blue-500 text-white' : null}`}>
                                <img src="/calendar.svg" className="h-5" />
                                <p>Venues</p>
                            </button>
                            <button onClick={handleProfile} className={`flex gap-3 p-2 rounded-md text-sm font-medium cursor-pointer hover:bg-blue-500 hover:text-white ${displayed === "MyProfile" ? 'bg-blue-500 text-white' : null}`}>
                                <img src="/calendar.svg" className="h-5" />
                                <p>Profile Settings</p>
                            </button>
                        </div>
                    </div>
                    <div className="rounded-md md:w-full">
                        {displayed === "MyVenues" ?
                        <MyVenues />
                        :
                        null}
                        {displayed === "MyTrips" ?
                        <MyTrips />
                        :
                        null}
                        {displayed === "MyProfile" ?
                        <MyProfile />
                        :
                        null}
                    </div>
                </div>
            </div>
        </>
        
    )
}