import About from "@/components/views/About";
import CTA from "@/components/views/CTA/cta";
import Structure from "@/components/views/Structure";
import VisiMisi from "@/components/views/VisiMisi";
import React from "react";

export default function page() {
  return (
    <>
      <About />
      <CTA />
      <VisiMisi />
      <Structure />
    </>
  );
}
