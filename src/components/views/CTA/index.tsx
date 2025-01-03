import Image from "next/image";
import React from "react";
import PCNA from "../../../../public/image/Frame 22.png";
import CTA from "../../../../public/image/file (6) 1.png";
import Link from "next/link";

export default function ClickToAccess() {
  return (
    <>
      <div className="relative md:flex gap-14 bg-primary mt-16 md:mt-[110px] pb-6 md:pb-0 mb-10 md:mb-[70px]">
        <Image src={PCNA} alt="PCNA Ajibarang" />
        <div className="md:text-[42px] text-2xl font-semibold mt-[42px] text-center md:text-left leading-tight">
          <h2 className="text-white text-center ">NASYIATUL AISIYAH</h2>
          <h2 className="text-secondary max-w-[355px]">
            Perempuan Muda Berkemajuan
          </h2>
          <div className="mt-3">
            <svg
              width="112"
              height="6"
              viewBox="0 0 112 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="6" fill="#D9D9D9" />
              <rect x="80" width="32" height="6" fill="#FAE233" />
            </svg>
          </div>
        </div>
      </div>
      <div className="relative flex justify-between mx-5 md:mx-[75px] bg-primary px-1 py-6 rounded-3xl my-10 md:bottom-10 md:mt-0">
        <div className="md:pl-[138px] md:py-[52px] px-10 md:text-left text-center">
          <h2 className="text-2xl md:text-[42px] font-semibold text-white max-w-xl leading-tight">
            Perempuan Bersatu Wujudkan Kemajuan
          </h2>
          <h2 className="text-lg text-white mt-5">
            Hubungi kami untuk informasi seputar PCNA Ajibarang
          </h2>
          <div className="flex items-center gap-2 md:gap-4 mt-5">
            <Link
              href="https://wa.me/6281231272092"
              className="px-3 md:px-4 py-[6px] bg-secondary text-black font-semibold rounded-md hover:bg-secondary-100 transition duration-300"
            >
              Hubungi Kami
            </Link>
            <Link
              href={"https://nasyiah.or.id/Ktna"}
              className="px-3 md:px-4 py-[6px] bg-neutral text-black font-semibold rounded-md hover:bg-secondary-100 transition duration-300"
            >
              Daftar KTNA
            </Link>
          </div>
        </div>
        <div className="absolute right-0 bottom-0">
          <Image src={CTA} alt="PCNA Ajibarang" className="hidden md:block" />
        </div>
      </div>
    </>
  );
}
