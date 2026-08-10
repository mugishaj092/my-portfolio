import { AboutSection } from "@/components/about";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <AboutSection />
    </main>
  );
}
