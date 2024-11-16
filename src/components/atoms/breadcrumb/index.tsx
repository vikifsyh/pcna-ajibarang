"use client";
import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  let breadcrumbItems = [];

  if (pathname === "/admin") {
    breadcrumbItems = [
      { name: "Admin", href: "/admin" },
      { name: "Dashboard", href: "" },
    ];
  } else if (pathname === "/admin/berita") {
    breadcrumbItems = [
      { name: "Admin", href: "/admin" },
      { name: "Berita atau Artikel", href: "" },
    ];
  } else if (pathname === "/admin/proker") {
    breadcrumbItems = [
      { name: "Admin", href: "/admin" },
      { name: "Program Kerja", href: "" },
    ];
  } else if (pathname === "/admin/unduhan") {
    breadcrumbItems = [
      { name: "Admin", href: "/admin" },
      { name: "FIle Unduhan", href: "" },
    ];
  } else {
    breadcrumbItems = [{ name: "Admin", href: "/admin" }];
  }

  return (
    <nav className="mb-4">
      <ul className="flex items-center space-x-2 text-black">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary-200">
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-400">{item.name}</span>
            )}
            {index < breadcrumbItems.length - 1 && (
              <ArrowRightIcon className="h-5 w-5 mx-1 text-gray-400" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
