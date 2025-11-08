import Link from "next/link";

export default function Footer() {
    const now = new Date();
    const year = now.getFullYear();
    return(
        <>
            <div className="grid md:grid-cols-4 grid-cols-1 text-neutral-600 gap-5">
                <div className="flex flex-col md:gap-5">
                    <h5 className="text-black font-bold">Holidaze</h5>
                    <p className="text-sm">Your trusted partner for vacation venues worldwide</p>
                </div>
                <div className="flex flex-col gap-5">
                    <h5 className="text-black font-bold">Company</h5>
                    <div className="text-sm">
                        <Link href="" className="hover:text-blue-500 transition">
                            <p>About Us</p>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h5 className="text-black font-bold">Support</h5>
                    <div className="text-sm">
                        <Link href="" className="hover:text-blue-500 transition">
                            <p>Contact Us</p>
                        </Link>
                        <Link href="" className="hover:text-blue-500 transition">
                            <p>Privacy Policy</p>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h5 className="text-black font-bold">Hosting</h5>
                    <div className="text-sm">
                        <Link href="" className="hover:text-blue-500 transition">
                            <p>List Your Venue</p>
                        </Link>
                    </div>
                </div>
                
            </div>
            <div className="pb-5 text-center text-neutral-600 text-sm">
                <p>&copy; Holidaze {year}</p>
            </div>
        </>
    )
}