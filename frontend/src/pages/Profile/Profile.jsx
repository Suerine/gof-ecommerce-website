import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { FiShoppingBag, FiHeart, FiShoppingCart, FiLogOut, FiUser } from "react-icons/fi"

function ProfilePage() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-center">
          <p className="text-gray-400 mb-4 text-sm tracking-widest uppercase">Not signed in</p>
          <Link to="/login" className="text-black border-b border-black pb-0.5 text-sm">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const links = [
    { to: "/orders", label: "My Orders", icon: FiShoppingBag, desc: "Track & view past orders" },
    { to: "/wishlist", label: "Wishlist", icon: FiHeart, desc: "Items you've saved" },
    { to: "/cart", label: "Cart", icon: FiShoppingCart, desc: "Ready to checkout" },
  ]

  return (
    <div className="min-h-screen bg-[#f7f6f3]">

      {/* Hero banner */}
      <div className="bg-black text-white px-6 sm:px-10 py-14 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/10" />
        <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full border border-white/5" />

        <div className="max-w-4xl mx-auto flex items-center gap-6 relative z-10">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
            <span className="text-black font-bold text-xl sm:text-2xl tracking-tight">
              {initials}
            </span>
          </div>

          <div>
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1">Account</p>
            <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">{user.name}</h1>
            <p className="text-white/50 text-sm mt-0.5">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10">

        {/* Quick links */}
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Quick Access</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {links.map(({ to, label, icon: Icon, desc }) => (
            <Link
              key={to}
              to={to}
              className="group bg-white rounded-xl p-5 flex flex-col gap-3 border border-transparent hover:border-black transition-all duration-200 hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-black/5 group-hover:bg-black group-hover:text-yellow-400 flex items-center justify-center transition-all duration-200">
                <Icon className="text-lg" />
              </div>
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Account info card */}
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Account Details</p>

        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100 mb-10">
          <div className="flex items-center gap-4 px-6 py-4">
            <FiUser className="text-gray-300 text-lg shrink-0" />
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Full Name</p>
              <p className="text-sm font-medium">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-4">
            <svg className="text-gray-300 text-lg shrink-0 w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
            </svg>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Email</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            logout()
            navigate("/")
          }}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          <FiLogOut />
          Sign out
        </button>

      </div>
    </div>
  )
}

export default ProfilePage