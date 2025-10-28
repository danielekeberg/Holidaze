'use client';
import { useEffect, useState } from "react";

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
            } catch(err) {
                setErr(err);
            }
        }
        fetchVenues();
    }, [])
    return (
        <>
            <p>HELLO</p>
            {venues.map((v, i) => (
                <div key={i} className="mb-10 border-b border-black">
                    <p>{v.id}</p>
                    <p>{v.media[0].url ? v.media[0].url : 'none'}</p>
                    <img src={v.media[0].url} className="h-50" />
                </div>
            ))}
        </>
    )
}