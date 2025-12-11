import { Navbar } from "../../components/landing/Navbar";
import { Banner } from "../../components/landing/Banner";
import { Feature } from "../../components/landing/Feature";
import { Works } from "../../components/landing/Works";
import { Teams } from "../../components/landing/Teams";
import ProfileCard from "../../components/landing/ProfileCard";

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
        <ProfileCard />
      </div>
    </main>
  );
}
