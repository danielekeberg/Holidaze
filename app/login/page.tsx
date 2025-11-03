import Login from "@/app/components/Login";

export default function Home() {
  return (
    <>
      <div className="mx-[15%]">
        <div className="my-5 flex justify-center">
              <div className="w-125">
                  <div className="flex justify-center mb-10">
                      <img src="/logo.png" className="h-10"/>
                  </div>
                  <div className="mb-5">
                      <h1 className="text-2xl">Sign in</h1>
                      <p>Sign in</p>
                  </div>
                  <div>
                      <Login />
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}
