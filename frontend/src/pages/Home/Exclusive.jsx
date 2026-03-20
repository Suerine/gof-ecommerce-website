import React from 'react'
import cosmosRing from '../../assets/images/cosmosRing.png';

const Exclusive = () => {
  return (
    <section className="bg-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image Column */}
        <div className="flex-1 flex justify-center">
          <img
            src={cosmosRing}   // import this image
            alt="Pelé Cosmos Ring"
            className="w-64 md:w-96 lg:w-125"
          />
        </div>
        {/* Text Column */}
        <div className="flex-1 text-center md:text-left">

          <p className="
            text-xs 
            xs:text-[12px] xs:font-extralight
            sm:font-extralight
            sm:text-sm 
            md:text-base 
            font-light 
            exclusive-p 
            leading-relaxed 
            mb-1 
            xs:mb-2
          ">
            Exclusively Available on GOF
          </p>

          <h1 className="
            text-lg 
            xs:text-xl 
            sm:text-2xl 
            md:text-3xl 
            lg:text-4xl 
            xl:text-5xl 
            font-semibold 
            mb-2 
            xs:mb-3 
            sm:mb-4 
            leading-tight 
            exclusive-h1 
            tracking-tight
          ">
            PELÉ 1977 NEW YORK COSMOS NASL CHAMPIONSHIP RING
          </h1>

          <p className="
            text-gray-600 
            text-xs 
            xs:text-sm 
            sm:text-base 
            md:text-[15px] 
            lg:text-base 
            leading-relaxed 
            mb-3 
            xs:mb-4 
            sm:mb-5 
            md:mb-6 
            font-light 
            max-w-2xl 
            md:max-w-3xl
          ">
            A 1977 NASL champions ring presented to Pelé. The 10k gold ring features
            an emerald stone at its center surrounded by the words 
            "NASL Champions 1977." One side carries the Cosmos logo,
            the other the NASL logo.
          </p>

          {/* Bid Button */}
          <a href="/gof-bids" className="btn">
            <span className="btntext">PLACE BID</span>

            <span className="flip-front">
              <h3>PLACE BID</h3>
            </span>

            <span className="flip-back">
              <h3>$21,000</h3>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Exclusive
