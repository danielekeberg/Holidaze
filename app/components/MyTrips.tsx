'use client';
import { useState, useEffect } from "react";
import Spinner from "@/app/components/Loading";
import { useParams } from "next/navigation";
import Link from "next/link";

type Trips = {
    id: string,
    dateFrom: string,
    dateTo: string,
    guests: number,
    updated: string,
    venue: {
        id: string,
        name: string,
        created: string,
        description: string,
        price: number,
        media:[ {
            url: string
        }],
        location: {
            address: string,
            city: string,
            country: string,
            zip: string,
            continent: string
        }
    }
}

export default function MyTrips() {
    const [loading, setLoading] = useState<boolean>(false);
    const [trips, setTrips] = useState<Trips[]>([]);
    const [length, setLength] = useState<number>(1)
    const params = useParams();
    const { username } = params;

    useEffect(() => {
        const auth = localStorage.getItem("token");
        async function fetchTrips() {
            setLoading(true)
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}/bookings?_venue=true`, {
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e'
                    }
                })
                const data = await res.json();
                setTrips(data?.data ?? []);
                console.log(data?.data);
                setLength(data.data.length);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if(username) fetchTrips();
    }, [username])

    const handleClick = async (id: any) => {
        const auth = localStorage.getItem("token");
        try {
            const res = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e'
                }
            })
            const data = await res.json();
            console.log(data);
        } catch(err) {
            console.error(err);
        }
    }

    return(
        <>
            {loading ? 
            <div className="flex justify-center items-center h-full">
                <Spinner />
            </div>
            :
            null}
            <div className="flex flex-col gap-2 md:gap-0">
                <h1 className="text-2xl font-bold md:hidden">My Trips</h1>
                <div className="flex flex-col gap-2 mb-100">
                    {length > 0 ?
                        trips.map((v: Trips, i: number) => (
                            <Link href={`../venue/${v.venue.id}`} key={i} className="grid md:flex border bg-white md:bg-neutral-200/80 hover:bg-neutral-300/80 border-neutral-300/60 pb-2 md:pb-0 rounded-md">
                                <div className="md:w-50 md:h-25 h-50 m-2 border-neutral-300/60">
                                    <img src={v.venue.media?.[0].url} className="h-50 md:h-25 w-full object-fit rounded-md" />
                                </div>
                                <div className="md:flex md:justify-between w-full ml-3">
                                    <div className="text-neutral-600">
                                        <h5 className="text-neutral-900 font-bold text-xl md:text-2xl md:mt-2">{v.venue.name}</h5>
                                        <div>
                                            <div className="flex gap-1 items-center">
                                                <img src="/location.svg" className="h-5" />
                                                <p className="w-80">{v.venue.location.city}, {v.venue.location.country}</p>
                                            </div>
                                            <div>
                                                <p><strong>From:</strong> {new Date(v.dateFrom).toLocaleDateString("no-NO")}</p>
                                                <p><strong>To:</strong> {new Date(v.dateTo).toLocaleDateString("no-NO")}</p>
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
                        <div className="flex justify-center items-center h-full">
                            <p>No trips.</p>    
                        </div>
                    }
                </div>
            </div>
        </>
    )
}