import { useEffect, useRef, useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"
import { FiUser, FiMail, FiLock, FiLogOut, FiLoader } from "react-icons/fi"

function LoginCard({ isOpen, setIsOpen }) {
  const cardRef = useRef()
  const [mode, setMode] = useState("login")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { user, login, register, logout } = useContext(AuthContext)
  const { mergeGuestCart } = useContext(CartContext)
  const { mergeGuestWishlist } = useContext(WishlistContext)

  const mergeAll = async () => {
    await Promise.all([mergeGuestCart(), mergeGuestWishlist()])
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (mode === "login") {
        await login(email, password, mergeAll)
      } else {
        await register(fullName, email, password, mergeAll)
      }
      setFullName("")
      setEmail("")
      setPassword("")
      setError("")
      setIsOpen(false)
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      ref={cardRef}
      className="absolute right-6 top-[4.5rem] hidden md:block z-50 w-80"
    >
      {/* Card */}
      <div className="bg-white shadow-2xl borderoverflow-hidden rounded-sm">

        {/* Logged in view */}
        {user ? (
          <div>
            {/* Header */}
            <div className="bg-black px-6 py-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                <span className="text-black font-bold text-sm">
                  {user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-sm leading-tight">{user.name}</p>
                <p className="text-white/40 text-xs">{user.email}</p>
              </div>
            </div>

            <div className="px-6 py-4 flex flex-col gap-2">
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2 text-sm font-medium border text-black border-black rounded-full hover:bg-black hover:text-yellow-400 transition-all duration-200"
              >
                View Profile
              </Link>
              <button
                onClick={() => { logout(); setIsOpen(false) }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                <FiLogOut className="text-sm" />
                Sign out
              </button>
            </div>
          </div>

        ) : (
          <div>
            {/* Header */}
            <div className="bg-black px-6 py-5">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
                {mode === "login" ? "Welcome back" : "Join us"}
              </p>
              <h2 className="text-white text-lg font-semibold">
                {mode === "login" ? "Sign In" : "Create Account"}
              </h2>
            </div>

            {/* Form */}
            <div className="px-6 py-5 flex flex-col gap-3">
              {mode === "signup" && (
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-black transition-colors text-gray-500"
                  />
                </div>
              )}

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-black transition-colors text-gray-500"
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-black transition-colors text-gray-500"
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs text-center bg-red-50 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:text-yellow-400 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin text-sm" />
                    {mode === "login" ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  mode === "login" ? "Sign In" : "Create Account"
                )}
              </button>

              <p className="text-xs text-center text-gray-400 mt-1">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError("") }}
                  className="text-black font-medium underline underline-offset-2"
                >
                  {mode === "login" ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginCard