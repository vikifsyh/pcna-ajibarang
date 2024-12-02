"use client";
import Image from "next/image";
import React from "react";
import HeroImage from "../../../../public/image/Group 116.png";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <div>
      <div className="w-full h-screen relative flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            alt="PCNA Ajibarang"
            src={HeroImage}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>

        <div className="relative z-10 text-center">
          <div className="max-w-[371px]">
            <h1 className="md:text-[42px] text-2xl font-bold mb-4 leading-tight">
              Selamat Datang di PCNA Ajibarang
            </h1>
            <p className="md:text-lg text-xs md:mb-4 mb-10 tracking-wide leading-relaxed">
              Pimpinan Cabang Nasyiatul Aisiyah Ajibarang
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-2 md:space-y-0">
              <button
                onClick={() => router.push("/program")}
                className="px-4 py-[6px] bg-secondary text-black font-semibold rounded-md hover:bg-secondary-100 transition duration-300"
              >
                Lihat Program
              </button>
              <button
                onClick={() => router.push("https://nasyiah.or.id/Ktna")}
                className="px-4 py-[6px] bg-neutral text-black font-semibold rounded-md hover:bg-secondary-100 transition duration-300"
              >
                Daftar KTNA
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="my-16">
        <p className="text-center text-xl md:text-[32px]">
          Yuk jelajahi <span className="font-bold">PCNA Ajibarang</span>
        </p>
        <div className="flex flex-wrap justify-center md:mt-12 mt-6 space-x-2 space-y-2 md:space-y-0">
          <div className="flex w-full md:w-auto justify-center space-x-1 md:space-x-2">
            <button className="bg-secondary font-semibold px-4 md:py-4 py-2  md:text-base text-xs rounded-md">
              Program Kerja
            </button>
            <button className="bg-secondary font-semibold px-4 md:py-4 py-2 md:text-base text-xs rounded-md">
              Visi & Misi
            </button>
            <button className="bg-secondary font-semibold px-4 md:py-4 py-2 md:text-base text-xs rounded-md">
              Struktur Pengurus
            </button>
          </div>
          <div className="flex w-full md:w-auto justify-center space-x-2 mt-2 md:mt-0">
            <button className="bg-secondary font-semibold px-4 md:py-4 py-2 md:text-base text-xs rounded-md">
              Berita
            </button>
            <button className="bg-secondary font-semibold px-4 md:py-4 py-2 md:text-base text-xs rounded-md">
              Perkaderan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
