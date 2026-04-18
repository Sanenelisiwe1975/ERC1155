import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { TokenShowcase } from "@/components/token-showcase";
import { Features } from "@/components/features";
import { CallToAction } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <TokenShowcase />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
