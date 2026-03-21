import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"
import { useNavigate } from "react-router-dom"
import { FiMail, FiLock, FiUser, FiLoader } from "react-icons/fi"
import GOF_Logo from "../../assets/images/GOFlogowhite.png"

function AuthPage() {
  const { login, register } = useContext(AuthContext)
  const { mergeGuestCart } = useContext(CartContext)
  const { mergeGuestWishlist } = useContext(WishlistContext)

  const mergeAll = async () => {
    await Promise.all([mergeGuestCart(), mergeGuestWishlist()])
  }

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password, mergeAll)
      } else {
        await register(name, email, password, mergeAll)
      }
      navigate("/")
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0a0a0a] border-r border-white/5 p-12">
        <img src={GOF_Logo} alt="GOF" className="w-14" />

        <div>
          <p className="nav-dm text-yellow-400 text-xs tracking-[0.3em] uppercase mb-4">
            Goats of Football
          </p>
          <h2 className="nav-bebas text-6xl xl:text-7xl leading-none text-white mb-6">
            The Home of<br />Football<br />Legends
          </h2>
          <p className="nav-dm text-white/30 text-sm leading-relaxed max-w-sm">
            Jerseys, boots, memorabilia — curated for the true football collector.
          </p>
        </div>

        <p className="nav-dm text-white/10 text-xs">© 2026 Goats of Football</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* Mobile logo */}
        <img src={GOF_Logo} alt="GOF" className="w-12 mb-10 lg:hidden" />

        <div className="w-full max-w-sm">

          {/* Title */}
          <div className="mb-8">
            <p className="nav-dm text-yellow-400 text-xs tracking-[0.3em] uppercase mb-2">
              {isLogin ? "Welcome back" : "Join us"}
            </p>
            <h1 className="nav-bebas text-5xl text-white leading-none">
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {!isLogin && (
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="nav-dm w-full bg-white/5 border border-white/10 text-white placeholder-white/20
                    rounded-xl pl-10 pr-4 py-3 text-sm outline-none
                    focus:border-yellow-400/50 focus:bg-white/8 transition-all duration-200"
                />
              </div>
            )}

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="nav-dm w-full bg-white/5 border border-white/10 text-white placeholder-white/20
                  rounded-xl pl-10 pr-4 py-3 text-sm outline-none
                  focus:border-yellow-400/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-sm" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="nav-dm w-full bg-white/5 border border-white/10 text-white placeholder-white/20
                  rounded-xl pl-10 pr-4 py-3 text-sm outline-none
                  focus:border-yellow-400/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="nav-dm text-red-400 text-xs">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="nav-dm mt-2 w-full bg-white text-black font-medium py-3 rounded-full text-sm
                hover:bg-yellow-400 transition-colors duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin text-sm" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>

          </form>

          {/* Switch mode */}
          <p className="nav-dm text-center mt-6 text-white/30 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError("") }}
              className="text-white hover:text-yellow-400 transition-colors font-medium underline underline-offset-2"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>

        </div>
      </div>

    </div>
  )
}

export default AuthPage