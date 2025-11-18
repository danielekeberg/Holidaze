'use client';
import { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import GuestSelect from "@/app/components/GuestSelect";
import Edit from "@/app/components/Edit";

type Venue = {
    created: string;
    description: string;
    owner: {
        name: string;
        avatar: {
            url: string;
        }
    };
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

export default function Venue() {
    const [venue, setVenue] = useState<Venue | null>(null);
    const [meta, setMeta] = useState<Meta | null>(null);
    const [err, setErr] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState<any>("");
    const [toDate, setToDate] = useState<any>("");
    const [isLoggedIn, setIsLoggedIn] = useState<any>("");
    const [guests, setGuests] = useState<any>(1);
    const [user, setUser] = useState<any>("");
    const [toggleEdit, setToggleEdit] = useState<boolean>(false);
    const params = useParams();
    const { id } = params;
    const [hamburger, setHamburger] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const loggedIn = localStorage.getItem("loggedIn");
        const username = localStorage.getItem("username");
        setUser(username);
        setIsLoggedIn(loggedIn);
        async function fetchProperty() {
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`, {
                    headers: {
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsZWtlYmVyZyIsImVtYWlsIjoiZGFuZWtlNzUxNjBAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3NjE1OTc2ODN9.OKeXS9-bygAHKddfK5XQyjhjhjeouMqDjTFH3fgsMcU`,
                        "X-Noroff-API-Key": `d937e2e1-dc41-4685-9054-22798ad19d5e`,
                    }
                })
                const data = await res.json();
                const meta = data.data.meta;
                console.log(data);
                setMeta(meta);
                setVenue(data.data);
            } catch(err) {
                setErr(true);
            }
        }
        fetchProperty();
        setLoading(false);
    }, [id])

    const Book = async () => {
        setLoading(true);
        const auth = localStorage.getItem('token');
        try {
            const res = await fetch('https://v2.api.noroff.dev/holidaze/bookings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'X-Noroff-API-Key': `d937e2e1-dc41-4685-9054-22798ad19d5e`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dateFrom: fromDate,
                    dateTo: toDate,
                    guests: Number(guests),
                    venueId: id,
                })
            })
            const data = await res.json();
            console.log(data);
            if(!res.ok) {
                throw new Error(data.errors[0])
            }
            console.log(data); 
        } catch(err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    }

    const deleteVenue = async (e: any) => {
        try {
            const auth = localStorage.getItem('token');
            const user = localStorage.getItem('username');
            console.log(id);
            const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e',
                    'Content-Type': 'application/json',
                }
            })
            window.location.href = `../profile/${user}`;
            const data = await res.json();
            console.log(data);
        } catch(err) {
            console.error(err);
        }
    }

    const handleToggle = () => {
        if(toggleEdit) {
            return setToggleEdit(false);
        }
        setToggleEdit(true);
    }

    const toggleHamburger = () => {
        if(hamburger) {
            return setHamburger(false);
        }
        setHamburger(true);
    }

    const days = fromDate && toDate ? Math.ceil((new Date(toDate).getTime() - new Date(fromDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;
    
    if (!venue) {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    return(
        <div className="flex flex-col gap-5">
            {toggleEdit ?
                <>
                    <div className="flex justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Edit Venue Details</h1>
                            <p className="text-neutral-700 mb-10 text-center md:text-left">Edit your venue details</p>
                        </div>
                        <div>
                            <button onClick={handleToggle} className="cursor-pointer">
                                <img src="/arrow.svg"  className="h-7 w-7 rotate-270" title="Edit venue" />
                            </button>
                        </div>
                    </div>
                    <Edit />
                </>
            :
                null}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{venue.name}</h1>
                {venue.owner.name != user ? 
                null
                :
                <div>
                    <button onClick={toggleHamburger} className="cursor-pointer font-bold" title="Click to open">
                        &#9776;
                    </button>
                    <div className="relative">
                    {hamburger ?
                        <div className="absolute z-9999 top-0 bg-white right-0 border border-neutral-900">
                            <button onClick={() => {
                                handleToggle();
                                toggleHamburger();
                            }} className="w-50 py-2 border-b border-neutral-900 cursor-pointer hover:bg-neutral-200">Edit</button>
                            <button onClick={deleteVenue} className="w-50 py-2 border-neutral-900 cursor-pointer hover:bg-neutral-200">Delete</button>
                        </div>
                    :
                        null
                    }
                    </div>
                </div>}
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
                <img src={venue.media?.[0]?.url ?? '#'} className="object-cover w-full" />
            </div>
            <div className="grid md:flex gap-10">
                <div className="md:w-2/3 flex flex-col gap-10">
                    <div className="flex justify-between border border-neutral-400/50 p-5 rounded-xl items-center">
                        <div className="flex gap-2 md:gap-5 items-center">
                            <div className="bg-blue-100 rounded-full h-12 w-12 items-center justify-center text-xl border border-neutral-400/50 hidden md:flex overflow-hidden">
                                <img src={venue.owner.avatar.url} className="h-full" />
                            </div>
                            <h5 className="font-bold">Hosted by {venue.owner.name}</h5>
                        </div>
                        <div>
                            <Link href={`../profile/${venue.owner.name}`} className="hover:bg-blue-500 bg-blue-500 text-white md:bg-transparent md:text-black p-2 hover:text-white md:p-2 font-bold rounded transition text-center md:text-left">View Profile</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-2xl">About this place</h3>
                        <p className="text-neutral-600">{venue.description}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold text-2xl">What this place offers</h3>
                        {meta && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-bold">
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
                <div className="md:w-1/3 border rounded-xl border-neutral-500/30 p-4 h-full">
                    <div className="flex gap-2 items-end mb-5">
                        <h3 className="font-bold text-2xl">${venue.price}</h3>
                        <span className="text-neutral-600">/ night</span>
                    </div>
                    <div className="flex flex-col justify-between h-[85%]">
                        {isLoggedIn ?
                        <>
                        <div>
                            <p className="font-bold text-sm">Select dates</p>
                            <div className="flex flex-col gap-5 py-5">
                                <div>
                                    <p className="font-bold">From:</p>
                                    <input className="border rounded-md border-neutral-400/50 w-[95%] md:w-full p-2" type="date" id="fromDate" onChange={(e) => setFromDate(e.target.value)} />
                                </div>
                                <div>
                                    <p className="font-bold">To:</p>
                                    <input className="border rounded-md border-neutral-400/50 w-[95%] md:w-full p-2" type="date" id="toDate" onChange={(e) => setToDate(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <p>Guests</p>
                                <select
                                value={guests} 
                                onChange={(e) => setGuests(e.target.value)}
                                className="w-full border rounded-md border-neutral-400/50 p-2 mb-5">
                                <GuestSelect maxGuests={venue.maxGuests} />
                                </select>
                            </div>
                        </div>
                        
                        <button onClick={Book} className="bg-blue-500 p-2 rounded-md w-full cursor-pointer text-white font-bold">Book Now</button>
                        <div className="mt-5 text-neutral-500">
                            <div>
                                <div className="flex justify-end text-black font-bold">
                                    <p>Total</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>${venue.price} x {days} {days === 1 ? 'night': 'nights'}</p>
                                    <p>${venue.price * (days + 1)}</p>
                                </div>
                            </div>
                        </div>
                        </>
                        :
                        <Link href="../login">
                            <p className="text-center bg-blue-500 text-white py-2 px-5 rounded-md cursor-pointer hover:bg-blue-400">Login to Book Venue</p>
                        </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}