import React from "react";
import RONALDO_Jersey from '../../assets/images/backhomeronaldo.png';
import RONALDINHO_Boots from '../../assets/images/goldenboots.png';
import MESSI_Jersey from '../../assets/images/messiinpsg.png';
import { Link } from "react-router-dom";

const picks = [
  {
    img: MESSI_Jersey,
    alt: "Messi PSG",
    label: "Messi · PSG",
    tag: "Jersey",
    href: "/products/69bc2ea0fb672aa0ab70dd53",
  },
  {
    img: RONALDINHO_Boots,
    alt: "Ronaldinho Boots",
    label: "Ronaldinho",
    tag: "Boots",
    href: "/products/69b6b77048d4212a6c57f2e0",
  },
  {
    img: RONALDO_Jersey,
    alt: "Ronaldo Jersey",
    label: "Ronaldo · CR7",
    tag: "Jersey",
    href: "/products/69bc2aa7fb672aa0ab70dbcc",
  },
]

const TopPicks = () => {
  return (
    <section className="bg-[#f7f6f3] py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .tp-bebas { font-family: 'Bebas Neue', sans-serif; }
        .tp-dm { font-family: 'DM Sans', sans-serif; }
        .pick-card:hover .pick-img { transform: scale(1.04) translateY(-6px); }
        .pick-img { transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="tp-dm text-yellow-500 text-xs tracking-[0.3em] uppercase mb-2">Curated Selection</p>
          <h2 className="tp-bebas text-6xl sm:text-7xl leading-none text-black">Top Picks</h2>
        </div>
        <Link
          to="/products"
          className="tp-dm text-xs tracking-widest uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-1 pb-2"
        >
          View All →
        </Link>
      </div>

      {/* MOBILE SLIDER */}
      
      <div className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth -mx-4 px-4">
        {picks.map((pick) => (
          <a
            key={pick.href}
            href={pick.href}
            className="pick-card snap-center flex-shrink-0 w-[80%] relative overflow-hidden rounded-2xl bg-white shadow-md"
          >
            <div className="aspect-[3/4] overflow-hidden"> 
            <img src={pick.img} alt={pick.alt} className="pick-img w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <span className="tp-dm text-yellow-400 text-xs tracking-widest uppercase">{pick.tag}</span>
              <p className="tp-bebas text-white text-2xl leading-none mt-0.5">{pick.label}</p>
            </div>
          </a>
        ))}
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden sm:grid grid-cols-3 gap-6 max-w-7xl mx-auto">
        {picks.map((pick, i) => (
          <a
            key={pick.href}
            href={pick.href}
            className={`pick-card relative overflow-hidden rounded-2xl bg-white shadow-md block`}
          >
           <div className="aspect-[3/4] overflow-hidden">  {/* ← add this wrapper */}
            <img src={pick.img} alt={pick.alt} className="pick-img w-full h-full object-cover" />
          </div>
            {/* Label overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
              <span className="tp-dm text-yellow-400 text-xs tracking-widest uppercase">{pick.tag}</span>
              <p className="tp-bebas text-white text-3xl leading-none mt-0.5">{pick.label}</p>
            </div>
            {/* Corner accent */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="tp-dm text-white text-xs tracking-widest uppercase">{pick.tag}</span>
            </div>
          </a>
        ))}
      </div>

      {/* Tagline */}
      <div className="max-w-2xl mx-auto text-center mt-20 px-4">
        <p className="tp-dm text-yellow-500 text-xs tracking-[0.3em] uppercase mb-4">Goal to Glory</p>
        <h3 className="tp-bebas text-5xl sm:text-6xl leading-none text-black mb-6">
          Legendary Pieces.<br />Unbeatable Collection.
        </h3>
        <p className="tp-dm text-gray-500 text-base leading-relaxed">
          Discover the finest football collectibles at our premier collectors' corner.
          From vintage jerseys to signed memorabilia, score pieces that define the beautiful game.
        </p>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <a
          href="/products"
          className="tp-dm px-10 py-3.5 bg-black border border-yellow-500 text-white text-sm
            uppercase tracking-widest font-medium rounded-full
            transition duration-300 hover:bg-yellow-500 hover:text-black
            hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]"
        >
          Go To Collections
        </a>
      </div>

    </section>
  );
};

export default TopPicks;