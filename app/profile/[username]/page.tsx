import Header from "@/app/components/Header";
import Dashboard from "@/app/components/Dashboard";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-70 h-[80vh]">
        <Dashboard />
      </div>
      <Footer />
    </>
  );
}
