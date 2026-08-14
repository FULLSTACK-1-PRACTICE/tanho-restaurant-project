import HeroSection from "../../../components/Landing/HeroSection";
import MashhurFood from "../../../components/Landing/PopularFood";
import AboutSection from "../../../components/Landing/AboutSection";
import SpecialSection from "../../../components/Landing/SpecialSection";
import Stolband from "../../../components/Landing/BookaTable";

function Home() {
  return (
    <div className="min-h-screen bg-[#050708] text-white">
      <HeroSection />
      <MashhurFood />
      <AboutSection />
      <SpecialSection />
      <Stolband />
    </div>
  );
}

export default Home;
