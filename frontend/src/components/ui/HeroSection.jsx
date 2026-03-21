import React, { useEffect, useRef, useState } from "react";
import fieldSlate from "../../assets/images/field slate.png";
import ronaldinho from "../../assets/images/tumblr_o4ewim27FU1r69qpro1_1280 Background Removed.png";
import pele from "../../assets/images/pele-brazil-tristan-chabert Background Removed.png";
import messi from "../../assets/images/messi-black-and-white-my-inspiration Background Removed.png";
import maradona from "../../assets/images/35hd2xhrgt361 Background Removed.png";
import ronaldo from "../../assets/images/cristiano-ronaldo-black-and-white-my-inspiration Background Removed.png";
import fog1 from "../../assets/images/fog_1.png";
import fog2 from "../../assets/images/fog_2.png";
import fog3 from "../../assets/images/fog_3.png";
import fog4 from "../../assets/images/fog_4.png";
import fog5 from "../../assets/images/fog_5.png";
import fog6 from "../../assets/images/fog_6.png";
import fog7 from "../../assets/images/fog_7.png";
import blackShadow from "../../assets/images/black_shadow.png";
import sunRays from "../../assets/images/sun_rays.png";
import GOF_Logo from "../../assets/images/GOFlogo.png";

function HeroSection() {
  const [xValue, setXValue] = useState(0);
  const [yValue, setYValue] = useState(0);
  const [rotateDegree, setRotateDegree] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  // Loading state
  const [loadedCount, setLoadedCount] = useState(0)
  const [heroReady, setHeroReady] = useState(false)

  const allImages = [
    fieldSlate, fog7, fog6, fog5, fog4, fog3, fog2,
    sunRays, blackShadow, fog1,
    ronaldinho, pele, messi, maradona, ronaldo
  ]
  const totalImages = allImages.length

  const handleImageLoad = () => {
    setLoadedCount(prev => {
      const next = prev + 1
      if (next >= totalImages) {
        // Small delay so the transition feels smooth, not jarring
        setTimeout(() => setHeroReady(true), 300)
      }
      return next
    })
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newXValue = e.clientX - windowSize.width / 2;
      const newYValue = e.clientY - windowSize.height / 2;
      const newRotateDegree = (newXValue / (windowSize.width / 2)) * 20;
      setXValue(newXValue);
      setYValue(newYValue);
      setRotateDegree(newRotateDegree);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [windowSize]);

  const getMouseParallaxTransform = (elementData) => {
    const { speedx = 0, speedy = 0, speedz = 0, rotation = 1 } = elementData;
    const cursorX = xValue + windowSize.width / 2;
    const elementCenterX = windowSize.width * (elementData.leftPercent / 100);
    const isInLeft = elementCenterX < windowSize.width / 2 ? 1 : -1;
    const zValue = (cursorX - elementCenterX) * isInLeft * 0.1;
    return {
      transform: `
        translate(-50%, -50%)
        rotateY(${rotateDegree * rotation}deg)
        translateX(calc(${xValue * speedx}px))
        translateY(calc(${yValue * speedy}px))
        perspective(2300px)
        translateZ(${zValue * speedz}px)
      `,
      willChange: "transform",
      transition: "0.45s cubic-bezier(0.2, 0.49, 0.32, 0.99)",
    };
  };

  const backgroundElements = [
    { src: fieldSlate, className: "parrallax bg-img", alt: "Football field", data: { speedx: 0.01, speedy: 0.01, speedz: 0.1, rotation: 0.1, leftPercent: 50, topPercent: 50 } },
    { src: fog7, className: "parrallax fog_7", alt: "Fog layer 7", data: { speedx: 0.027, speedy: 0.032, speedz: 0.63, rotation: 0.52, leftPercent: 30.83, topPercent: 37.66 } },
    { src: fog6, className: "parrallax fog_6", alt: "Fog layer 6", data: { speedx: 0.025, speedy: 0.0538, speedz: 0.72, rotation: 0.62, leftPercent: 51.39, topPercent: 37.66 } },
    { src: fog5, className: "parrallax fog_5", alt: "Fog layer 5", data: { speedx: 0.059, speedy: 0.0705, speedz: 0.56, rotation: 0.42, leftPercent: 50.07, topPercent: 48.77 } },
    { src: fog4, className: "parrallax fog_4", alt: "Fog layer 4", data: { speedx: 0.011, speedy: 0.044, speedz: 0.432, rotation: 0.53, leftPercent: 50.07, topPercent: 37.66 } },
    { src: fog3, className: "parrallax fog_3", alt: "Fog layer 3", data: { speedx: 0.0135, speedy: 0.098, speedz: 0.643, rotation: 0.63, leftPercent: 21.39, topPercent: 58.77 } },
    { src: fog2, className: "parrallax fog_2", alt: "Fog layer 2", data: { speedx: 0.065, speedy: 0.0318, speedz: 0.92, rotation: 0.35, leftPercent: 53.89, topPercent: 37.66 } },
    { src: sunRays, className: "parrallax sun_rays", alt: "Sun rays", data: { speedx: 0.015, speedy: 0.015, speedz: 0.2, rotation: 0.2, leftPercent: 85, topPercent: -0.34 } },
    { src: blackShadow, className: "parrallax black_shadow", alt: "Shadow overlay", data: { speedx: 0.01, speedy: 0.01, speedz: 0.1, rotation: 0.1, leftPercent: 50, topPercent: 100 } },
    { src: fog1, className: "parrallax fog_1", alt: "Fog layer 1", data: { speedx: 0.026, speedy: 0.031, speedz: 0.5, rotation: 0.40, leftPercent: 50, topPercent: 55 } },
  ];

  const players = [
    { src: ronaldinho, className: "parrallax ronaldinho", alt: "Ronaldinho", data: { speedx: 0.0895, speedy: 0.0204, speedz: 0.82, rotation: 0.78, leftPercent: 11.39, topPercent: 43.66 } },
    { src: pele, className: "parrallax pele", alt: "Pelé", data: { speedx: 0.045, speedy: 0.0654, speedz: 0.72, rotation: 0.53, leftPercent: 32.39, topPercent: 81.11 } },
    { src: messi, className: "parrallax messi", alt: "Lionel Messi", data: { speedx: 0.0925, speedy: 0.047, speedz: 0.89, rotation: 0.90, leftPercent: 47.39, topPercent: 61.11 } },
    { src: maradona, className: "parrallax maradona", alt: "Maradona", data: { speedx: 0.059, speedy: 0.023, speedz: 0.62, rotation: 0.69, leftPercent: 76.39, topPercent: 81.11 } },
    { src: ronaldo, className: "parrallax ronaldo", alt: "Cristiano Ronaldo", data: { speedx: 0.076, speedy: 0.096, speedz: 0.98, rotation: 0.85, leftPercent: 90.39, topPercent: 41.66 } },
  ];

  const titleData = { speedx: 0.07, speedy: 0.07, speedz: 0.21, rotation: 0.5, leftPercent: 50, topPercent: 37.66 };

  const progress = Math.round((loadedCount / totalImages) * 100)

  return (
    <>
      {/* Splash / loading screen */}
      <div
        className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center gap-6 pointer-events-none"
        style={{
          opacity: heroReady ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        <img
          src={GOF_Logo}
          alt="GOF"
          className="w-20"
          style={{
            opacity: heroReady ? 0 : 1,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />

        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="text-white/20 text-xs tracking-[0.3em] uppercase"
        >
          Loading
        </p>
      </div>

      {/* Hero section — always in DOM so images load immediately */}
      <section
        className="player-section z-40"
        style={{
          maxHeight: windowSize.width >= 200
            ? `${windowSize.width * 0.5}px`
            : `${windowSize.width * 1.6}px`,
          opacity: heroReady ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <div className="vignette" />
        <div className="absolute inset-0 bg-black/40 z-10" />

        {backgroundElements.map((element, index) => (
          <img
            key={`bg-${index}`}
            src={element.src}
            className={element.className}
            alt={element.alt}
            onLoad={handleImageLoad}
            onError={handleImageLoad} // count errors too so we never get stuck
            style={{
              ...getMouseParallaxTransform(element.data),
              top: `${element.data.topPercent}%`,
              left: `${element.data.leftPercent}%`,
            }}
          />
        ))}

        {players.map((player, index) => (
          <img
            key={`player-${index}`}
            src={player.src}
            className={player.className}
            alt={player.alt}
            onLoad={handleImageLoad}
            onError={handleImageLoad}
            style={{
              ...getMouseParallaxTransform(player.data),
              top: `${player.data.topPercent}%`,
              left: `${player.data.leftPercent}%`,
            }}
          />
        ))}

        <div
          className="text parrallax"
          style={{
            ...getMouseParallaxTransform(titleData),
            top: `${titleData.topPercent}%`,
            left: `${titleData.leftPercent}%`,
          }}
        >
          <h1 className="hide">GOATS OF FOOTBALL</h1>
        </div>
      </section>
    </>
  );
}

export default HeroSection;