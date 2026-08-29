import HeroSection from "../../../features/Landing/HeroSection";
import { lazy, Suspense } from "react";
import SEO from "../../../components/shared/SEO";
import DeferredSection from "../../../components/shared/DeferredSection";

const MashhurFood = lazy(() => import("../../../features/Landing/PopularFood"));
const SpecialSection = lazy(() => import("../../../features/Landing/SpecialSection"));
const Stolband = lazy(() => import("../../../features/Landing/BookaTable"));
const UserComments = lazy(() => import("../../../features/Landing/UserComments"));

function Home() {
  return (
    <div className="min-h-screen bg-[#050708] text-white">
      <SEO
        title="Tanho Restaurant — Mazali taomlar va unutilmas taassurotlar"
        description="Tanho Restaurant — mualliflik taomlari, qulay muhit va unutilmas taassurotlar maskani. Menyuni ko‘ring va stol band qiling."
        path="/"
      />
      <HeroSection />
      <Suspense fallback={null}>
        <DeferredSection><MashhurFood /></DeferredSection>
        <DeferredSection><SpecialSection /></DeferredSection>
        <DeferredSection><Stolband /></DeferredSection>
        <DeferredSection><UserComments /></DeferredSection>
      </Suspense>
    </div>
  );
}

export default Home;