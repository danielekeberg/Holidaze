import Header from "@/app/components/Header";
import Properties from "@/app/components/Properties";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col md:mx-70">
        <Properties />
      </div>
    </>
  );
}
