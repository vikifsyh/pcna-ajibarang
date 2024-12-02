"use client";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CommandLineIcon,
  HeartIcon,
  IdentificationIcon,
  MegaphoneIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React from "react";

const programs = [
  {
    id: 1,
    title: "Pendidikan",
    icon: <BookOpenIcon className="w-10 h-10" />,
  },
  {
    id: 2,
    title: "Ekonomi",
    icon: <PresentationChartBarIcon className="w-10 h-10" />,
  },
  {
    id: 3,
    title: "Dakwah",
    icon: <MegaphoneIcon className="w-10 h-10" />,
  },
  {
    id: 4,
    title: "Organisasi",
    icon: <ChatBubbleLeftRightIcon className="w-10 h-10" />,
  },
  {
    id: 5,
    title: "Kesehatan",
    icon: <HeartIcon className="w-10 h-10" />,
  },
  {
    id: 6,
    title: "Perkaderan",
    icon: <IdentificationIcon className="w-10 h-10" />,
  },
  {
    id: 7,
    title: "Pusindi",
    icon: <CommandLineIcon className="w-10 h-10" />,
  },
];

export default function Program() {
  const router = useRouter();
  return (
    <div className="bg-primary">
      <div className="mx-5 md:mx-20 py-20">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-2">Program Kerja</h1>
          <p className="text-white mb-10">
            Bersama kembangkan potensi perempuan muda berlandaskan nilai-nilai
            Islam
          </p>
        </div>
        {/* Baris pertama: Card 1, 2, 3, 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.slice(0, 4).map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-md text-center p-6"
            >
              <div className="text-secondary-100 text-4xl mb-4 flex justify-center">
                {program.icon}
              </div>
              <h2 className=" text-xl font-semibold mb-4">{program.title}</h2>
              <button
                onClick={() => router.push("/program")}
                className="bg-secondary-100  py-2 px-4 inline-flex rounded-full hover:bg-secondary-100/50"
              >
                Lihat Program <ArrowRightIcon className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        {/* Baris kedua: Card 5, 6, 7 (tengah) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {programs.slice(4).map((program) => (
            <div key={program.id} className="">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-secondary-100 text-4xl mb-4 flex justify-center">
                  {program.icon}
                </div>
                <h2 className=" text-xl font-semibold mb-4">{program.title}</h2>
                <button className="bg-secondary-100 inline-flex  py-2 px-4 rounded-full hover:bg-secondary-100/50">
                  Lihat Program <ArrowRightIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
