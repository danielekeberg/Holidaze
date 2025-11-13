'use client';
import Spinner from "@/app/components/Loading";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function MyProfile() {
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams();
    const { username } = params;
    const [name, setName] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400");
    const [bio, setBio] = useState<string>("");
    const [venueManager, setVenueManager] = useState<boolean>(false);

    useEffect(() => {
        async function fetchUser() {
            const auth = localStorage.getItem("token");
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e'
                    }
                })
                const data = await res.json();
                const settings = data.data;
                setName(settings.name)
                setAvatar(settings.avatar.url)
                setBio(settings.bio)
                setVenueManager(settings.venueManager)
                console.log(data);
            } catch(err) {
                console.error(err);
            }
        }
        fetchUser();
    }, [])

    const handleEdit = async (e: any) => {
        e.preventDefault();
        try {
            const auth = localStorage.getItem("token");
            const res = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth}`,
                    'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bio,
                    venueManager,
                    avatar: {
                        url: avatar
                    }
                })
            })
            const data = await res.json();
            console.log(data);
        } catch(err) {
            console.error(err);
        }
    }

    return(
        <>
            {loading ?
                <div className="flex justify-center items-center h-full">
                    <Spinner />
                </div>
            :
                null
            }
            <div>
                <h1 className="text-2xl font-bold md:hidden">My Trips</h1>
                <form onSubmit={handleEdit}>
                    <div className="flex justify-between mb-5">
                        <div className="grid grid-cols-1 w-[60%]">
                            <div className="flex flex-col gap-1">
                                <label>Username</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border border-neutral-400 p-2 bg-neutral-200 cursor-not-allowed rounded" disabled />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label>Avatar URL</label>
                                <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} className="border border-neutral-400 p-2 bg-white rounded" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <img src={avatar} className="h-50 w-50 rounded bg-neutral-200" />
                        </div>
                    </div>
                    <textarea defaultValue={bio} onChange={(e) => setBio(e.target.value)} className="h-40 bg-white w-full border border-neutral-400 rounded p-2 resize-none" />
                    <div className="flex justify-end mt-2">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-400">Edit Profile</button>
                    </div>
                </form>
            </div>
        </>
    )
}