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
import FloatingContact from "@/components/FloatingContact/FloatingContact";
import { getPageImages } from "@/lib/page-images";
import { getPageContent } from "@/lib/page-content";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function Home() {
  const images = await getPageImages();
  const content = await getPageContent();

  return (
    <>
      <Header />
      <main>
        <Hero images={images} content={content} />
        <Marquee
          items={["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Quảng Ninh", "Bình Dương", "Nha Trang"]}
          variant="cities"
          speed={30}
        />
        <Feature images={images} content={content} />
        <Stats />
        <Services images={images} content={content} />
        <Portfolio images={images} content={content} />
        <Process />
        <Marquee
          items={["Khai Trương", "Hội Nghị", "Festival", "Roadshow", "Teambuilding", "Gala Dinner", "Khánh Thành", "Động Thổ"]}
          variant="purple"
          speed={40}
        />
        <Speakers images={images} />
        <Sponsor images={images} />
        <ContactForm />
      </main>
      <Footer content={content} />
      <FloatingContact />
    </>
  );
}

