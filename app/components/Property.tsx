'use client';
import { useState, useEffect } from "react";
import {useParams } from "next/navigation";

export default function Property() {
    const [title, setTitle] = useState<string>();
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
                console.log(data.data.name);
                setTitle(data.data.name);
            } catch(err) {
                setErr(err);
            }
        }
        fetchProperty();
    }, [])
    document.title = `Holidaze | ${title}`;
    return(
        <>
            {id}
        </>
    )
}