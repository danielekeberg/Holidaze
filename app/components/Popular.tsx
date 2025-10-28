'use client';
import { useState, useEffect } from "react";
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

export default function Popular() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [err, setErr] = useState<any>();

    useEffect(() => {
        async function fetchDest() {
            try {
                const res = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsZWtlYmVyZyIsImVtYWlsIjoiZGFuZWtlNzUxNjBAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3NjE1OTc2ODN9.OKeXS9-bygAHKddfK5XQyjhjhjeouMqDjTFH3fgsMcU`,
                        'X-Noroff-API-Key': `d937e2e1-dc41-4685-9054-22798ad19d5e`,
                    }
                })
                const data = await res.json();
                const test = data.data;
                const sortByRating = [...test].toSorted((a, b) => b._count.bookings - a._count.bookings)
                sortByRating.splice(3);
                console.log(sortByRating);
                setVenues(sortByRating)
            } catch(err) {
                setErr(err);
            }
        }
        fetchDest();
    }, [])
    return(
        <div className="flex justify-center">
            <div>
                <div className="text-center flex flex-col gap-4 mb-10">
                    <h1 className="text-4xl font-bold">Popular Destination</h1>
                    <p className="text-neutral-600">Explore our most loved locations</p>
                </div>
                <div className="flex gap-10">
                    {venues.map((l, i) => (
                        <Link href={`/venue/${l.id}`} key={i} className="rounded-xl overflow-hidden h-60 w-1/3 cursor-pointer relative">
                            <div>
                            <div className="relative">
                                <img src={l.media[0].url ? l.media[0].url : '/img-notfound.png'} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 to-black/80" />
                            </div>
                            <div className="absolute left-5 bottom-5">
                                <h4 className="text-white font-bold text-xlz-1">{l.name}</h4>
                            </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}