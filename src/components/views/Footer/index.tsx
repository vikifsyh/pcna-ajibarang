import React from "react";
import Logo from "../../../../public/image/footer.png";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="my-10">
      <div className="mx-8 md:mx-16 py-6 border-y-2 border-primary bg-white text-gray-900">
        <div className="text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <Image alt="PCNA Ajibarang" src={Logo} />
          </div>
          <h1 className="text-4xl font-semibold mt-5">
            Website Resmi PCNA Ajibarang
          </h1>
          <div className="flex flex-col md:flex-row md:justify-between mt-[42px]">
            <div className="max-w-xl">
              <p className="text-lg">
                PCNA Ajibarang (Pimpinan Cabang Nasyiatul ‘Aisyiyah) adalah
                wadah untuk pemberdayaan perempuan yang merupakan otonom
                Muhammadiyah yang bergerak di bidang keagamaan, kemasyarakatan,
                dan keperempuanan.
              </p>
            </div>
            <div className="max-w-sm md:mt-0 mt-4">
              <p className="inline-flex items-center gap-2">
                <EnvelopeIcon className="w-6 h-6" />
                pcnaajibarang2024@gmail.com
              </p>
              <p className="inline-flex items-center gap-2">
                <IoLogoWhatsapp className="w-6 h-6" />
                0812-3127-2092
              </p>
              <div className="mt-4">
                <h2 className="text-lg font-semibold">Social Media</h2>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
                  <FaTiktok className="size-6" />
                  <RiInstagramFill className="size-6" />
                  <FaXTwitter className="size-6" />
                </div>
              </div>
            </div>
            <div className="max-w-sm md:mt-0 mt-4">
              <div className="flex flex-col">
                <iframe
                  title="Google Maps PCNA Ajibarang"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.482573391897!2d109.05208727429496!3d-7.373719792589714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65715770f7b1ab%3A0x5f440a1651ec6e17!2sH3RJ%2BXM%20Ajibarang%20Wetan%2C%20Kabupaten%20Banyumas%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1697181929372!5m2!1sid!2sid"
                  className="max-w-sm h-64 rounded-md border border-gray-300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <p className="text-lg mt-2">
                  Jl. Basuki No.2, Lor, Ajibarang Wetan, Kec. Ajibarang,
                  Kabupaten Banyumas, Jawa Tengah 53163
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-lg mt-7">© 2024 PCNA Ajibarang</p>
    </div>
  );
}
