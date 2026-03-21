import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppWidget() {
  const phoneNumber = "254748312150";
  const message = "Hi, I'm interested in your products. Can you help me with more information?";
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

      {/* Tooltip */}
      <div className={`
        hidden sm:flex items-center gap-2
        bg-black text-white text-xs px-4 py-2 rounded-full shadow-lg
        transition-all duration-300
        ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
      `}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Chat with us
      </div>

      {/* Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 flex items-center justify-center
          bg-[#25D366] text-white rounded-full
          shadow-[0_4px_20px_rgba(37,211,102,0.4)]
          hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)]
          hover:scale-110
          transition-all duration-300"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  )
}

export default WhatsAppWidget;