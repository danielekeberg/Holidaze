import Header from "@/app/components/Header";
import Venues from "@/app/components/Venues";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-70">
        <Venues />
      </div>
    </>
  );
}
