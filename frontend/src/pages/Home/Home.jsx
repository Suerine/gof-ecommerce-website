import { useEffect } from "react";
import HeroSection from "../../components/ui/HeroSection";
import TopPicks from "./TopPicks";
import Exclusive from "./Exclusive";
import FeaturedProducts from "./FeaturedProducts";
import StatsSection from "./StatsSection";

const Home = () => {
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");

      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", reveal);
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <>
     <HeroSection />
     <TopPicks />
     <FeaturedProducts />
     <StatsSection />
     <Exclusive />
    </>
  );
};

export default Home;
