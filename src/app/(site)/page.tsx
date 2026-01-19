import { Navbar } from "../../components/landing/Navbar";
import { Banner } from "../../components/landing/Banner";
import { Feature } from "../../components/landing/Feature";
import { Works } from "../../components/landing/Works";
import { Teams } from "../../components/landing/Teams";
import ProfileCard from "../../components/landing/ProfileCard";
import { Admin } from "@/components/landing/Admin";
import { SecondaryBanner } from "@/components/landing/SecondaryBanner";
import Footer from "@/components/landing/Footer";
import ScrollToTopButton from "@/components/ButtomToTopScrolling/ScrollToTopButton";


export type ProfileDataType = {
  name: string;
  title: string;
  description: string;
  img: string;
  socialLinks: {
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
  };
}

type ProfileDataCollection = ProfileDataType[];



const ProfileData: ProfileDataCollection= [
  {
    name: "Nadia Rahman",
    title: "Machine Learning",
    img: "/photos/Profile4.jpg",
    description: "Builds the RAG pipeline, embeddings strategy and reranking for accurate results.",
    socialLinks: {
      facebook: "www.facebook.com",
      linkedin: "www.linkedin.com",
      instagram: "www.instagram.com",
      twitter: "www.twitter.com",
    }
  },
  {
    name: "Sophie Bennett",
    title: "Founder & Product",
    img: "/photos/Profile1.jpg",
    description: "Leads product vision and UX. Focused on student experience and reliability.",
    socialLinks: {
      facebook: "www.facebook.com",
      linkedin: "www.linkedin.com",
      instagram: "www.instagram.com",
      twitter: "www.twitter.com",
    }
  },
  {
    name: "Zahin Chowdhury",
    title: "Backend & Infra",
    img: "/photos/Profile3.jpg",
    description: "APIs, workers, vector DB, scaling and observability to keep things smooth.",
    socialLinks: {
      facebook: "www.facebook.com",
      linkedin: "www.linkedin.com",
      instagram: "www.instagram.com",
      twitter: "www.twitter.com",
    }
  },
  {
    name: "Maya Islam",
    title: "Frontend Lead",
    img: "/photos/Profile2.jpg",
    description: "Crafts the glassmorphism UI, accessibility, and performance across devices.",
    socialLinks: {
      facebook: "www.facebook.com",
      linkedin: "www.linkedin.com",
      instagram: "www.instagram.com",
      twitter: "www.twitter.com",
    }
  },
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 max-w-3xl mx-auto">
          {ProfileData?.map((profile, index) => (
          <div key={index} className={index%2 === 1 ? "md:mt-64" : "mt-0"}>
            <ProfileCard  profile={profile} />
          </div>
        ))}
        </div>
        <Admin/>
        <SecondaryBanner/>
        <ScrollToTopButton/>
      </div>
      <Footer/>
    </main>
  );
}
