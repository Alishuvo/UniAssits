import { Description } from "@/components/common/Description";
import { Headline } from "@/components/common/Headline";
import { Title } from "@/components/common/Title";
import { CiCalendarDate } from "react-icons/ci";
import { FaFile, FaRegFileAlt } from "react-icons/fa";
import {
  FaAlignLeft,
  FaArrowRightLong,
  FaChartArea,
  FaRegFileLines,
} from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { MdOutlineDocumentScanner } from "react-icons/md";

export const Works = () => {
  return (
    <div>
      <div className="flex flex-col gap-10">
        <Title text="How it works" />
        <Headline text="From upload to answer in minutes" />
        <Description text="Collect knowledge from PDFs, notices, images and pages. Deliver fast, cited answers with visuals." />

        <div className="flex flex-col gap-36 mt-20">
          {/* feature1  */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-20">
            <div>
              <div className="relative">
                {/* half circle  */}
                <div className="w-[400px] h-[200px] absolute bg-[#FFE9E9] rounded-b-full -z-10 -bottom-20 -left-20" />
                <div className="flex flex-col justify-center items-center bg-[#F8E0C9] border-30 border-[#FFFFFF80] rounded-xl p-8 shadow-xl">
                  <FaFile className="text-4xl text-[#DC6D18]" />
                  <h1 className="text-2xl">Drag & drop files or</h1>
                  <p className="bg-[#FFF4E4] rounded-lg px-3 py-2 text-center">
                    choose files
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-md">
              <h3 className="text-2xl">Upload</h3>
              <p className="text-[#425466]">
                Upload PDFs, DOCX, PPTX or images — drag & drop or choose files.
              </p>
            </div>
          </div>
          {/* feature2  */}
          <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-12 md:gap-20">
            <div>
              <div className="relative">
                {/* half circle  */}
                <div className="w-[400px] h-[200px] absolute bg-[#F5F7FF] rounded-b-full -z-10 -bottom-32 -left-24" />
                {/* card  */}
                <div className="flex items-center gap-5 bg-[#FFFFFF80] rounded-xl p-8 shadow-xl">
                  <MdOutlineDocumentScanner className="text-[#2F45EE] text-4xl" />
                  <FaArrowRightLong className="text-2xl" />
                  <FaRegFileLines className="text-[#43BF49] text-4xl" />
                  <FaArrowRightLong className="text-2xl" />
                  <FaAlignLeft className="text-[#E08845] text-4xl" />
                  <FaArrowRightLong className="text-2xl" />
                  <FaChartArea className="text-[#C51818] text-4xl" />
                </div>
              </div>
            </div>
            <div className="max-w-md">
              <h3 className="text-2xl">Ingest</h3>
              <p className="text-[#425466]">
                Ingest OCR + parsing + chunking + embeddings. Faculty photos and
                room images are auto‑extracted.
              </p>
            </div>
          </div>
          {/* feature3  */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 md:gap-20">
            <div>
              <div className="relative">
                {/* half circle  */}
                <div className="w-[400px] h-[200px] absolute bg-[#FFF5DA] rounded-b-full -z-10 -bottom-20 -left-20" />
                {/* card  */}
                <div className="flex flex-col gap-3 bg-[#FFFFFF80] rounded-xl p-8 shadow-xl">
                  <div className="flex gap-5 items-center bg-[#F8E0C9] p-3 rounded-xl">
                    <FcDepartment className="text-4xl" />
                    <p>Department: Science</p>
                  </div>
                  <div className="flex gap-5 items-center bg-[#F8E0C9] p-3 rounded-xl">
                    <FaRegFileAlt className="text-4xl" />
                    <p>Page: 12</p>
                  </div>
                  <div className="flex gap-5 items-center bg-[#F8E0C9] p-3 rounded-xl">
                    <CiCalendarDate className="text-4xl" />
                    <p>Date: 2023-10-26</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-md">
              <h3 className="text-2xl">Upload</h3>
              <p className="text-[#425466]">
                Upload PDFs, DOCX, PPTX or images — drag & drop or choose files.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
