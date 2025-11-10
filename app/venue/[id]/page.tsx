import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Venue from "@/app/components/Venue";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20 mx-5 md:mx-70 py-5">
        <Venue />
        <Footer />
      </div>
    </>
  );
}
