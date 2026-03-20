import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppWidget() {
  const phoneNumber = "254748312150"; 

  const message = "Hi, I'm interested in your products. Can you help me with more information?";
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">

      {/* Tooltip */}
      <div className="
        hidden sm:block
        bg-black text-white text-xs px-3 py-1.5 rounded-full
        opacity-0 translate-y-2
        group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-300
      ">
        Chat with us
      </div>

      {/* Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          w-14 h-14 flex items-center justify-center
          bg-[#25D366] text-white
          rounded-full
          shadow-lg
          hover:shadow-2xl
          hover:scale-110
          transition-all duration-300
        "
      >
        <FaWhatsapp className="text-2xl"/>
      </a>
    </div>
  );
}

export default WhatsAppWidget;