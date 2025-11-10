'use client';
import Login from "@/app/components/Login";
import Register from "@/app/components/Register";
import Header from "@/app/components/Header";
import { useState } from "react";

export default function Home() {
  const [signIn, setSignIn] = useState<string>("signIn");

  const handleToSignIn = () => {
    if(signIn === "signIn") {
      return;
    }
    setSignIn("signIn")
  }
  const handleToSignUp = () => {
    if(signIn === "signUp") {
      return;
    }
    setSignIn("signUp")
  }
  return (
    <>
    <Header />
      <div className="mx-5">
        
        <div className="my-5 flex justify-center">
              <div className="w-125">
                  <div>
                      <div className="bg-blue-100 grid grid-cols-2 rounded-xl mb-3 p-1">
                          <button onClick={handleToSignIn} className={`${signIn === "signIn" ? 'bg-[#ededed] shadow' : ''} rounded-xl cursor-pointer p-2`}>Sign In</button>
                          <button onClick={handleToSignUp} className={`${signIn === "signUp" ? 'bg-[#ededed] shadow' : ''} rounded-xl cursor-pointer p-2`}>Sign Up</button>
                      </div>
                      <div className="md:border border-neutral-300/60 rounded-xl md:p-5">
                          {signIn === "signIn" ? 
                          <>
                            <h1 className="text-2xl font-bold">Welcome back</h1>
                            <p className="text-sm text-neutral-600 mb-5">Sign in to your Holidaze account</p>
                            <Login />
                          </>
                        :
                          <>
                            <h1 className="text-xl font-bold">Create an account</h1>
                            <p className="text-sm text-neutral-600 mb-5">Start your journey with Holidaze</p>
                            <Register />
                          </>
                          }
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}
