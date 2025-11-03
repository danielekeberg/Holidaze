'use client';
import { useState, FormEvent } from "react";

export default function Register() {
    const [name, setName] = useState<string | null>();
    const [email, setEmail] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();
    const [err, setErr] = useState<any>();

    async function registerUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const res = await fetch('https://v2.api.noroff.dev/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.errors[0]);
            }
            window.location.href = '../login';
        } catch(err) {
            setErr(err);
        }
    }

    return(
        <>
            {err ?
                <p className="absolute top-10 right-10 p-2 border border-red-500 rounded-md bg-red-400 text-white">Error</p>
                :
                null}
            <form onSubmit={registerUser} className="flex flex-col gap-5">
                <div className="relative">
                    <input className="peer w-full border border-neutral-500 rounded pt-5 pb-1 px-2" placeholder=" " type="text" id="username" onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="email" className="absolute left-2 text-neutral-900 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">Username</label>
                </div>
                <div className="relative">
                    <input className="peer w-full border border-neutral-500 rounded pt-5 pb-1 px-2" placeholder=" " type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email" className="absolute left-2 text-neutral-900 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">Email</label>
                </div>
                <div className="relative">
                    <input className="peer w-full border border-neutral-500 rounded pt-5 pb-1 px-2" placeholder=" " type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password" className="absolute left-2 text-neutral-900 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">Password</label>
                </div>
                <button type="submit" className="bg-blue-500 py-2 rounded text-white font-bold cursor-pointer">Register</button>
            </form>
        </>
    )
}