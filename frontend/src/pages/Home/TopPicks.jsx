import React from "react";
import RONALDO_Jersey from '../../assets/images/ronaldojersey.jpeg';
import RONALDINHO_Boots from '../../assets/images/Ronaldinhoboots.jpeg';
import MESSI_Jersey from '../../assets/images/messi-number-30.jpg';


const TopPicks = () => {
  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-12">
      
     {/* Title */}
     <div className="flex justify-center mb-12">
       <h2 className="text-2xl sm:text-3xl font-semibold text-center relative inline-block">
         Top Picks
         <span className="block w-24 h-1 bg-red-600 mx-auto mt-2 rounded"></span>
       </h2>
     </div>

     {/* MOBILE SLIDER */}
     <div className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-4 scroll-smooth">

       <div className="snap-center flex-shrink-0 w-[85%] transition-transform duration-500 border-6 border-white">
         <a href="/stats">
           <img
             src={MESSI_Jersey}
             alt="Messi PSG"
             className="w-full drop-shadow-xl/50"
           />
         </a>
       </div>

       <div className="snap-center flex-shrink-0 w-[85%] transition-transform duration-500 border-6 border-white">
         <img
           src={RONALDINHO_Boots}
           alt="Ronaldinho Boots"
           className="w-full drop-shadow-xl/50"
         />
       </div>

       <div className="snap-center flex-shrink-0 w-[85%] transition-transform duration-500 border-6 border-white">
         <img
           src={RONALDO_Jersey}
           alt="Ronaldo Jersey"
           className="w-full drop-shadow-xl/50"
         />
       </div>

     </div>

     {/* DESKTOP GRID */}
     <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">

       <div className="transition-transform duration-500 hover:-translate-y-6 border-6 border-white">
         <a href="/stats">
           <img
             src={MESSI_Jersey}
             alt="Messi PSG"
             className="w-full max-w-[350px] drop-shadow-xl/50"
           />
         </a>
       </div>

       <div className="transition-transform duration-500 hover:-translate-y-6 border-6 border-white">
         <img
           src={RONALDINHO_Boots}
           alt="Ronaldinho Boots"
           className="w-full max-w-[350px] drop-shadow-xl/50"
         />
       </div>

       <div className="transition-transform duration-500 hover:-translate-y-6 border-6 border-white">
         <img
           src={RONALDO_Jersey}
           alt="Ronaldo Jersey"
           className="w-full max-w-[350px] drop-shadow-xl/50"
         />
       </div>

     </div>

     

      {/* Tagline */}
      <div className="max-w-3xl mx-auto text-center mt-16 px-4">
        <h3 className="text-2xl sm:text-4xl font-semibold mb-4">
          Goal to Glory
        </h3>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-light">
          Discover the finest football collectibles at our premier collectors'
          corner. From vintage jerseys to signed memorabilia, score legendary
          pieces that will make your collection truly unbeatable.
        </p>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <a
         href="/products"
         className="
           relative
           px-10
           py-4
           bg-gray-900
           border
           border-yellow-500
           text-white
           uppercase
           tracking-widest
           font-semibold
           rounded-full
           transition
           duration-500
           hover:bg-yellow-500
           hover:text-black
           hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]
         "
       >
         Go To Collections
       </a>
      </div>

    </section>
  );
};

export default TopPicks;
