'use client';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Create from "@/app/components/Create";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn')
    setIsLoggedIn(!!loggedIn)
  },[])
  
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20 xl:mx-70 mx-5 md:mx-50 py-5">
        {isLoggedIn ?
        <Create />
        :
        <p className="h-[60vh]">Access denied</p>
        }
        <Footer />
      </div>
    </>
  );
}
