import HeroSection from "@/components/views/Hero";
import Structure from "@/components/views/Structure";
import VisiMisi from "@/components/views/VisiMisi";
import ClickToAccess from "@/components/views/CTA";
import Program from "@/components/views/Program";

export default function page() {
  return (
    <>
      <HeroSection />
      <Program />
      <VisiMisi />
      <Structure />
      <ClickToAccess />
    </>
  );
}
