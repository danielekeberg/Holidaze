import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Property from "@/app/components/Property";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20 mx-70 py-5">
        <Property />
      </div>
      <Footer />
    </>
  );
}
