'use client';
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Spinner from "@/app/components/Loading";

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
    _count: {
        bookings: number;
    }
}

const PAGE_SIZE = 20;

export default function Venues() {
    const [loading, setLoading] = useState(true);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [sortBy, setSortBy] = useState("popular");
    const [err, setErr] = useState<any>();
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const params = useParams();
    const { search } = params;
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchVenues() {
            try {
                const res = await fetch(`${search === "displayall" ? 'https://v2.api.noroff.dev/holidaze/venues/' : `https://v2.api.noroff.dev/holidaze/venues/search?q=${search}`}`, {
                    headers: {
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsZWtlYmVyZyIsImVtYWlsIjoiZGFuZWtlNzUxNjBAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3NjE1OTc2ODN9.OKeXS9-bygAHKddfK5XQyjhjhjeouMqDjTFH3fgsMcU`,
                        "X-Noroff-API-Key": "d937e2e1-dc41-4685-9054-22798ad19d5e",
                    }
                });
                const data = await res.json();
                const venues = data.data;
                setVenues(venues);
                if(data.meta.isLastPage === true) {
                    setHasMore(false);
                }
                setLoading(false);
            } catch(err) {
                setErr(err);
            }
        }
        fetchVenues();
    }, []);

    const displayedVenues = useMemo(() => {
        const q = query.trim().toLowerCase();
        const filtered = q
        ? venues.filter((p) => {
            const t = p.name.toLowerCase();
            const d = p.description.toLowerCase();
            return t.includes(q) || d.includes(q);
        })
        : venues;
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return b._count?.bookings - a._count?.bookings;
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'rated':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
        return sorted;
    }, [venues, query, sortBy]);

    return (
        <>
            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="font-bold text-3xl mt-10">Explore Properties</h1>
                    <p className="text-neutral-600">Find your perfect vacation rental</p>
                </div>
                <div className="flex gap-10">
                    <select 
                        id="popular"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-neutral-300 p-2 cursor-pointer"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="rated">Highest Rated</option>
                    </select>
                    <select 
                        id="popular"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-neutral-300 p-2 cursor-pointer"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="rated">Highest Rated</option>
                    </select>
                    <select 
                        id="popular"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-neutral-300 p-2 cursor-pointer"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="rated">Highest Rated</option>
                    </select>
                </div>
                {loading ?
                    <div className="w-full">
                        <Spinner />
                    </div>
                    :
                    ''
                }
                <div className="grid grid-cols-3 gap-5">
                    {displayedVenues.map((v, i) => (
                        <Link href={`../venue/${v.id}`} key={i} className="rounded-md overflow-hidden shadow group">
                            <div>
                                <img src={v.media[0]?.url} className="h-50 w-full object-cover transition duration-300 group-hover:scale-105" />
                            </div>
                            <div className="p-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h5 className="w-2/3 font-bold">{v.name}</h5>
                                        <div className="flex items-center gap-1">
                                            <img src="/star.svg" className="h-5" />
                                            <p className="font-bold">{v.rating}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 items-center mt-2">
                                        <img src="/location.svg" className="h-5" />
                                        <p className="text-neutral-600">{v.location.city ? v.location.city : 'City'}, {v.location.country ? v.location.country : 'Country'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 items-center mt-2">
                                    <h1 className="text-xl font-bold">${v.price}</h1>
                                    <span className="text-neutral-600">/ night</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {hasMore && (
                    <div className="flex justify-center mb-10">
                        <button className="p-2 bg-blue-500 text-white rounded-md w-1/3 cursor-pointer">Load more</button>
                    </div>
                )}
            </div>
        </>
    )
}