'use client';
import { useState, useEffect,  } from "react";
import { useParams } from "next/navigation";

type Venue = {
    name: string,
    description: string,
    id: string,
    maxGuests: number,
    location: {
        address: string,
        city: string,
        zip: string,
        continent: string,
    },
    owner: {
        name: string,
        email: string,
        bio: string
    },
    price: number,
    rating: number,
    updated: string
}

export default function Edit() {
    const params = useParams();
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
    const { id } = params;
    const [venue, setVenue] = useState<Venue | null>(null);

    useEffect(() => {
        const auth = localStorage.getItem("token");
        async function fetchVenue() {
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`, {
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e'
                    }
                })
                const data = await res.json();
                const vData= data.data;
                console.log(data);
                setVenue(vData);
                setName(vData.name)
                setDesc(vData.description)
                setPrice(vData.price)
                setGuests(vData.maxGuests)
                setImg(vData.media[0].url)
                setWifi(vData.meta.wifi)
                setParking(vData.meta.parking)
                setBreakfast(vData.meta.breakfast)
                setPets(vData.meta.pets)
                setAddress(vData.location.address)
                setCity(vData.location.city)
                setZip(vData.location.zip)
                setCountry(vData.location.country)
                setContinent(vData.location.continent)
            } catch(err) {
                console.error(err);
            }
        }
        fetchVenue();
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const auth = localStorage.getItem("token");
        async function fetchVenue() {
            try {
                const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${auth}`,
                        'X-Noroff-API-Key': 'd937e2e1-dc41-4685-9054-22798ad19d5e',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        description: desc,
                        media: [{
                            url: img
                        }],
                        price,
                        maxGuests: guests,
                        meta: {
                            wifi: wifi,
                            parking: parking,
                            breakfast: breakfast,
                            pets: pets
                        },
                        location: {
                            address: address,
                            city: city,
                            zip: zip,
                            country: country,
                            continent: continent,
                        }
                    })
                })
                const data = await res.json();
                console.log(data);
            } catch(err) {
                console.error(err);
            }
        }
        fetchVenue();
    }

    return(
        <>
            {venue && (
            <div>
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
                            <input type="text" placeholder="Enter venue name" className="border border-neutral-300 rounded-xl p-2" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label>Description</label>
                            <textarea placeholder="Describe your venue..." className="border border-neutral-300 rounded-xl p-2 h-30 resize-none" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col">
                                <label>Price per Night</label>
                                <input type="number" placeholder="$ 0.00" className="border border-neutral-300 rounded-xl p-2" value={venue.price} onChange={(e) => setPrice(Number(e.target.value))} />
                            </div>
                            <div className="flex flex-col">
                                <label>Maximum Guests</label>
                                <input type="number" placeholder="Enter max guests" className="border border-neutral-300 rounded-xl p-2" value={venue.maxGuests} onChange={(e) => setGuests(Number(e.target.value))} />
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
                            <input type="text" placeholder="Upload venue image" className="border border-neutral-300 rounded-xl p-2" value={img} onChange={(e) => setImg(e.target.value)} />
                        </div>
                        <div className="flex gap-3 items-center mb-2 mt-5">
                            <div className="flex justify-center items-center w-7 h-7 rounded-full">
                                <img src="/starblue.svg" />
                            </div>
                            <h5 className="text-2xl font-bold">Amenities</h5>
                        </div>
                        <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
                            <label htmlFor="wifi" className="flex gap-5 items-center border border-neutral-300 p-3 rounded-xl cursor-pointer">
                                <input type="checkbox" className="h-5 w-5 cursor-pointer" id="wifi" checked={wifi} onChange={(e) => setWifi(e.target.checked)} />
                                <img src="/wifi.svg" className="h-5" />
                                <p>WiFi</p>
                            </label>
                            <label htmlFor="parking" className="flex gap-5 items-center border border-neutral-300 p-3 rounded-xl cursor-pointer">
                                <input type="checkbox" className="h-5 w-5 cursor-pointer" id="parking" checked={parking} onChange={(e) => setParking(e.target.checked)} />
                                <img src="/car.svg" className="h-5" />
                                <p>Parking</p>
                            </label>
                            <label htmlFor="breakfast" className="flex gap-5 items-center border border-neutral-300 p-3 rounded-xl cursor-pointer">
                                <input type="checkbox" className="h-5 w-5 cursor-pointer" id="breakfast" checked={breakfast} onChange={(e) => setBreakfast(e.target.checked)} />
                                <img src="/cutlery.svg" className="h-5" />
                                <p>Breakfast</p>
                            </label>
                            <label htmlFor="pets" className="flex gap-5 items-center border border-neutral-300 p-3 rounded-xl cursor-pointer">
                                <input type="checkbox" className="h-5 w-5 cursor-pointer" id="pets" checked={pets} onChange={(e) => setPets(e.target.checked)} />
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
                            <input type="text" placeholder="Enter street address" className="border border-neutral-300 rounded-xl p-2" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col">
                                <label>City</label>
                                <input type="text" placeholder="Enter city" className="border border-neutral-300 rounded-xl p-2" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="flex flex-col">
                                <label>ZIP Code</label>
                                <input type="text" placeholder="Enter ZIP code" className="border border-neutral-300 rounded-xl p-2" value={zip} onChange={(e) => setZip(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div className="flex flex-col">
                                <label>Country</label>
                                <input type="text" placeholder="Enter country" className="border border-neutral-300 rounded-xl p-2" value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                            <div className="flex flex-col">
                                <label>Continent</label>
                                <input type="text" placeholder="Enter continent" className="border border-neutral-300 rounded-xl p-2" value={continent} onChange={(e) => setContinent(e.target.value)} />
                            </div>
                        </div>
                        <div className="pt-10 border-t border-neutral-300 flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white font-bold text-xl py-2 px-5 rounded-md cursor-pointer hover:bg-blue-400">Edit Venue</button>
                        </div>
                    </form>
                </div>
            </div>
            )}
        </>
    )
}