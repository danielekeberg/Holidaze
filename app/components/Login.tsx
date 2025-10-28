'use client';
import { useEffect, useState, FormEvent } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    return (
        <div className="my-5 flex justify-center">
            <div className="w-125">
                <div className="flex justify-center mb-10">
                    <img src="/logo.png" className="h-10"/>
                </div>
                <div className="mb-5">
                    <h1 className="text-2xl">Logg på eller lag en konto</h1>
                    <p>Få tilgang til en verden av reiser med én konto på tvers av Expedia, Hotels-com og Vrbo.</p>
                </div>
                <div>
                    <form className="flex flex-col gap-5">
                        <div className="relative">
                            <input className="peer w-full border border-neutral-500 rounded pt-5 pb-1 px-2" placeholder=" " type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email" className="absolute left-2 text-neutral-900 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">Email</label>
                        </div>
                        <div className="relative">
                            <input className="peer w-full border border-neutral-500 rounded pt-5 pb-1 px-2" placeholder=" " type="password" id="password" onChange={(e) => setPsw(e.target.value)} />
                            <label htmlFor="password" className="absolute left-2 text-neutral-900 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-neutral-600 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs">Password</label>
                        </div>
                        <button className="bg-blue-500 py-2 rounded text-white font-bold">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}