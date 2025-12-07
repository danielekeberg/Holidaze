'use client';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Home() {
  
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20 xl:mx-70 mx-5 md:mx-50 py-5">
        <div className="flex flex-col gap-4 mb-10 min-h-[50vh]">
          <h1 className="text-4xl font-bold">About us</h1>
          <p>At Holidaze, we believe that finding the perfect place to stay or the perfect guest - should be simple, inspiring, and stress-free.</p>
          <p>Holidaze is a booking platform that connects people looking for unique places to stay with hosts who want to share their venues with the world. Wether it's a cozy cabin, a city apartment, or a destination made for unforgettable experiences, Holidaze makes it easy to explore, book, and manage venues in one seamless space.</p>
          <p>For guest, we focus on clarity, trust, and ease - helping you discover and book venues that fit your plans and your style. For venue owners, Holidaze offers a straightforward way to list, manage, and rent out spaces while reacing a wide audience of eager travelers.</p>
          <p>We're passionate about creating meaningful connections between people and places. Holidaze isn't just about booking s- it's about experiences, flexibility, and making every stay feel effortless, wether you're traveling or hosting</p>
          <p>Welcome to HGolidaze - where venues meet possibilities.</p>
        </div>
        <Footer />
      </div>
    </>
  );
}
