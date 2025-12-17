import { ProfileDataType } from "@/app/(site)/page";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

type Props = { profile: ProfileDataType };

const ProfileCard = ({
  profile: { img, name, title, description, socialLinks },
}: Props) => {
  return (
    <div className="flex flex-col gap-5 items-center shadow-xl w-[320px] bg-[#F8E0C9] rounded-lg p-2 ">
      <div className="">
        <Image
          src={img}
          alt="profile"
          height={280}
          width={300}
          className="w-[300px] h-[280px] object-center rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2 p-2 justify-center items-center text-center ">
        <h1 className="text-[#2B1A12]">{name}</h1>
        <h1 className="text-[#DC6D18]">{title}</h1>
        <p className="text-[#2B1A12]">{description}</p>
        <div className="flex gap-3 items-center">
          <Link target="_blank" href={socialLinks?.facebook}>
            <FaFacebook className="text-xl" />
          </Link>
          <Link target="_blank" href={socialLinks?.linkedin}>
            <FaLinkedin className="text-xl" />
          </Link>
          <Link target="_blank" href={socialLinks?.instagram}>
            <FaInstagram className="text-xl" />
          </Link>
          <Link target="_blank" href={socialLinks?.twitter}>
            <FaTwitter className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
