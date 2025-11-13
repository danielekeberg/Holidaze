'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Spinner from "@/app/components/Loading";

type Venue = {
    maxGuests: number,
    id: string,
    name: string,
    price: number,
    location: {
        city: string,
        country: string,
    }
    media: [{
        url: string,
        alt: string,
    }]
}

export default function MyVenues() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const params = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const { username } = params;
    useEffect(() => {
        setLoading(true);
        const auth = localStorage.getItem('token');
        if(!auth) {
            return;
        }
        async function fetchVenues() {
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}/venues`, {
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e',
                    }
                })
                const data = await res.json();
                const venue = data.data;
                console.log(venue);
                setVenues(venue);
                if(!res.ok) {
                    throw new Error(data.errors[0])
                }
            } catch(err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchVenues();
    }, []);

    venues.forEach((id) => {
        console.log(id);
    }, [])

    return(
        <>  
            {loading ?
                <div className="flex items-center justify-center h-full">
                    <Spinner />
                </div>
            :
                null
            }
            <div className="flex flex-col gap-2 md:gap-0">
                <h1 className="text-2xl font-bold md:hidden">My Trips</h1>
                <div className="flex flex-col gap-2">
                    {venues.length > 0 ? 
                        venues.map((v: Venue, i: number) => (
                            <Link href={`../venue/${v.id}`} key={i} className="grid md:flex border bg-white md:bg-neutral-200/80 hover:bg-neutral-300/80 border-neutral-300/60 pb-2 md:pb-0 rounded-md">
                                <div className="md:w-50 md:h-25 h-50 m-2 border-neutral-300/60">
                                    <img src={v.media[0].url} className="h-50 md:h-25 w-full object-fit rounded-md" />
                                </div>
                                <div className="md:flex md:justify-between w-full ml-3">
                                    <div className="text-neutral-600">
                                        <h5 className="text-neutral-900 font-bold text-xl md:text-2xl md:mt-2">{v.name}</h5>
                                        <div className="flex justify-between md:block w-[92%]">
                                            <div className="gap-1 items-center flex">
                                                <img src="/location.svg" className="h-5" />
                                                <p>{v.location.city}, {v.location.country}</p>
                                            </div>
                                            <div>
                                                <p>${v.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="items-center hidden md:flex">
                                        <button className="bg-blue-500 text-white rounded-xl py-2 px-5 mx-5 cursor-pointer hover:bg-blue-400">View Details</button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    : 
                        <div className="flex items-center justify-center h-full">
                            <p>No venues.</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}