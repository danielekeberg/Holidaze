import Link from "next/link";

export default function Explore() {
    return(
        <>
            <div className="bg-blue-500 px-20 py-10 rounded-3xl text-center text-white flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">Ready to start your journey?</h1>
                    <p>Book your perfect vacation venue today and create unforgettable memories</p>
                </div>
                <div className="flex justify-center">
                    <Link href="./properties/displayall">
                        <div className="rounded-md bg-white text-black py-2 px-5 hover:bg-white/60 transition">
                            <p>Explore Now</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}