"use client";
import { DocumentIcon } from "@heroicons/react/16/solid";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  CalendarDateRangeIcon,
  ClipboardDocumentIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 sm:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full rounded-md px-3 py-4 overflow-y-auto bg-white">
          {/* Bagian atas (Navigasi) */}
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin"
                className={`flex items-center p-2 text-primary rounded-lg hover:bg-primary/20 ${
                  pathname === "/admin" ? "bg-primary/20" : ""
                }`}
              >
                <Squares2X2Icon className="w-5 h-5" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/berita"
                className={`flex items-center p-2 text-primary rounded-lg hover:bg-primary/20 ${
                  pathname === "/admin/berita" ? "bg-primary/20" : ""
                }`}
              >
                <ClipboardDocumentIcon className="w-5 h-5" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Kelola Berita
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/proker"
                className={`flex items-center p-2 text-primary rounded-lg hover:bg-primary/20 ${
                  pathname === "/admin/proker" ? "bg-primary/20" : ""
                }`}
              >
                <CalendarDateRangeIcon className="w-5 h-5" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Kelola Program Kerja
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/unduhan"
                className={`flex items-center p-2 text-primary rounded-lg hover:bg-primary/20 ${
                  pathname === "/admin/unduhan" ? "bg-primary/20" : ""
                }`}
              >
                <DocumentIcon className="w-5 h-5" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  File Unduhan
                </span>
              </Link>
            </li>
          </ul>

          {/* Bagian bawah (Logout) */}
          <div className="mt-auto">
            <button className="flex items-center p-2 w-full text-red-600 rounded-lg hover:bg-red-100 transition">
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              <span className="ms-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
