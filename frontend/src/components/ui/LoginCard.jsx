import { useEffect, useRef, useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

function LoginCard({ isOpen, setIsOpen }) {

  const cardRef = useRef()
  const [mode, setMode] = useState("login")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { user, login, register, logout } = useContext(AuthContext)

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  const handleSubmit = async () => {
    try {

      if (mode === "login") {
        await login(email, password)
      } else {
        await register(fullName, email, password)
      }

      setFullName("")
      setEmail("")
      setPassword("")
      setError("")

      setIsOpen(false)

    } catch (err) {

      setError(
        err.response?.data?.message || "Something went wrong"
      )

    }
  }

  return (
    <div
      ref={cardRef}
      className="absolute right-6 top-20 bg-white text-black w-72 p-6 rounded-xs shadow-xl hidden md:block z-50 border-2 border-gray-50"
    >

      {/* LOGGED IN VIEW */}
      {user ? (
        <div className="text-center">

          <h2 className="text-xl font-semibold mb-4">
            Hi, {user.name}
          </h2>

          <Link
            to="/profile"
            className="block mb-3 text-blue-500 hover:underline"
          >
            View Profile
          </Link>

          <button
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      ) : (

        <>
          {/* Title */}
          <h2 className="text-xl font-semibold mb-4">
            {mode === "login" ? "Login" : "Create Account"}
          </h2>

          {/* SIGNUP NAME */}
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit()
              }
            }}
          />

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-neutral-800 py-2 rounded-full font-light text-white hover:text-amber-300 hover:bg-neutral-950"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {error}
            </p>
          )}

          {/* Switch Mode */}
          <p className="text-sm mt-3 text-center">

            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setMode("signup")
                    setError("")
                  }}
                  className="text-blue-500"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("login")
                    setError("")
                  }}
                  className="text-blue-500"
                >
                  Login
                </button>
              </>
            )}

          </p>
        </>
      )}

    </div>
  )
}

export default LoginCard