import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Feature from "@/components/Feature/Feature";
import Stats from "@/components/Stats/Stats";
import Services from "@/components/Services/Services";
import Process from "@/components/Process/Process";
import Speakers from "@/components/Speakers/Speakers";
import Sponsor from "@/components/Sponsor/Sponsor";
import Marquee from "@/components/Marquee/Marquee";
import Portfolio from "@/components/Portfolio/Portfolio";
import ContactForm from "@/components/ContactForm/ContactForm";
import Footer from "@/components/Footer/Footer";
import LatestNews from "@/components/LatestNews/LatestNews";

import { getPageImages } from "@/lib/page-images";
import { MARQUEE_CITIES, MARQUEE_SERVICES } from "@/lib/constants";

export const revalidate = 60; // ISR: refresh images every 60s

export default async function Home() {
  const images = await getPageImages();

  return (
    <>
      <Header />
      <main>
        <Hero heroImage={images.hero_bg} />
        <Marquee items={MARQUEE_CITIES} variant="cities" speed={120} />
        <Feature images={images} />
        <Stats />
        <Services images={images} />
        <Portfolio images={images} />
        <Process />
        <Marquee items={MARQUEE_SERVICES} variant="purple" speed={140} />
        <Speakers images={images} />
        <Sponsor images={images} />
        <LatestNews />
        <ContactForm />
      </main>
      <Footer />

    </>
  );
}
