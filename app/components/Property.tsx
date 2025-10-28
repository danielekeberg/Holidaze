'use client';
import { useState, useEffect } from "react";
import {useParams } from "next/navigation";

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

type Meta = {
    breakfast: boolean;
    parking: boolean;
    pets: boolean;
    wifi: boolean;
}

export default function Property() {
    const [venue, setVenue] = useState<Venue | null>(null);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [err, setErr] = useState<any>();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        async function fetchProperty() {
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
                    headers: {
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsZWtlYmVyZyIsImVtYWlsIjoiZGFuZWtlNzUxNjBAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3NjE1OTc2ODN9.OKeXS9-bygAHKddfK5XQyjhjhjeouMqDjTFH3fgsMcU`,
                        "X-Noroff-API-Key": `d937e2e1-dc41-4685-9054-22798ad19d5e`,
                    }
                })
                const data = await res.json();
                const meta = data.data.meta;
                setMeta(meta);
                setVenue(data.data);
            } catch(err) {
                setErr(err);
            }
        }
        fetchProperty();
    }, [id])
    
    if (!venue) {
        return <div>Loading...</div>;
    }

    return(
        <div className="flex flex-col gap-5">
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold">{venue.name}</h1>
                <div className="p-2 border border-neutral-400 rounded-xl flex items-center cursor-pointer hover:bg-blue-500">
                    <img src="/heart.svg" className="h-5" />
                </div>
            </div>
            <div className="flex gap-5 text-neutral-600">
                <div className="flex gap-1">
                    <img src="/star.svg" className="h-5" />
                    <p>{venue.rating}</p>
                </div>
                <div className="flex gap-1">
                    <img src="/location.svg" className="h-5" />
                    <p>{venue.location.city}, {venue.location.country}</p>
                </div>
            </div>
            <div className="flex gap-5 rounded-3xl overflow-hidden h-125">
                <img src={venue.media?.[0]?.url ?? '#'} className="w-1/2 object-cover" />
                <div className="grid grid-cols-2 gap-5">
                    <img src={venue.media?.[0]?.url ?? '#'} className="h-full object-cover"/>
                    <img src={venue.media?.[0]?.url ?? '#'} className="h-full object-cover"/>
                    <img src={venue.media?.[0]?.url ?? '#'} className="h-full object-cover"/>
                    <img src={venue.media?.[0]?.url ?? '#'} className="h-full object-cover"/>
                </div>
            </div>
            <div className="flex gap-10">
                <div className="w-2/3 flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-2xl">About this place</h3>
                        <p className="text-neutral-600">{venue.description}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-2xl">What this place offers</h3>
                        {meta && (
                            <div className="grid grid-cols-3 gap-2">
                                {meta.wifi && (
                                    <div className="flex items-center gap-2 px-5 py-2 border border-neutral-400/60 rounded-xl">
                                        <img src="/wifi.svg" className="h-5" />
                                        <p>WiFi</p>
                                    </div>
                                )}
                                {meta.parking && (
                                    <div className="flex items-center gap-2 px-5 py-2 border border-neutral-400/60 rounded-xl">
                                        <img src="/car.svg" className="h-5" />
                                        <p>Parking Available</p>
                                    </div>
                                )}
                                {meta.pets && (
                                    <div className="flex items-center gap-2 px-5 py-2 border border-neutral-400/60 rounded-xl">
                                        <img src="/pets.svg" className="h-5" />
                                        <p>Pets Allowed</p>
                                    </div>
                                )}
                                {meta.breakfast && (
                                    <div className="flex items-center gap-2 px-5 py-2 border border-neutral-400/60 rounded-xl">
                                        <img src="/cutlery.svg" className="h-5" />
                                        <p>Breakfast</p>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 border px-5 py-2 border-neutral-400/60 rounded-xl">
                                    <img src="/users-blue.svg" className="h-5" />
                                    <p>{venue.maxGuests} Guests</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-1/3 border rounded-xl border-neutral-500/30 p-4">
                    <div className="flex gap-2 items-end mb-5">
                        <h3 className="font-bold text-2xl">${venue.price}</h3>
                        <span className="text-neutral-600">/ night</span>
                    </div>
                    <p className="font-bold text-sm">Select dates</p>
                </div>
            </div>
        </div>
    )
}