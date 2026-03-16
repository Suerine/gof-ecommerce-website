import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

function ProfilePage() {

  const { user, logout } = useContext(AuthContext)

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>You must be logged in</p>
      </div>
    )
  }

  return (

    <div className="max-w-4xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-semibold mb-8">
        My Profile
      </h1>

      {/* User Info */}
      <div className="bg-white shadow p-6 rounded mb-8">

        <h2 className="text-xl font-medium mb-4">
          Account Information
        </h2>

        <p className="mb-2">
          <span className="font-semibold">Name:</span> {user.name}
        </p>

        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>

      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          to="/orders"
          className="border border-black p-4 rounded-full hover:bg-black hover:text-yellow-400 text-center"
        >
          My Orders
        </Link>

        <Link
          to="/wishlist"
          className="border border-black p-4 rounded-full hover:bg-black hover:text-yellow-400 text-center"
        >
          Wishlist
        </Link>

        <Link
          to="/cart"
          className="border border-black p-4 rounded-full hover:bg-black hover:text-yellow-400 text-center"
        >
          Cart
        </Link>

      </div>

      {/* Logout */}
      <div className="mt-10">

        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700"
        >
          Logout
        </button>

      </div>

    </div>

  )
}

export default ProfilePage