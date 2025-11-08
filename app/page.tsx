import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Popular from "@/app/components/Popular";
import Featured from "@/app/components/Featured";
import Footer from "@/app/components/Footer";
import Explore from "@/app/components/Explore";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20">
        <Hero />
        <div className="mx-0 xl:mx-70 mx-5 md:mx-50 flex flex-col gap-20 h-screen">
          <Popular />
          <Featured />
          <Explore />
          <Footer />
        </div>
      </div>
    </>
  );
}
