import { Description } from "@/components/common/Description";
import { Headline } from "@/components/common/Headline";
import { BtnGradient } from "@/components/common/ui/buttons/BtnGradient";
import { BtnOutline } from "@/components/common/ui/buttons/BtnOutline";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa6";
import { ImAttachment } from "react-icons/im";

export const Banner = () => {
  return (
    <div className="flex flex-col items-center gap-40 md:flex-row mt-10 mx-20">
      <div className="w-1/2 flex flex-col gap-5">
        <Headline
          text="Your University, One Question away."
          className="text-left"
        />
        <Description
          text="Ask about fees, departments, locations, bus schedules, contacts,
          admissions & more. Upload PDFs and our AI learns automatically — with
          cited answers and relevant images."
          className="text-left"
        />
        <div className="flex gap-5">
          <BtnGradient label="Start Asking" />
          <BtnOutline label="Explore Features" />
        </div>
        <div className="bg-[linear-gradient(91.93deg,#FFF4E4_1.63%,rgba(232,175,127,0.31)_97.99%)] flex gap-5 py-2 items-center border border-white px-5">
          <Image src={"/icons/spark.png"} alt="alt" width={67} height={67} />
          <p>
            <span className="font-bold">Fast answers</span> under 3 seconds, in{" "}
            <span className="font-bold">Bangla or English</span>,{" "}
            <span className="font-semibold">always with sources.</span>
          </p>
        </div>
      </div>
      <div className="w-1/2">
        <div className="bg-[#FCF7F14D] w-[480px] h-[550px]">
          <div className="h-10 w-full bg-[linear-gradient(136.83deg,#FFE5D1_4.45%,#FFB16B_97.83%)] px-5 flex justify-start items-center gap-2">
            <p className="h-5 w-5 rounded-full bg-[#dc6d18]"></p>
            <p className="h-5 w-5 rounded-full bg-[#FCAAAA]"></p>
            <p className="h-5 w-5 rounded-full bg-[#D9D9D9]"></p>
          </div>
          <div className="flex flex-col gap-4 p-4  relative w-[420px] h-[508px]">
            <div className="border border-[#DC6D18] shadow-[5px_9px_23px_0px_#DC6D1882] backdrop-blur-[57px] p-4 rounded absolute -right-20">
              Where is the Accounts Office and when does it open?
            </div>
            <div className=" shadow-[5px_9px_23px_0px_#DC6D1882] backdrop-blur-[57px] flex flex-col gap-3 p-4 border border-[#DC6D18] rounded w-11/12 absolute -left-20 top-3/12">
              <p>
                Accounts Office is in Administration Building, 2nd Floor, Room
                204. Hours: Sun–Thu, 9:00–17:00.
              </p>
              <div className="flex items-center gap-3 p-2 border-2 border-[#DC6D18] border-dashed rounded w-9/12">
                <Image
                  src={"/icons/docs.png"}
                  alt="docs"
                  width={14}
                  height={14}
                  className="w-5 h-5"
                />
                <p>Fees & Accounts Guide — p.3</p>
              </div>
            </div>
            <div className="bg-[#FCF7F14D] border border-[#DC6D18] shadow-[5px_9px_23px_0px_#DC6D1882] backdrop-blur-[57px]  p-4 rounded absolute -right-20 bottom-30">
              Show me the CSE department faculty.
            </div>
            <div className="flex justify-between items-center absolute left-10 bottom-5 bg-[#F8E0C9] w-11/12  p-2 rounded-full">
              <div className="flex items-center gap-2 ms-2">
                <ImAttachment className="text-[#E07522]" />
                <p className="text-transparent bg-clip-text bg-[linear-gradient(136.83deg,#E07522_4.45%,#F8A65D_97.83%)] font-bold ">
                  Ask anything
                </p>
              </div>
              <div className="bg-[linear-gradient(136.83deg,#E07522_4.45%,#F8A65D_97.83%)] p-4 rounded-full">
                <FaArrowUp className="text-white " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
