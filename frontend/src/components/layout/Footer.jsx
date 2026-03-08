import React from 'react'
import GOF_Logo2 from '../../assets/images/GOFlogo2.png';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebookF, 
  FaApple, 
  FaGooglePlay 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full my-3">

     {/* Desktop Navigation */}
     <div>
       <ul className="hidden md:flex justify-center gap-10 text-sm font-light bg-black text-white py-4">
         <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
         <li><Link to="/products" className="hover:text-gray-300">Products</Link></li>
         <li><Link to="/stats" className="hover:text-gray-300">Stats</Link></li>
       </ul>
     </div>
     {/* Main Footer Content */}
     <div className="
       flex flex-col md:flex-row
       justify-between
       items-center
       px-6 md:px-16
       py-3
       bg-black text-white
       text-center
     ">

       {/* Logo */}
       <div className="flex flex-col items-center justify-center flex-1">
         <img src={GOF_Logo2} alt="GOF Logo" className="w-40 md:w-50" />
       </div>

       {/* App Download */}
       <div className="flex flex-col items-center justify-center flex-1">
         <h3 className="text-lg font-semibold mb-3">Download Our App</h3>

         <div className="flex justify-center gap-3">
           <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition">
             <FaGooglePlay className="text-green-500 text-lg" />
             <span className="text-sm">Android</span>
           </button>

           <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition">
             <FaApple className="text-white text-lg" />
             <span className="text-sm">iOS</span>
           </button>
         </div>
       </div>

       {/* Socials */}
       <div className="flex flex-col items-center justify-center flex-1">
         <h3 className="text-lg font-semibold mb-3">Follow Us</h3>

         <div className="flex justify-center gap-6 text-xl">
           <a href="#" className="hover:text-pink-500 transition">
             <FaInstagram />
           </a>

           <a href="#" className="hover:text-blue-400 transition">
             <FaTwitter />
           </a>

           <a href="#" className="hover:text-blue-600 transition">
             <FaFacebookF />
           </a>
         </div>
       </div>

     </div>



     {/* Bottom Bar */}
     <div className="bg-gray-900 py-3 text-white text-center text-sm">
       © 2026 Goats Of Football. All rights reserved.
     </div>

   </footer>

  )
}

export default Footer