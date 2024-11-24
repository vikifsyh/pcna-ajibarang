import React from "react";
import ImageCTA from "../../../../public/image/Frame 161.png";
import Image from "next/image";

export default function CTA() {
  return (
    <div className="relative md:flex gap-14 bg-primary mt-10 md:mt-[110px] py-6  md:py-0 mb-10 md:mb-[70px] px-5 md:px-20">
      <Image src={ImageCTA} alt="PCNA Ajibarang" className="hidden md:block" />
      <div className="mt-0 md:mt-[42px] ">
        <h2 className="text-white text-center md:text-left md:text-[42px] text-2xl font-semibold leading-tight">
          NASYIATUL AISIYAH
        </h2>
        <h2 className="text-secondary text-center md:text-left  max-w-[355px] md:text-[42px] text-2xl font-semibold leading-tight">
          Perempuan Muda Berkemajuan
        </h2>
        <div className="mt-3 flex justify-center md:justify-start">
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
        <div className="flex items-center md:justify-start justify-center gap-2 md:gap-4 mt-5">
          <button className="px-3 md:px-4 py-[6px] bg-secondary text-black font-semibold rounded-md hover:bg-secondary-100 transition duration-300">
            Hubungi Kami
          </button>
          <button className="px-3 md:px-4 py-[6px] bg-neutral text-black font-semibold rounded-md hover:bg-secondary-100 transition duration-300">
            Daftar KTAN
          </button>
        </div>
      </div>
    </div>
  );
}
