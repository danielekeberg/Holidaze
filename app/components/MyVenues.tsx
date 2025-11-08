'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
    const { username } = params;
    useEffect(() => {
        const auth = localStorage.getItem('token');
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
            }
        }
        fetchVenues();
    }, []);

    venues.forEach((id) => {
        console.log(id);
    }, [])

    return(
        <>
            {venues ? 
                venues.map((v: Venue, i: number) => (
                    <Link href={`../venue/${v.id}`} key={i} className="grid md:flex md:items-center border m-2 bg-neutral-100 border-neutral-300/60 md:p-2 rounded-xl">
                        <div className="md:w-50 h-50 m-2 border-neutral-300/60">
                            <img src={v.media[0].url} className="h-50 w-full object-fit rounded-md" />
                        </div>
                        <div className="md:flex md:justify-between w-full ml-3">
                            <div className="text-neutral-600">
                                <h5 className="text-neutral-900 font-bold text-xl">{v.name}</h5>
                                <div className="gap-1 items-center hidden md:flex">
                                    <img src="/location.svg" className="h-5" />
                                    <p>{v.location.city}, {v.location.country}</p>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-1 mb-5">
                                    <p>{v.location.city}, {v.location.country}</p>
                                    <p className="text-right w-[85%]">${v.price}</p>
                                </div>
                            </div>
                            <div className="items-center hidden md:flex">
                                <button className="bg-blue-500 text-white rounded-xl py-2 px-5 cursor-pointer hover:bg-blue-400">View Details</button>
                            </div>
                        </div>
                    </Link>
                ))
            : 
                <div>
                    <p className="text-black">HEllo</p>
                </div>
            }
        </>
    )
}