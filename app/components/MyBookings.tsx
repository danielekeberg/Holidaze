'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Booking = {
    guests: number,
    id: string
}

export default function MyBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const params = useParams();
    const { username } = params;
    useEffect(() => {
        const auth = localStorage.getItem('token');
        async function fetchBookings() {
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}/bookings`, {
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e',
                    }
                })
                const data = await res.json();
                const book = data.data;
                setBookings(book);
                if(!res.ok) {
                    throw new Error(data.errors[0])
                }
            } catch(err) {
                console.log(err);
            }
        }
        fetchBookings();
    }, []);

    console.log(bookings)
    return(
        <>
            {bookings.map((b: Booking, i: number) => (
                <div key={i}>
                    <p>{b.id}</p>
                </div>
            ))}
        </>
    )
}