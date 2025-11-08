import Header from "@/app/components/Header";
import Dashboard from "@/app/components/Dashboard";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-5 md:mx-70 h-[80vh]">
        <Dashboard />
      </div>
    </>
  );
}
