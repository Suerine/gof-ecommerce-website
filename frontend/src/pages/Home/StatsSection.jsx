import { players } from "../../services/stats"
import PlayerCard from "../../components/ui/PlayerCard"
import PELE_IMG from "../../assets/images/pele-walking-cosmosNYC.png"

function StatsSection() {
  return (
    <section className="bg-black">
     <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
       {/* Image */}
       <div
         className="
           relative overflow-hidden
           w-full h-[550px] sm:h-[600px] lg:h-[900px]
           bg-cover bg-center bg-no-repeat
         "
         style={{ backgroundImage: `url(${PELE_IMG})` }}
       >
         {/* Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
       </div>
       {/* Content */}
       <div className="max-w-xl space-y-10 py-8 px-4">

         {/* Title */}
         <div>
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-yellow-500">
             Pelé
           </h2>
           <p className="text-sm text-gray-200 mt-2">The King of Football</p>
         </div>

         {/* Description */}
         <div className="text-gray-300 leading-relaxed text-sm md:text-base">
           Pelé, born Edson Arantes do Nascimento, is widely regarded as the greatest
           footballer of all time. <br /><br />
           He won three FIFA World Cups with Brazil and scored over 1,000 career goals,
           redefining excellence in the sport and inspiring generations worldwide.
         </div>

         {/* Career Info */}
         <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-300">
           <p><span className="font-medium text-white">Full Name:</span><br /> Edson Arantes do Nascimento</p>
           <p><span className="font-medium text-white">Nationality:</span><br /> Brazil</p>
           <p><span className="font-medium text-white">Position:</span><br /> Forward</p>
           <p><span className="font-medium text-white">Years Active:</span><br /> 1956 – 1977</p>
           <p className="col-span-2">
             <span className="font-medium text-white">Clubs:</span><br />
             Santos FC, New York Cosmos
           </p>
         </div>

         {/* Divider */}
         <div className="w-full h-px bg-gray-300"></div>

         {/* Stats */}
         <div className="flex justify-between text-center">
           <div>
             <p className="text-3xl font-bold text-yellow-500">1281</p>
             <p className="text-xs text-gray-300 mt-1">Goals</p>
           </div>

           <div>
             <p className="text-3xl font-bold text-yellow-500">3</p>
             <p className="text-xs text-gray-300 mt-1">World Cups</p>
           </div>

           <div>
             <p className="text-3xl font-bold text-yellow-500">26</p>
             <p className="text-xs text-gray-300 mt-1">Trophies</p>
           </div>
         </div>

         {/* Divider */}
         <div className="w-full h-px bg-gray-300"></div>

         {/* Quote */}
         <div className="border-l-4 border-gray-300 pl-4 italic text-gray-300 text-sm">
           “Success is no accident. It is hard work, perseverance, learning,
           sacrifice, and most of all, love of what you are doing.”
         </div>

         {/* CTA */}
         <button className="
           group flex items-center gap-2
           text-white font-medium text-sm
           hover:text-yellow-500 transition
         ">
           View Full Stats
           <span className="transform transition group-hover:translate-x-1">
             →
           </span>
         </button>

       </div>
     </div>
   </section>
  )
}

export default StatsSection