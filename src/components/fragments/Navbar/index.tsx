"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../../public/image/logo.png";
import Link from "next/link";

import {
  ArrowDownOnSquareIcon,
  Bars3Icon,
  CalendarDateRangeIcon,
  DocumentTextIcon,
  HomeIcon,
  InformationCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState("bg-white");
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const changeNavbarBgOnScroll = () => {
      if (window.scrollY > 0) {
        setNavbarBg("bg-gray-50");
      } else {
        setNavbarBg("bg-white");
      }
    };

    window.addEventListener("scroll", changeNavbarBgOnScroll);

    return () => {
      window.removeEventListener("scroll", changeNavbarBgOnScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 border-b border-gray-200 transition-colors duration-300 ${navbarBg}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-5 md:mx-20 py-3">
        <Link href="/" className="rtl:space-x-reverse">
          <Image src={Logo} alt="PCNA Ajibarang" />
        </Link>
        <div className="hidden md:flex space-x-5 items-center text-gray-400">
          <Link
            className={`px-4 py-3 inline-flex rounded-[3px] text-primary-500 hover:text-primary-500/80 hover:bg-primary-500/40 transition duration-200 ease-in ${
              pathname === "/" ? " bg-primary-500/20" : ""
            }`}
            href="/"
          >
            <HomeIcon className="w-5 h-5 text-primary-500 mr-3" />
            Beranda
          </Link>
          <Link
            className={`px-4 py-3 inline-flex rounded-[3px] text-primary-500 hover:text-primary-500/80 hover:bg-primary-500/40 transition duration-200 ease-in ${
              pathname === "/tentang" ? " bg-primary-500/20" : ""
            }`}
            href="/tentang"
          >
            <InformationCircleIcon className="w-5 h-5 text-primary-500 mr-3" />
            Tentang
          </Link>
          <Link
            className={`px-4 py-3 inline-flex rounded-[3px] text-primary-500 hover:text-primary-500/80 hover:bg-primary-500/40 transition duration-200 ease-in ${
              pathname === "/dokumen" ? " bg-primary-500/20" : ""
            }`}
            href="/dokumen"
          >
            <ArrowDownOnSquareIcon className="w-5 h-5 mr-3 text-primary-500" />
            Dokumen
          </Link>
          <Link
            className={`px-4 py-3 inline-flex rounded-[3px] text-primary-500 hover:text-primary-500/80 hover:bg-primary-500/40 transition duration-200 ease-in ${
              pathname === "/berita" ? " bg-primary-500/20" : ""
            }`}
            href="/berita"
          >
            <DocumentTextIcon className="w-5 h-5 text-primary-500 mr-3" />
            Berita
          </Link>
          <Link
            className={`px-4 py-3 inline-flex rounded-[3px] text-primary-500 hover:text-primary-500/80 hover:bg-primary-500/40 transition duration-200 ease-in ${
              pathname === "/program" ? " bg-primary-500/20" : ""
            }`}
            href="/program"
          >
            <CalendarDateRangeIcon className="w-5 h-5 text-primary-500 mr-3" />
            Program
          </Link>
          <Link
            className={`px-4 py-3 inline-flex rounded-[3px] text-primary-500 hover:text-primary-500/80 hover:bg-primary-500/40 transition duration-200 ease-in ${
              pathname === "/daftar-ktan" ? " bg-primary-500/20" : ""
            }`}
            href={"https://nasyiah.or.id/Ktna"}
          >
            <UserPlusIcon className="w-5 h-5 text-primary-500 mr-3" />
            Daftar KTNA
          </Link>
        </div>
        <div className="flex lg:hidden items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 right-0 bg-white w-64 transform transition-transform duration-300 ease-in-out z-10 md:hidden`}
        >
          <div className="p-4">
            <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-neutral-50">
              <li>
                <Link
                  href="/"
                  className="px-3 py-2 w-full inline-flex  rounded-[3px] text-green-500 hover:text-green-500/80 hover:bg-green-500/40 transition duration-200 ease-in"
                >
                  <HomeIcon className="w-5 h-5 text-green-500 mr-3" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="px-3 py-2 w-full inline-flex rounded-[3px] text-green-500 hover:text-green-500/80 hover:bg-green-500/40 transition duration-200 ease-in"
                >
                  <InformationCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  Tentang
                </Link>
              </li>
              <li>
                <Link
                  href="/dokumen"
                  className="px-3 py-2 w-full inline-flex rounded-[3px] text-green-500 hover:text-green-500/80 hover:bg-green-500/40 transition duration-200 ease-in"
                >
                  <ArrowDownOnSquareIcon className="w-5 h-5 text-green-500 mr-3" />
                  Dokumen
                </Link>
              </li>
              <li>
                <Link
                  href="/berita"
                  className="px-3 py-2 w-full inline-flex rounded-[3px] text-green-500 hover:text-green-500/80 hover:bg-green-500/40 transition duration-200 ease-in"
                >
                  <DocumentTextIcon className="w-5 h-5 text-green-500 mr-3" />
                  Berita
                </Link>
              </li>
              <li>
                <Link
                  href="/program"
                  className="px-3 py-2 w-full inline-flex rounded-[3px] text-green-500 hover:text-green-500/80 hover:bg-green-500/40 transition duration-200 ease-in"
                >
                  <CalendarDateRangeIcon className="w-5 h-5 text-green-500 mr-3" />
                  Program
                </Link>
              </li>
              <li>
                <Link
                  href="/daftar-ktan"
                  className="px-3 py-2 w-full inline-flex rounded-[3px] text-green-500 hover:text-green-500/80 hover:bg-green-500/40 transition duration-200 ease-in"
                >
                  <UserPlusIcon className="w-5 h-5 text-green-500 mr-3" />
                  Daftar KTNA
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
