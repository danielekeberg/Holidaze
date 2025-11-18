'use client';
import Link from "next/link";
import { useState } from "react";

export default function Create() {
    const [name, setName] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [guests, setGuests] = useState<number>(0);
    const [img, setImg] = useState<string>("");
    const [wifi, setWifi] = useState<boolean>(false);
    const [parking, setParking] = useState<boolean>(false);
    const [breakfast, setBreakfast] = useState<boolean>(false);
    const [pets, setPets] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [zip, setZip] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [continent, setContinent] = useState<string>("");
    const [id, setId] = useState<string>("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        async function createVenue() {
            const auth = localStorage.getItem('token');
            try {
                const res = await fetch('https://v2.api.noroff.dev/holidaze/venues/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        description: desc,
                        media: [
                            {
                            url: img,
                            alt: `${name}'s image`,
                        }],
                        price: price,
                        maxGuests: guests,
                        meta: {
                            wifi: wifi,
                            parking: parking,
                            breakfast: breakfast,
                            pets: pets,
                        },
                        location: {
                            address: address,
                            city: city,
                            zip: zip,
                            country: country,
                            continent: continent,
                        },
                    })
                })
                const data = await res.json();
                console.log(data);
                console.log(data.id);
                window.location.href = `../venue/${data.data.id}`
            } catch(err) {
                console.error(err);
            }
        }
        createVenue();
    }

    return(
        <div>
            <div>
                <div className="flex gap-3 items-center">
                    <Link href="../">
                        <img src="/arrow-left.svg" className="h-5" />
                    </Link>
                    <h1 className="text-3xl font-bold">Create New Venue</h1>
                </div>
                <p className="text-neutral-700 mb-10 text-center md:text-left">Add your venue details to start hosting guests</p>
            </div>
            <div className="md:border border-neutral-300 rounded-2xl md:p-8">
                <div className="flex gap-3 items-center mb-5">
                    <div className="flex justify-center items-center w-7 h-7 rounded-full">
                            <img src="/info.svg" />
                        </div>
                    <h5 className="text-2xl font-bold">Basic Information</h5>
                </div>
                <form onSubmit={handleSubmit} className="text-neutral-700 flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label>Venue Name</label>
                        <input type="text" placeholder="Enter venue name" className="border border-neutral-300 rounded-xl p-2" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label>Description</label>
                        <textarea placeholder="Describe your venue..." className="border border-neutral-300 rounded-xl p-2 h-30 resize-none" onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col">
                            <label>Price per Night</label>
                            <input type="number" placeholder="$ 0.00" className="border border-neutral-300 rounded-xl p-2" onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                        <div className="flex flex-col">
                            <label>Maximum Guests</label>
                            <input type="number" placeholder="Enter max guests" className="border border-neutral-300 rounded-xl p-2" onChange={(e) => setGuests(Number(e.target.value))} />
                        </div>
                    </div>
                    <div className="flex gap-3 items-center mb-2 mt-5">
                        <div className="flex justify-center items-center w-7 h-7 rounded-full">
                            <img src="/image.svg" />
                        </div>
                        <h5 className="text-2xl font-bold">Venue Image</h5>
                    </div>
                    <div className="flex flex-col">
                        <label>Image URL</label>
                        <input type="text" placeholder="Upload venue image" className="border border-neutral-300 rounded-xl p-2" onChange={(e) => setImg(e.target.value)} />
                    </div>
                    <div className="flex gap-3 items-center mb-2 mt-5">
                        <div className="flex justify-center items-center w-7 h-7 rounded-full">
                            <img src="/starblue.svg" />
                        </div>
                        <h5 className="text-2xl font-bold">Amenities</h5>
                    </div>
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
                        <label htmlFor="wifi" className="flex gap-5 items-center border border-neutral-300 p-3 rounded-xl cursor-pointer">
                            <input type="checkbox" className="h-5 w-5 cursor-pointer" id="wifi" onChange={(e) => setWifi(e.target.checked)} />
                            <img src="/wifi.svg" className="h-5" />
                            <p>WiFi</p>
                        </label>
                        <label htmlFor="parking" className="flex gap-5 items-center border border-neutral-300 p-3 rounded-xl cursor-pointer">
                            <input type="checkbox" className="h-5 w-5 cursor-pointer" id="parking" onChange={(e) => setParking(e.target.checked)} />
                            <img src="/car.svg" className="h-5" />
                            <p>Parking</p>
                        </label>
                        <label htmlFor="breakfast" className="flex gap-5 items-center border border-neutral-300 p-3 rounded-xl cursor-pointer">
                            <input type="checkbox" className="h-5 w-5 cursor-pointer" id="breakfast" onChange={(e) => setBreakfast(e.target.checked)} />
                            <img src="/cutlery.svg" className="h-5" />
                            <p>Breakfast</p>
                        </label>
                        <label htmlFor="pets" className="flex gap-5 items-center border border-neutral-300 p-3 rounded-xl cursor-pointer">
                            <input type="checkbox" className="h-5 w-5 cursor-pointer" id="pets" onChange={(e) => setPets(e.target.checked)} />
                            <img src="/pets.svg" className="h-5" />
                            <p>Pets Allowed</p>
                        </label>
                    </div>
                    <div className="flex gap-3 items-center mb-2 mt-5">
                        <div className="flex justify-center items-center w-7 h-7 rounded-full">
                            <img src="/location4.svg" />
                        </div>
                        <h5 className="text-2xl font-bold">Location</h5>
                    </div>
                    <div className="flex flex-col">
                        <label>Address</label>
                        <input type="text" placeholder="Enter street address" className="border border-neutral-300 rounded-xl p-2" onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col">
                            <label>City</label>
                            <input type="text" placeholder="Enter city" className="border border-neutral-300 rounded-xl p-2" onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label>ZIP Code</label>
                            <input type="text" placeholder="Enter ZIP code" className="border border-neutral-300 rounded-xl p-2" onChange={(e) => setZip(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div className="flex flex-col">
                            <label>Country</label>
                            <input type="text" placeholder="Enter country" className="border border-neutral-300 rounded-xl p-2" onChange={(e) => setCountry(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label>Continent</label>
                            <input type="text" placeholder="Enter continent" className="border border-neutral-300 rounded-xl p-2" onChange={(e) => setContinent(e.target.value)} />
                        </div>
                    </div>
                    <div className="pt-10 border-t border-neutral-300 flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white font-bold text-xl py-2 px-5 rounded-md cursor-pointer hover:bg-blue-400">Create Venue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}