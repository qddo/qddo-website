// 1. Componentes internos
import { Hero } from "@/components/features/Hero/Hero";
import { MantenedorasSection } from "@/components/features/MantenedorasSection/MantenedorasSection";
import { FoundersSection } from "@/components/features/FoundersSection/FoundersSection";
import { FilosofiaSection } from "@/components/features/FilosofiaSection/FilosofiaSection";
import { TestimonialsSection } from "@/components/features/TestimonialsSection/TestimonialsSection";
import { MembersSection } from "@/components/features/MembersSection/MembersSection";
import { FAQSection } from "@/components/features/FAQSection/FAQSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TestimonialsSection />
      <MantenedorasSection />
      <FoundersSection />
      <FilosofiaSection />
      <MembersSection />
      <FAQSection />
    </>
  );
}
