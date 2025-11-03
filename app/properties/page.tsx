import Header from "@/app/components/Header";
import Venues from "@/app/components/Venues";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-70">
        <Venues />
      </div>
      <Footer />
    </>
  );
}
