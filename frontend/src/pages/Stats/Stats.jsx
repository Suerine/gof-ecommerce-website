import { useState } from "react"

const players = [
  {
    id: "pele",
    name: "Pelé",
    fullName: "Edson Arantes do Nascimento",
    title: "The King of Football",
    nationality: "Brazil",
    position: "Forward",
    years: "1956 – 1977",
    clubs: "Santos FC, New York Cosmos",
    quote: "Success is no accident. It is hard work, perseverance, learning, sacrifice, and most of all, love of what you are doing.",
    stats: [
      { label: "Goals", value: "1281" },
      { label: "World Cups", value: "3" },
      { label: "Trophies", value: "26" },
    ],
    bio: "Pelé is widely regarded as the greatest footballer of all time. He won three FIFA World Cups with Brazil and scored over 1,000 career goals, redefining excellence in the sport and inspiring generations worldwide.",
    accent: "#f59e0b",
    number: "10",
  },
  {
    id: "maradona",
    name: "Maradona",
    fullName: "Diego Armando Maradona",
    title: "The Golden Boy",
    nationality: "Argentina",
    position: "Attacking Midfielder",
    years: "1976 – 1997",
    clubs: "Boca Juniors, Barcelona, Napoli, Argentina",
    quote: "I am black or white, I'll never be grey in my life.",
    stats: [
      { label: "Goals", value: "353" },
      { label: "World Cups", value: "1" },
      { label: "Trophies", value: "14" },
    ],
    bio: "Diego Maradona captivated the world with his sublime skill and unstoppable drive. His 1986 World Cup performance — including the 'Goal of the Century' — cemented his status as a football deity.",
    accent: "#3b82f6",
    number: "10",
  },
  {
    id: "ronaldinho",
    name: "Ronaldinho",
    fullName: "Ronaldo de Assis Moreira",
    title: "The Magician",
    nationality: "Brazil",
    position: "Attacking Midfielder",
    years: "1998 – 2015",
    clubs: "Grêmio, PSG, Barcelona, AC Milan",
    quote: "I learned all about life with a ball at my feet.",
    stats: [
      { label: "Goals", value: "294" },
      { label: "Ballon d'Or", value: "2" },
      { label: "Trophies", value: "21" },
    ],
    bio: "Ronaldinho played football with a smile and a genius that left defenders bewildered. At Barcelona, he orchestrated some of the most beautiful football ever witnessed, winning two Ballon d'Or awards.",
    accent: "#10b981",
    number: "10",
  },
  {
    id: "messi",
    name: "Messi",
    fullName: "Lionel Andrés Messi",
    title: "The GOAT",
    nationality: "Argentina",
    position: "Forward",
    years: "2004 – Present",
    clubs: "Barcelona, PSG, Inter Miami",
    quote: "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
    stats: [
      { label: "Goals", value: "840+" },
      { label: "Ballon d'Or", value: "8" },
      { label: "Trophies", value: "44" },
    ],
    bio: "Lionel Messi has shattered every record imaginable across two decades of dominance. After years of heartbreak, he finally lifted the World Cup with Argentina in 2022, completing the greatest career in football history.",
    accent: "#a855f7",
    number: "10",
  },
  {
    id: "ronaldo",
    name: "Ronaldo",
    fullName: "Cristiano Ronaldo dos Santos Aveiro",
    title: "CR7",
    nationality: "Portugal",
    position: "Forward",
    years: "2002 – Present",
    clubs: "Sporting CP, Man United, Real Madrid, Juventus, Al Nassr",
    quote: "Talent without working hard is nothing.",
    stats: [
      { label: "Goals", value: "900+" },
      { label: "Ballon d'Or", value: "5" },
      { label: "Trophies", value: "34" },
    ],
    bio: "Cristiano Ronaldo is the embodiment of athletic perfection. Forged through relentless hard work, he became one of the highest scorers in football history, winning leagues across England, Spain, and Italy.",
    accent: "#ef4444",
    number: "7",
  },
]

function Stats() {
  const [active, setActive] = useState("pele")
  const player = players.find((p) => p.id === active)

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        .player-tab { transition: all 0.25s ease; }
        .stat-bar { animation: growIn 0.6s ease forwards; }
        @keyframes growIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: growIn 0.4s ease forwards; }
      `}</style>

      {/* Page header */}
      <div className="border-b border-white/10 px-6 sm:px-12 py-6 flex items-center justify-between">
        <div>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-dm">Hall of Legends</p>
          <h1 className="font-bebas text-4xl sm:text-5xl tracking-wide mt-0.5">Greatest of All Time</h1>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-white/20 text-xs font-dm">Football's finest</p>
          <p className="text-white/20 text-xs font-dm">across the ages</p>
        </div>
      </div>

      {/* Player tabs */}
      <div className="flex overflow-x-auto border-b border-white/10 scrollbar-hide">
        {players.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`player-tab shrink-0 px-6 sm:px-10 py-4 font-bebas text-xl sm:text-2xl tracking-wider relative ${
              active === p.id ? "text-white" : "text-white/25 hover:text-white/60"
            }`}
          >
            {p.name}
            {active === p.id && (
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 transition-all"
                style={{ backgroundColor: player.accent }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div key={active} className="fade-in grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-160px)]">

        {/* Left — identity panel */}
        <div className="relative flex flex-col justify-between p-8 sm:p-12 border-r border-white/10">

          {/* Big number watermark */}
          <div
            className="absolute top-4 right-6 font-bebas text-[12rem] sm:text-[16rem] leading-none select-none pointer-events-none"
            style={{ color: player.accent, opacity: 0.07 }}
          >
            {player.number}
          </div>

          <div className="relative z-10 space-y-8">
            {/* Name */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase font-dm mb-2" style={{ color: player.accent }}>
                {player.nationality} · {player.position}
              </p>
              <h2 className="font-bebas text-6xl sm:text-8xl leading-none tracking-wide">
                {player.name}
              </h2>
              <p className="text-white/40 font-dm text-sm mt-2 italic">{player.title}</p>
            </div>

            {/* Bio */}
            <p className="font-dm text-white/60 text-sm sm:text-base leading-relaxed max-w-md">
              {player.bio}
            </p>

            {/* Career details */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: player.fullName },
                { label: "Years Active", value: player.years },
                { label: "Nationality", value: player.nationality },
                { label: "Position", value: player.position },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-white/30 text-xs font-dm uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-white text-sm font-dm font-medium">{value}</p>
                </div>
              ))}
              <div className="col-span-2">
                <p className="text-white/30 text-xs font-dm uppercase tracking-widest mb-1">Clubs</p>
                <p className="text-white text-sm font-dm font-medium">{player.clubs}</p>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-2 pl-5 py-1" style={{ borderColor: player.accent }}>
              <p className="font-dm italic text-white/50 text-sm leading-relaxed">"{player.quote}"</p>
            </div>
          </div>
        </div>

        {/* Right — stats panel */}
        <div className="p-8 sm:p-12 flex flex-col justify-center gap-10">

          <p className="text-xs tracking-[0.3em] uppercase font-dm text-white/30">Career Statistics</p>

          {/* Big stats */}
          <div className="grid grid-cols-3 gap-4">
            {player.stats.map(({ label, value }) => (
              <div key={label} className="stat-bar">
                <p className="font-bebas text-4xl sm:text-5xl leading-none" style={{ color: player.accent }}>
                  {value}
                </p>
                <p className="text-white/40 text-xs font-dm uppercase tracking-widest mt-2">{label}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Attribute bars */}
          <div className="space-y-5">
            <p className="text-xs tracking-[0.3em] uppercase font-dm text-white/30">Attributes</p>
            {[
              { label: "Dribbling", pct: player.id === "ronaldinho" ? 99 : player.id === "maradona" ? 98 : player.id === "messi" ? 97 : player.id === "pele" ? 96 : 88 },
              { label: "Finishing", pct: player.id === "ronaldo" ? 99 : player.id === "pele" ? 97 : player.id === "messi" ? 96 : player.id === "maradona" ? 90 : 85 },
              { label: "Vision", pct: player.id === "ronaldinho" ? 99 : player.id === "messi" ? 98 : player.id === "maradona" ? 97 : player.id === "pele" ? 93 : 82 },
              { label: "Athleticism", pct: player.id === "ronaldo" ? 99 : player.id === "pele" ? 94 : player.id === "messi" ? 88 : player.id === "maradona" ? 86 : 84 },
              { label: "Legacy", pct: 99 },
            ].map(({ label, pct }) => (
              <div key={label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-dm text-white/50 uppercase tracking-widest">{label}</span>
                  <span className="text-xs font-dm font-medium" style={{ color: player.accent }}>{pct}</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: player.accent }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Era badge */}
          <div className="border border-white/10 rounded-xl p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bebas text-xl shrink-0"
              style={{ backgroundColor: player.accent + "22", color: player.accent }}
            >
              {player.number}
            </div>
            <div>
              <p className="font-dm text-white font-medium text-sm">{player.fullName}</p>
              <p className="font-dm text-white/40 text-xs mt-0.5">{player.years} · {player.nationality}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Stats