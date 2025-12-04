import { Description } from "@/components/landing/Description";
import { Headline } from "@/components/landing/Headline";
import { Title } from "@/components/landing/Title";
import { FeatureCard } from "./FeatureCard";
import { MdOutlineHandshake } from "react-icons/md";
import { TbCapture } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { IoLanguageOutline } from "react-icons/io5";

export const Feature = () => {
  return (
    <div>
      <div className="flex flex-col gap-10">
        <Title text="Features" />
        <Headline text="Everything students and staff need in one AI assistant" />
        <Description text="Collect knowledge from PDFs, notices, images and pages. Deliver fast, cited answers with visuals." />
      </div>
      <div className="flex flex-col gap-5">
        {/* section 1  */}
        <div className=" my-10 px-20 flex gap-5  justify-center items-start">
          {/* feature card 1  */}
          <FeatureCard
            icon={<MdOutlineHandshake className="text-2xl" />}
            number="01"
            title="Search that understands"
            description="Ask naturally: “Which floor is CSE?” or “When’s the tuition deadline?” The assistant combines vector search + keyword search for precision."
          />

          {/* feature car 2  */}
          <FeatureCard
            icon={<TbCapture className="text-4xl" />}
            iconStyle="bg-[#1c1b94] p-5"
            containerStyle="w-lg gap-16 border border-[#DC6D18] p-15"
            number="02"
            title="Auto‑learn from uploads"
            description="Admins upload PDFs/DOCX/Images and the system extracts text & images, builds embeddings and keeps versions for you."
          />

          {/* feature card 3  */}
          <FeatureCard
            icon={<CiStar className="text-2xl" />}
            iconStyle="bg-[#16BA6B] p-3"
            number="03"
            title="Search that understands"
            description="Ask naturally: “Which floor is CSE?” or “When’s the tuition deadline?” The assistant combines vector search + keyword search for precision."
          />
        </div>
        {/* section 2  */}
        <div className="container my-10 px-20 flex gap-5  justify-center items-start">
          {/* feature card 1  */}
          <FeatureCard
            icon={<CiCircleInfo className="text-2xl" />}
            iconStyle="bg-[#17C1FF] p-3"
            number="04"
            title="Bangla & English"
            description="Detect language automatically and answer in the user’s preference without switching context."
          />

          {/* feature car 2  */}
          <FeatureCard
            icon={<IoLanguageOutline className="text-4xl" />}
            iconStyle="bg-[#FF5BBD] p-5"
            containerStyle="w-lg gap-16 p-15"
            number="05"
            title="Auto‑learn from uploads"
            description="Admins upload PDFs/DOCX/Images and the system extracts text & images, builds embeddings and keeps versions for you."
          />

          {/* feature card 3  */}
          <FeatureCard
            icon={<CiStar className="text-2xl" />}
            iconStyle="bg-[#16BA6B] p-3"
            number="03"
            title="Search that understands"
            description="Ask naturally: “Which floor is CSE?” or “When’s the tuition deadline?” The assistant combines vector search + keyword search for precision."
          />
        </div>
      </div>
    </div>
  );
};
