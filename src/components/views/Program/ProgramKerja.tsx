"use client";
import React, { useState, useEffect } from "react";
import {
  PresentationChartBarIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon,
  CommandLineIcon,
  HeartIcon,
  IdentificationIcon,
  MegaphoneIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/20/solid";
const proker = [
  {
    id: 1,
    icon: <IdentificationIcon className="w-10 h-10" />,
    title: "Perkaderan",
    content: [
      {
        id: 1,
        title: "Keputrian di sekolah-sekolah Muhammadiyah",
        description:
          "Bertujuan untuk memberikan edukasi dan sharing tentang berbagai informasi seputar perempuan selain itu kegiatan ini sebagai sarana memperkenalkan Nasyiatul Aisyiyah di kalangan siswa SMP dan SMK di sekolah Muhammadiyah.",
      },
      {
        id: 2,
        title: "Mengadakan lomba-lomba per-ranting",
        description:
          "Bertujuan untuk mewadahi kreatifitas dalam bidang IT yang diharapkan dapat meningkatkan minat dan motivasi dalam berkarya dan memberi informasi kepada pelajar atau masyarakat umum dalam bentuk poster, konten, dan video.",
      },
      {
        id: 3,
        title: "Melakukan Up Grading dan Follow Up",
        description:
          "Bertujuan untuk merekatkan hubungan antar pengurus. Untuk meningkatkan kemampuan softskill dan hardskill pengurus dalam menjalankan roda organisasi serta meningkatkan kinerja Pengurus PCNA Ajibarang.",
      },
    ],
  },
  {
    id: 2,
    icon: <MegaphoneIcon className="w-10 h-10" />,
    title: "Dakwah",
    content: [
      {
        title:
          "Membuat Materi Buletin satu bulan sekali ( Cetak ) dan di bagikan saat pertemuan cabang.",
        description:
          "Bertujuan untuk memberikan informasi melalui media tertulis kepada ayunda-ayunda yang menghadiri pertemuan rutin setiap bulan.",
      },
      {
        title:
          "Membuat Flayer satu minggu satu kali setiap hari jum'at ( Quotes )",
        description:
          "Bertujuan untuk sebagai sarana dakwah melalui media sosial kepada ayunda-ayunda atau mesyarakat luas.",
      },
      {
        title:
          "Menyelenggarakan Pelatihan Mubalighot dan Tilawatil Qur'an ( Utusan Ranting )",
        description:
          "Bertujuan untuk anggota Nasyiatul Aisyiyah dari cabang maupun ranting dapat mewujudkan generasi Qur’ani yaitu sumber daya insani yang unggul dalam pemahaman dan pengamalan Al-Qur’an",
      },
      {
        title:
          "Menyelenggarakan Pelatihan pemulasaran jenazah bekerjasama degan lembaga lain.",
        description:
          "Bertujuan untuk  memahami dan mempraktikkan tata cara pemulasaraan jenazah dengan benar agar proses ini dapat berjalan sesuai dengan ajaran agama.",
      },
      {
        title: "Melaksanakan program tilawah 1 month 30 juz (bulan Ramadhan)",
        description:
          "Bertujuan untuk membiasakan diri untuk senantiasa cinta terhadap Al – Qur’an dengan program tilawah 1 bulan 30 Juz.",
      },
      {
        title: "Melaksanakan Kajian Online se PC NA",
        description:
          "Bertujuan untuk menguatkan keimanan ayunda-ayunda melalui media dakwah online yang sangat mudah sekali diakses oleh ayunda-ayunda.",
      },
      {
        title: "Menyelenggarakan kultum menjelang buka puasa melalui grup WA",
        description:
          "Bertujuan untuk memanfaatkan waktu yang sebaik-baiknya ketika menjelang buka puasa, agar waktu yang ada dimanfaatkan untuk hal-hal baik.",
      },
    ],
  },
  {
    id: 3,
    icon: <PresentationChartBarIcon className="w-10 h-10" />,
    title: "Ekowir",
    content: [
      {
        title: "Mengadakan pelatihan kewirausahaan",
        description:
          "Bertujuan untuk mengembangkan keterampilan kewirausahaan ayunda-ayunda. Program ini melibatkan penanaman dan pengembangan keterampilan wirausaha pada ayunda-ayunda yang tertarik untuk menjadi wirausahawan.",
      },
      {
        title: "Mengikuti Bazar Murah",
        description:
          "Bertujuan untuk sebagai sarana pengenalan usaha milik PCNA Ajibarang, selain itu membranding image produk usaha yang dimiliki oleh PCNA Ajibarang",
      },
      {
        title: "Mendistribusikan perlengkapan Atribut NA",
        description:
          "Bertujuan untuk memenuhi kebutuhan ayunda-ayunda dalam memenuhi perlengkapan atribut nasyiatul Aisyiyah.",
      },
    ],
  },
  {
    id: 4,
    icon: <BookOpenIcon className="w-10 h-10" />,
    title: "Pendidikan & Penelitian",
    content: [
      {
        title: "Mengadakan seminar pencegahan kekerasan perempuan dan anak.",
        description:
          "Bertujuan untuk meningkatkan pola pikir bagaimana menunjukan sikap yang baik terhadap perempuan dan anak, selain itu menghindari kekerasan berbasis gender, melalui peningkatan fokus pada advokasi, pengumpulan bukti, pengembangan kapasitas",
      },
      {
        title: "Mengadakan Seminar Keluarga Sakinah",
        description:
          "Bertujuan untuk meningkatkan kualitas pengetahuan ayunda-ayunda tentang bagaimana menciptakan keluarga sakinah di kehidupan yang nyata.",
      },
      {
        title: "Mengadakan Kegiatan Parenting",
        description:
          "Bertujuan untuk memberikan edukasi bagaimana memahami pola asuh yang baik, karena ilmu parenting ini penting dalam membentuk karakter diri anak agar proses tumbuh kembang anak berjalan dengan optimal.",
      },
    ],
  },
  {
    id: 5,
    icon: <HeartIcon className="w-10 h-10" />,
    title: "Kesehatan & Lingkungan",
    content: [
      {
        title:
          "Mengadakan kegiatan Nasehat Ceria di ranting ( POSBINDU, SENAM , BAZAR )",
        description:
          "Bertujuan untuk mewadahi ayunda-ayunda dalam menjaga kesehatan dengan olahraga bersama dan cek kesehatan yang diadakan oleh PCNA Ajibarang.",
      },
      {
        title:
          "Mengadakan Bersih Masjid Binaan Muhammadiyah setiap 3 bulan sekali.",
        description:
          "Bertujuan untuk menumbuhkan sikap cinta terhadap masjid dengan menjaga kebersihan masjid dan ikut andil dalam memakmurkan masjid.",
      },
      {
        title: "Mengadakan Seminar Kesehatan",
        description:
          "Bertujuan untuk memberikan informasi, pendapat, motivasi atau inovasi kepada ayunda-ayunda tentang pentingnya menjaga kesehatan diri sendiri, keluarga dan lingkungan ",
      },
    ],
  },
  {
    id: 6,
    icon: <CommandLineIcon className="w-10 h-10" />,
    title: "Pusindi",
    content: [
      {
        title: "Mengadakan Pelatihan Digitalisasi",
        description:
          "Bertujuan untuk memperkenalkan lebih jauh mengenai media digitalisasi terutama desain grafis, serta memberikan pemahaman kepada PCNA dan PRNA Ajibarang tentang bagaimana manfaat dari ketrampilan desain grafis yang dimiliki.",
      },
      {
        title: "Mencetak Buletin Satu Bulan Sekali",
        description:
          "Bertujuan untuk memberikan informasi melalui media tertulis kepada ayunda-ayunda yang menghadiri pertemuan rutin setiap bulan. Program ini merupakan kolaborasi antara bidang dakwah dan bidang pustaka informasi digital.",
      },
      {
        title: "Membuat Flayer untuk hari-hari besar",
        description:
          "Bertujuan untuk menginformasikan segala bentuk informasi hari-hari besar.",
      },
      {
        title: "Mendokumentasikan setiap kegiatan",
        description:
          "Bertujuan untuk memperoleh keterangan serta mengabadikan setiap kegiatan yang sudah dilaksanakan oleh PCNA Ajibarang.",
      },
      {
        title: "Membuat Qoutes Setiap Hari Jum'at",
        description: "Membuat quotes islami rutin setiap hari jum'at",
      },
    ],
  },
  {
    id: 7,
    icon: <ChatBubbleLeftRightIcon className="w-10 h-10" />,
    title: "Organisasi",
    content: [
      {
        title: "TURBA ke ranting-ranting se-ajibarang.",
        description:
          "Silaturahiim antara pengurus PC NA ajibarang dengan PR NA cabang ajibarang agar saling mengenal lebih dekat, sharing terkait etika,karakter dan komunikasi,mengimplementasikan etika dan karakter positif dalam kehidupan sehari hari dan penguatan organisasi.",
      },
      {
        title: "Pendataan KTA NA bagi anggota se-ajibarang",
        description:
          "Bekerja sama dengan Bidang Perkaderan dalam pendataan anggota se-Ajibarang",
      },
      {
        title: "Bakti Sosial",
        description:
          "Melaksanakan bakti sosial dalam waktu satu tahun sekali dan bersifat kondisional",
      },
    ],
  },
];

export default function Proker() {
  const [activeContentIndexes, setActiveContentIndexes] = useState<number[]>(
    proker.map(() => 0) // Awalnya semua index konten aktif adalah 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContentIndexes((prevIndexes) =>
        prevIndexes.map((currentIndex, programIndex) => {
          const nextIndex =
            (currentIndex + 1) % proker[programIndex].content.length;
          return nextIndex;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const firstFourPrograms = proker.slice(0, 4); // 4 item pertama
  const remainingPrograms = proker.slice(4); // Item sisanya

  return (
    <div className="my-[94px]">
      <div className="bg-primary py-20">
        <h1 className="md:text-[42px] text-2xl text-center font-bold text-white">
          Program Kerja
        </h1>
        <p className="text-lg text-center mt-4 text-white">
          Telusuri Program Menarik PCNA Ajibarang
        </p>
      </div>
      <div className="mx-5 md:mx-20 my-10">
        {/* Grid untuk 4 item pertama */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 my-5">
          {firstFourPrograms.map((program, programIndex) => (
            <div
              key={program.id}
              className="relative border border-black/80 bg-[#FCFCFC] rounded-md "
            >
              <div className="bg-primary p-2">
                <div className="flex justify-center text-secondary-100">
                  {program.icon}
                </div>
                {/* Program Title */}
                <h2 className="text-xl font-semibold text-center text-white">
                  {program.title}
                </h2>
              </div>

              <div className="px-2 py-6">
                {/* Program Content */}
                <div className="text-center mb-6">
                  <h3 className=" font-semibold mb-2">
                    {program.content[activeContentIndexes[programIndex]].title}
                  </h3>
                  <p className="text-sm">
                    {
                      program.content[activeContentIndexes[programIndex]]
                        .description
                    }
                  </p>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {program.content.map((_, contentIndex) => (
                    <span
                      key={contentIndex}
                      className={`w-2 h-2 rounded-full ${
                        activeContentIndexes[programIndex] === contentIndex
                          ? "bg-gray-700"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid untuk item sisanya */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {remainingPrograms.map((program, programIndex) => (
            <div
              key={program.id}
              className="relative border border-black/80 bg-[#FCFCFC] rounded-md "
            >
              <div className="bg-primary p-2">
                <div className="flex justify-center text-secondary-100">
                  {program.icon}
                </div>
                <h2 className="text-xl font-semibold text-center text-white">
                  {program.title}
                </h2>
              </div>
              {/* Program Content */}
              <div className="px-2 py-6">
                {/* Program Content */}
                <div className="text-center mb-6">
                  <h3 className=" font-semibold mb-2">
                    {
                      program.content[
                        activeContentIndexes[
                          programIndex + firstFourPrograms.length
                        ]
                      ].title
                    }
                  </h3>
                  <p className="text-sm">
                    {
                      program.content[
                        activeContentIndexes[
                          programIndex + firstFourPrograms.length
                        ]
                      ].description
                    }
                  </p>
                </div>
                {/* Circle Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {program.content.map((_, contentIndex) => (
                    <span
                      key={contentIndex}
                      className={`w-2 h-2 rounded-full ${
                        activeContentIndexes[
                          programIndex + firstFourPrograms.length
                        ] === contentIndex
                          ? "bg-gray-700"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
