import React from 'react'
import cosmosRing from '../../assets/images/cosmosRing.png'
import { Link } from 'react-router-dom'

const Exclusive = () => {
  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .ex-bebas { font-family: 'Bebas Neue', sans-serif; }
        .ex-dm { font-family: 'DM Sans', sans-serif; }

        .bid-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 36px;
          border: 1px solid #eab308;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: white;
          background: transparent;
          overflow: hidden;
          transition: color 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .bid-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #eab308;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 0;
        }
        .bid-btn:hover::before { transform: translateX(0); }
        .bid-btn:hover { color: black; }
        .bid-btn span { position: relative; z-index: 1; }
        .bid-price {
          background: #eab308;
          color: black;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          padding: 2px 12px;
          border-radius: 999px;
          position: relative;
          z-index: 1;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .bid-btn:hover .bid-price { background: black; color: #eab308; }

        .ring-glow {
          filter: drop-shadow(0 0 40px rgba(234, 179, 8, 0.15));
          transition: filter 0.5s ease, transform 0.5s ease;
        }
        .ring-glow:hover {
          filter: drop-shadow(0 0 60px rgba(234, 179, 8, 0.3));
          transform: scale(1.03) rotate(2deg);
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className="flex justify-center relative">
          {/* Decorative ring behind image */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-yellow-500/10" />
          <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-yellow-500/5" />
          <img
            src={cosmosRing}
            alt="Pelé Cosmos Ring"
            className="ring-glow relative z-10 w-56 sm:w-72 md:w-80 lg:w-96"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6 text-center md:text-left">

          <div>
            <p className="ex-dm text-yellow-500 text-xs tracking-[0.3em] uppercase mb-3">
              Exclusively Available on GOF
            </p>
            <h2 className="ex-bebas text-4xl sm:text-5xl lg:text-6xl leading-none text-white">
              Pelé 1977<br />New York Cosmos<br />
              <span className="text-yellow-400">NASL Championship Ring</span>
            </h2>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 w-24 mx-auto md:mx-0" />

          <p className="ex-dm text-white/50 text-sm sm:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
            A 1977 NASL champions ring presented to Pelé. The 10k gold ring features
            an emerald stone at its center surrounded by the words "NASL Champions 1977."
            One side carries the Cosmos logo, the other the NASL logo.
          </p>

          {/* Details row */}
          <div className="flex items-center justify-center md:justify-start gap-8">
            {[
              { label: "Material", value: "10k Gold" },
              { label: "Year", value: "1977" },
              { label: "Team", value: "NY Cosmos" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="ex-dm text-white/30 text-xs uppercase tracking-widest mb-1">{label}</p>
                <p className="ex-dm text-white text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>

          {/* Bid button */}
          <div className="flex justify-center md:justify-start mt-2">
            <a href="/gof-bids" className="bid-btn">
              <span>Place Bid</span>
              <span className="bid-price">21,000 Ksh</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Exclusive
