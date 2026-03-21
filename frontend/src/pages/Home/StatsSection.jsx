import PELE_IMG from "../../assets/images/pele-walking-cosmosNYC.png"
import { Link } from "react-router-dom"

function StatsSection() {
  return (
    <section className="bg-black text-white overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .stats-bebas { font-family: 'Bebas Neue', sans-serif; }
        .stats-dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch">

        {/* Image */}
        <div
          className="relative overflow-hidden w-full h-[550px] sm:h-[600px] lg:h-[900px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${PELE_IMG})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Watermark number */}
          <div className="absolute bottom-6 right-6 stats-bebas text-[10rem] leading-none select-none pointer-events-none text-yellow-400 opacity-10">
            10
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-8 left-8">
            <p className="stats-bebas text-5xl text-white leading-none">Pelé</p>
            <p className="stats-dm text-white/40 text-xs tracking-[0.25em] uppercase mt-1">Brazil · Forward</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center space-y-8 py-12 px-8 sm:px-12 border-l border-white/10">

          {/* Label */}
          <p className="stats-dm text-yellow-400 text-xs tracking-[0.3em] uppercase">
            Hall of Legends
          </p>

          {/* Name */}
          <div>
            <h2 className="stats-bebas text-7xl sm:text-8xl leading-none tracking-wide text-white">
              Pelé
            </h2>
            <p className="stats-dm text-white/40 text-sm italic mt-1">The King of Football</p>
          </div>

          {/* Bio */}
          <p className="stats-dm text-white/60 text-sm sm:text-base leading-relaxed max-w-md">
            Pelé, born Edson Arantes do Nascimento, is widely regarded as the greatest
            footballer of all time. He won three FIFA World Cups with Brazil and scored
            over 1,000 career goals, redefining excellence in the sport and inspiring
            generations worldwide.
          </p>

          {/* Career info */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: "Edson Arantes do Nascimento" },
              { label: "Nationality", value: "Brazil" },
              { label: "Position", value: "Forward" },
              { label: "Years Active", value: "1956 – 1977" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="stats-dm text-white/30 text-xs uppercase tracking-widest mb-1">{label}</p>
                <p className="stats-dm text-white text-sm font-medium">{value}</p>
              </div>
            ))}
            <div className="col-span-2">
              <p className="stats-dm text-white/30 text-xs uppercase tracking-widest mb-1">Clubs</p>
              <p className="stats-dm text-white text-sm font-medium">Santos FC, New York Cosmos</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Goals", value: "1281" },
              { label: "World Cups", value: "3" },
              { label: "Trophies", value: "26" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="stats-bebas text-4xl sm:text-5xl leading-none text-yellow-400">{value}</p>
                <p className="stats-dm text-white/40 text-xs uppercase tracking-widest mt-2">{label}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Quote */}
          <div className="border-l-2 border-yellow-400 pl-5 py-1">
            <p className="stats-dm italic text-white/50 text-sm leading-relaxed">
              "Success is no accident. It is hard work, perseverance, learning,
              sacrifice, and most of all, love of what you are doing."
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/stats"
            className="group inline-flex items-center gap-2 stats-dm text-sm font-medium text-white hover:text-yellow-400 transition-colors w-fit"
          >
            <span className="tracking-widest uppercase text-xs">View Full Stats</span>
            <span className="transform transition-transform group-hover:translate-x-1 text-yellow-400">→</span>
          </Link>

        </div>
      </div>
    </section>
  )
}

export default StatsSection