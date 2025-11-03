'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Booking() {
    const params = useParams();
    const { id } = params;
    const [fromDate, setFromDate] = useState<any>("1");
    const [toDate, setToDate] = useState<any>("2");

    async function Book() {
        const test = new Date();
        console.log(test);
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
                    guests: 2,
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
        }
    }

    return(
        <>
            <p className="font-bold text-sm">Select dates</p>
            <input type="date" id="fromDate" onChange={(e) => setFromDate(e.target.value)} />
            <input type="date" id="toDate" onChange={(e) => setToDate(e.target.value)} />
            <p>{fromDate}</p>
            <p>{toDate}</p>
            <p>VENUE ID: {id}</p>
            <button onClick={Book} className="bg-blue-500 p-2 rounded-md w-full cursor-pointer text-white">CLICK</button>
        </>
    )
}