"use client";
import CTA from "@/components/views/CTA/cta";
import Proker from "@/components/views/Program/ProgramKerja";
import ProgramTerlaksana from "@/components/views/Program/ProgramTerlaksana";
import React from "react";
import dynamic from "next/dynamic";

const ProgramKerja = dynamic(
  () => import("@/components/views/Program/ProgramTerlaksana"),
  { ssr: false }
);
export default function page() {
  return (
    <>
      <Proker />
      <ProgramKerja />
      <CTA />
    </>
  );
}
