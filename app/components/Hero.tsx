'use client';
import { useState } from "react";

export default function Hero() {
    const [s, setS] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        window.location.href = `./properties/${s}`;
    }
    return(
        <div className="relative h-[600px] flex items-center jusitfy-center overflow-hidden">
            <div className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(https://i.ibb.co/zWPkCF8w/hero-beach.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-white/40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15" />
                </div>
            </div>
            <div className="relative flex flex-col z-10 h-full w-full items-center justify-center">
                <div className="text-center px-4 w-full mb-8">
                    <h1 className="text-2xl md:text-6xl text-white font-extrabold text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)] mb-3">Find your next adventure</h1>
                    <h1 className="text-md md:text-2xl text-white text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">Discover amazing places to stay around the world</h1>
                </div>
                <form className="bg-white flex gap-5 p-5 rounded-xl border border-neutral-800/30 justify-center items-center" onSubmit={handleSubmit}>
                    <div className="border-r border-neutral-800/30 px-2 md:w-100">
                        <p className="text-sm mb-2 mx-1 text-neutral-600 font-bold">Location</p>
                        <div className="flex gap-2 items-center">
                            <img src="/location.svg" className="h-5" />
                            <input type="text" placeholder="Where are you going?" onChange={(e) => setS(e.target.value)} className="outline-none w-full" />
                        </div>
                    </div>
                    <button type="submit" className="flex gap-2 bg-blue-500 px-4 py-2 rounded-xl text-white cursor-pointer">
                        <img src="/search.svg" className="h-5" />
                        <p className="text-sm font-bold">Search</p>
                    </button>
                </form>
            </div>
            
        </div>
    )
}