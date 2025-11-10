import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Create from "@/app/components/Create";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20 xl:mx-70 mx-5 md:mx-50 py-5">
        <Create />
        <Footer />
      </div>
    </>
  );
}
