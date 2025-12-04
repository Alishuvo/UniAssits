import { Navbar } from "./landing/Navbar";
import { Banner } from "./landing/Banner";
import { Feature } from "./landing/Feature";
import { Works } from "./landing/Works";
import { Teams } from "./landing/Teams";

export default function Home() {
  return (
    <main>
      <div className="bg-[#FFF4E4] text-center py-2 mt-5 w-full">
        <p>Welcome to UniAssists</p>
      </div>
      <Navbar />
      <div className="flex flex-col gap-20">
        <Banner />
        <Feature />
        <Works />
        <Teams/>
      </div>
    </main>
  );
}
