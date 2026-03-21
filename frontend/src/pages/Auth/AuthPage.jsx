import { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { CartContext } from "../../context/CartContext"
import { WishlistContext } from "../../context/WishlistContext"
import { useNavigate } from "react-router-dom"

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

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {

    if (isLogin) {
      await login(email, password, mergeAll)
    } else {
      await register(name, email, password, mergeAll)
    }

    navigate("/")

  } catch (err) {
    console.error(err)
    alert("Authentication failed")
  }
}

  return (

    <div className="min-h-screen flex items-center justify-center px-6 bg-white">

      <div className="w-full max-w-sm">

        <h1 className="text-2xl font-semibold text-center mb-6">

          {isLogin ? "Login" : "Create Account"}

        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="border px-3 py-2 rounded"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-black text-white py-2 rounded"
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            onClick={()=>setIsLogin(!isLogin)}
            className="ml-2 text-blue-600"
          >
            {isLogin ? "Register" : "Login"}
          </button>

        </p>

      </div>

    </div>
  )
}

export default AuthPage