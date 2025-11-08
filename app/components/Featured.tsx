'use client';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Featured() {
    const [venues, setVenues] = useState<any[]>([])
    const [err, setErr] = useState<any>();

    const featuredIds = [
        "b4546e81-b161-4ec2-9dd8-3ae21e7b8279",
        "6947b55e-835c-410c-9046-aeef4d26e99d",
        "b290355a-4212-4e4c-ad8d-3fb19f0647ea",
        "f71b04f0-7fa1-4d24-a064-179d0acd26e4"
    ]

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const res = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
                    headers: {
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsZWtlYmVyZyIsImVtYWlsIjoiZGFuZWtlNzUxNjBAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3NjE1OTc2ODN9.OKeXS9-bygAHKddfK5XQyjhjhjeouMqDjTFH3fgsMcU`,
                        "X-Noroff-API-Key": `d937e2e1-dc41-4685-9054-22798ad19d5e`,
                    }
                })
                const data = await res.json();
                const filtered = data.data.filter((venue: any) => 
                    featuredIds.includes(venue.id)
                );
                setVenues(filtered);
            } catch(err) {
                setErr(err);
            }
        }
        fetchFeatured();
    }, [])
    return(
        <div className="flex justify-center">
            <div>
                <div className="text-center flex flex-col gap-4 mb-10">
                    <h1 className="text-4xl font-bold">Featured Stays</h1>
                    <p className="text-neutral-600">Handpicked properties just for you</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {venues.map((l, i) => (
                        <Link href={`/venue/${l.id}`} key={i} className="rounded-xl overflow-hidden h-50 cursor-pointer relative group">
                            <div>
                                <div className="relative">
                                    <img src={l.media[0].url ? l.media[0].url : '/img-notfound.png'} className="h-75" />
                                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />
                                </div>
                                <div className="absolute left-5 bottom-5">
                                    <h4 className="text-white font-bold text-xlz-1 group-hover:underline">{l.name}</h4>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <Link href="../properties/displayall" className="hover:bg-blue-500 bg-blue-500 md:bg-transparent text-white md:text-black transition p-2 hover:text-white rounded-md">
                        <p className="font-bold">View All Venues</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}