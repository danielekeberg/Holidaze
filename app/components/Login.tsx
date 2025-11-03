'use client';
import { useEffect, useState, FormEvent } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [err, setErr] = useState<any>();

    async function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const res = await fetch('https://v2.api.noroff.dev/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: psw,
                })
            })
            const data = await res.json();
            if(!res.ok) {
                console.log("lol")
                return;
            }
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('token', data.data.accessToken);
            localStorage.setItem('username', data.data.name);
            window.location.href = '../';
        } catch(err) {
            setErr(err);
        }
    }

    return (
        <>
            <form onSubmit={login} className="flex flex-col gap-5">
                <div className="relative">
                    <input className="peer w-full border border-neutral-500 rounded pt-5 pb-1 px-2" placeholder=" " type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email" className="absolute left-2 text-neutral-900 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">Email</label>
                </div>
                <div className="relative">
                    <input className="peer w-full border border-neutral-500 rounded pt-5 pb-1 px-2" placeholder=" " type="password" id="password" onChange={(e) => setPsw(e.target.value)} />
                    <label htmlFor="password" className="absolute left-2 text-neutral-900 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">Password</label>
                </div>
                <button type="submit" className="bg-blue-500 py-2 rounded text-white font-bold cursor-pointer">Login</button>
            </form>
        </>
    )
}