"use client";
import Breadcrumb from "@/components/atoms/breadcrumb";
import { useSession } from "next-auth/react";
import React from "react";

export default function ManageProker() {
  const { data: session, status } = useSession();
  return (
    <main className="flex-1 p-4 sm:ml-72 sm:mr-10 my-10 rounded-lg bg-white">
      <div className="my-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <p className="text-xl font-semibold">
            Selamat datang, {session.user?.name || "User"}! 👋
          </p>
        ) : (
          <p>Please log in.</p>
        )}
      </div>
      <Breadcrumb />
    </main>
  );
}
