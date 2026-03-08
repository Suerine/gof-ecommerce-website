import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import messiJersey from "../../assets/images/messipsgjersey.png";
import speedportal from "../../assets/images/speedportal.png";
import maradonaJersey from "../../assets/images/maradonajersey.png";
import cr7Shoes from "../../assets/images/cuttobrilliance.png";


const FeaturedProducts = () => {
  return (
    <section className="bg-white text-black px-4 sm:px-10 md:px-16 py-16">
     {/* Title */}
     <h2 className="
        text-2xl
        sm:text-3xl
        md:text-3xl
        font-semibold
        text-center
        mb-12
        tracking-widest
        text-gold
        title
      ">
        Featured Products
      </h2>


     {/* Grid */}
     <div className="
       grid
       grid-cols-1
       sm:grid-cols-2
       lg:grid-cols-4
       gap-10
     ">

       {[
         {
           img: messiJersey,
           name: "Messi PSG Jersey",
           price: "$105.00",
           rating: [1,1,1,1,0.5]
         },
         {
           img: speedportal,
           name: "Adidas X Speedportal",
           price: "$250.00",
           rating: [1,1,1,0.5,0]
         },
         {
           img: maradonaJersey,
           name: "MSC Napoli Jersey",
           price: "$125.00",
           rating: [1,1,1,1,0]
         },
         {
           img: cr7Shoes,
           name: "CR7's: Cut to Brilliance",
           price: "$278.00",
           rating: [1,1,1,1,0.5]
         }
       ].map((product, index) => (

         <div
           key={index}
           className="
             relative
             bg-gradient-to-b
             from-gray-100
             to-white
             shadow-lg
             rounded-2xl
             p-6
             transition
             duration-500
             hover:scale-105
             hover:border-yellow-500
             hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]
             group
           "
         >

           {/* Product Image */}
           <div className="overflow-hidden rounded-xl mb-6">
             <img
               src={product.img}
               alt={product.name}
               className="
                 w-full
                 h-60
                 object-cover
                 transition
                 duration-500
                 group-hover:scale-110
               "
             />
           </div>

           {/* Name */}
           <h4 className="font-semibold text-lg mb-3 tracking-wide">
             {product.name}
           </h4>

           {/* Rating */}
           <div className="flex  mb-4 text-yellow-500 text-sm drop-shadow-[0_0_6px_rgba(255,215,0,0.7)]">
             {product.rating.map((star, i) =>
               star === 1 ? (
                 <FaStar key={i} />
               ) : star === 0.5 ? (
                 <FaStarHalfAlt key={i} />
               ) : (
                 <FaRegStar key={i} />
               )
             )}
           </div>

           {/* Price */}
           <p className="
             text-xl
             font-light
             text-black
             tracking-wider
           ">
             {product.price}
           </p>

         </div>

       ))}

     </div>

     {/* Luxury CTA */}
     <div className="flex justify-center mt-16">
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
         Discover More
       </a>
     </div>

   </section>

  )
}

export default FeaturedProducts