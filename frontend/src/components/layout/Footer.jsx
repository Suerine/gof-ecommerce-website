import React from 'react'
import GOF_Logo2 from '../../assets/images/GOFlogo2.png'
import { Link } from 'react-router-dom'
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaApple,
  FaGooglePlay
} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-black text-white">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .ft-bebas { font-family: 'Bebas Neue', sans-serif; }
        .ft-dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-5">
          <img src={GOF_Logo2} alt="GOF Logo" className="w-32" />
          <p className="ft-dm text-white/40 text-sm leading-relaxed text-center md:text-left max-w-xs">
            The premier destination for football collectibles, jerseys, and memorabilia.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-4 mt-1">
            <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-400 transition-all duration-200">
              <FaInstagram className="text-sm" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-400 transition-all duration-200">
              <FaTwitter className="text-sm" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-yellow-500 hover:text-yellow-400 transition-all duration-200">
              <FaFacebookF className="text-sm" />
            </a>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <p className="ft-dm text-white/30 text-xs tracking-[0.25em] uppercase mb-1">Navigate</p>
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/stats", label: "Stats" },
            { to: "/wishlist", label: "Wishlist" },
            { to: "/cart", label: "Cart" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="ft-dm text-white/50 text-sm hover:text-yellow-400 transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* App download */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <p className="ft-dm text-white/30 text-xs tracking-[0.25em] uppercase mb-1">Get the App</p>
          <p className="ft-dm text-white/50 text-sm">Shop on the go — download our app for Android and iOS.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-yellow-500/50 px-5 py-2.5 rounded-xl transition-all duration-200">
              <FaGooglePlay className="text-yellow-400 text-base" />
              <div className="text-left">
                <p className="ft-dm text-white/30 text-[10px] uppercase tracking-widest">Get it on</p>
                <p className="ft-dm text-white text-sm font-medium">Google Play</p>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-yellow-500/50 px-5 py-2.5 rounded-xl transition-all duration-200">
              <FaApple className="text-white text-base" />
              <div className="text-left">
                <p className="ft-dm text-white/30 text-[10px] uppercase tracking-widest">Download on</p>
                <p className="ft-dm text-white text-sm font-medium">App Store</p>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="ft-dm text-white/20 text-xs">© 2026 Goats Of Football. All rights reserved.</p>
        <p className="ft-bebas text-yellow-500/40 text-sm tracking-widest">GOF</p>
      </div>

    </footer>
  )
}

export default Footer