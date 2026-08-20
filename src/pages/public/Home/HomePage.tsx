import HeroSection from "../../../features/Landing/HeroSection";
import MashhurFood from "../../../features/Landing/PopularFood";
import AboutSection from "../../../features/Landing/AboutSection";
import SpecialSection from "../../../features/Landing/SpecialSection";
import Stolband from "../../../features/Landing/BookaTable";

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
