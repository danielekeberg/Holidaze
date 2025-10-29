'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

type Venue = {
    created: string;
    description: string;
    id: string | number;
    maxGuests: number;
    location: {
        city: string;
        address: string;
        continent: string;
        country: string;
        lat: number;
        lng: number;
        zip: string;
    };
    media: any;
    meta: {
        breakfast: boolean;
        parking: boolean;
        pets: boolean;
        wifi: boolean;
    };
    name: string;
    price: number;
    rating: number;
    updated: string;
}

export default function Venues() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [err, setErr] = useState<any>();

    useEffect(() => {
        async function fetchVenues() {
            try {
                const res = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
                    headers: {
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsZWtlYmVyZyIsImVtYWlsIjoiZGFuZWtlNzUxNjBAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3NjE1OTc2ODN9.OKeXS9-bygAHKddfK5XQyjhjhjeouMqDjTFH3fgsMcU`,
                        "X-Noroff-API-Key": "d937e2e1-dc41-4685-9054-22798ad19d5e",
                    }
                });
                const data = await res.json();
                const venues = data.data;
                setVenues(venues);
                console.log(venues);
            } catch(err) {
                setErr(err);
            }
        }
        fetchVenues();
    }, [])
    return (
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="font-bold text-3xl mt-10">Explore Properties</h1>
                <p className="text-neutral-600">Find your perfect vacation rental</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
                {venues.map((v, i) => (
                    <Link href={`../venue/${v.id}`} key={i} className="rounded-md overflow-hidden shadow">
                        <div>
                            <img src={v.media[0]?.url} className="h-50 w-full object-cover" />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between">
                                <h5 className="w-2/3 font-bold">{v.name}</h5>
                                <div className="flex items-center gap-1">
                                    <img src="/star.svg" className="h-5" />
                                    <p className="font-bold">{v.rating}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center mt-2">
                                <img src="/location.svg" className="h-5" />
                                <p className="text-neutral-600">{v.location.city}, {v.location.country}</p>
                            </div>
                            <div className="flex gap-2 items-center mt-2">
                                <h1 className="text-xl font-bold">${v.price}</h1>
                                <span className="text-neutral-600">/ night</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}