function PlayerCard({ player }) {
  return (
    <div className="
      group relative rounded-2xl overflow-hidden
      bg-black text-white
      hover:scale-105 transition duration-300
      shadow-xl
    ">
      
      {/* Image */}
      <img
        src={player.image}
        alt={player.name}
        className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 p-4 w-full">
        <h2 className="text-lg font-bold">{player.name}</h2>
        <p className="text-sm text-gray-300">{player.country}</p>

        {/* Stats */}
        <div className="flex justify-between mt-4 text-center">
          <div>
            <p className="text-xl font-bold">{player.stats.goals}</p>
            <p className="text-xs text-gray-400">Goals</p>
          </div>

          <div>
            <p className="text-xl font-bold">{player.stats.trophies}</p>
            <p className="text-xs text-gray-400">Trophies</p>
          </div>

          <div>
            <p className="text-xl font-bold">{player.stats.worldCups}</p>
            <p className="text-xs text-gray-400">World Cups</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default PlayerCard