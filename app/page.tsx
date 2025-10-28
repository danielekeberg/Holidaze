import Header from "@/app/components/Header";
import Venues from "@/app/components/Venues";
import Hero from "@/app/components/Hero";
import Popular from "@/app/components/Popular";
import Featured from "@/app/components/Featured";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20">
        <Hero />
        <div className="mx-70 flex flex-col gap-20">
        <Popular />
        <Featured />

        <Venues />
        </div>
      </div>
    </>
  );
}
