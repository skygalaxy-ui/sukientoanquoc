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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee
          items={["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Quảng Ninh", "Bình Dương", "Nha Trang"]}
          variant="cities"
          speed={30}
        />
        <Feature />
        <Stats />
        <Services />
        <Portfolio />
        <Process />
        <Marquee
          items={["Khai Trương", "Hội Nghị", "Festival", "Roadshow", "Teambuilding", "Gala Dinner", "Khánh Thành", "Động Thổ"]}
          variant="purple"
          speed={40}
        />
        <Speakers />
        <Sponsor />
        <ContactForm />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
