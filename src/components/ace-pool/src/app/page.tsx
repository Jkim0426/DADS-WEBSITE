import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import {
  WhyChooseUs,
  Process,
  Testimonials,
  FAQ,
} from "@/components/Sections";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero — first impression + primary CTA */}
        <Hero />

        {/* 2. Trust Bar — quick credibility anchors */}
        <TrustBar />

        {/* 3. Services — what we do */}
        <Services />

        {/* 4. About — who we are / Ki Mo's story */}
        <About />

        {/* 5. Gallery — proof / social trust */}
        <Gallery />

        {/* 6. Why Choose Us — differentiators */}
        <WhyChooseUs />

        {/* 7. Process — reduce friction to contact */}
        <Process />

        {/* 8. Testimonials — social proof */}
        <Testimonials />

        {/* 9. FAQ — answer objections */}
        <FAQ />

        {/* 10. Contact — primary conversion */}
        <Contact />
      </main>

      <Footer />

      {/* Floating AI chat assistant */}
      <ChatWidget />

      {/* Mobile sticky CTA bar */}
      <MobileStickyBar />
    </>
  );
}
