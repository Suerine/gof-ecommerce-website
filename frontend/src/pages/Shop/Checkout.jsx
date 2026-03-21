import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { FiChevronRight, FiPhone, FiMapPin, FiUser, FiCheck, FiLoader } from "react-icons/fi"
import API from "../../api/axios"

const CheckoutPage = () => {
  const { cart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1 = shipping, 2 = payment
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null) // null | "pending" | "success" | "failed"
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [polling, setPolling] = useState(false)

  const [shipping, setShipping] = useState({
    fullName: user?.name || "",
    phone: "",
    address: "",
    city: "",
    county: "",
  })

  const normalizeItem = (item) => {
    const isPopulated = item.product && typeof item.product === "object"
    if (!isPopulated) return null
    return {
      id: item._id,
      name: item.product.name,
      image: item.product.images?.[0],
      size: item.size,
      price: item.price,
      quantity: item.quantity,
    }
  }

  const items = (cart?.items || []).map(normalizeItem).filter(Boolean)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping_fee = subtotal >= 5000 ? 0 : 300
  const total = subtotal + shipping_fee

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleMpesaPayment = async (e) => {
    e.preventDefault()
    if (!mpesaPhone) return
    setPaymentLoading(true)
    setPaymentStatus("pending")

    try {
      // Initiate STK push
      const res = await API.post("/api/payments/mpesa/stkpush", {
        phone: mpesaPhone,
        amount: total,
        orderId: `GOF-${Date.now()}`,
        shipping,
      })

      const checkoutRequestId = res.data.CheckoutRequestID

      // Poll for payment status every 3 seconds
      setPolling(true)
      let attempts = 0
      const maxAttempts = 10

      const pollInterval = setInterval(async () => {
        attempts++
        try {
          const statusRes = await API.post("/api/payments/mpesa/query", {
            checkoutRequestId,
          })

          const resultCode = statusRes.data.ResultCode

          if (resultCode === "0") {
            clearInterval(pollInterval)
            setPolling(false)
            setPaymentStatus("success")
            // TODO: clear cart and redirect after success
          } else if (resultCode !== undefined && resultCode !== null) {
            clearInterval(pollInterval)
            setPolling(false)
            setPaymentStatus("failed")
          }
        } catch (err) {
          console.error("Polling error", err)
        }

        if (attempts >= maxAttempts) {
          clearInterval(pollInterval)
          setPolling(false)
          setPaymentStatus("failed")
        }
      }, 3000)

    } catch (err) {
      console.error(err)
      setPaymentStatus("failed")
    } finally {
      setPaymentLoading(false)
    }
  }

  if (!cart || items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f6f3] flex flex-col items-center justify-center gap-4">
        <p className="nav-bebas text-4xl text-gray-300">Nothing to checkout</p>
        <Link to="/products" className="nav-dm text-sm text-black underline">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3]">

      {/* Header */}
      <div className="bg-black text-white px-6 sm:px-10 py-10 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full border border-white/5" />
        <div className="max-w-6xl mx-auto relative z-10 flex items-end justify-between">
          <div>
            <p className="nav-dm text-yellow-400 text-xs tracking-[0.3em] uppercase mb-2">Almost there</p>
            <h1 className="nav-bebas text-6xl sm:text-7xl leading-none">Checkout</h1>
          </div>
          {/* Step indicator */}
          <div className="flex items-center gap-2 pb-1">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs nav-dm font-medium transition-all
                  ${step >= s ? "bg-yellow-400 text-black" : "bg-white/10 text-white/30"}`}>
                  {step > s ? <FiCheck className="text-xs" /> : s}
                </div>
                {s < 2 && <div className={`w-8 h-px ${step > s ? "bg-yellow-400" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 sm:px-10 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs nav-dm text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <FiChevronRight className="text-gray-300" />
          <Link to="/cart" className="hover:text-black transition-colors">Cart</Link>
          <FiChevronRight className="text-gray-300" />
          <span className="text-black font-medium">Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left — forms */}
        <div className="lg:col-span-2 space-y-6">

          {/* STEP 1 — Shipping */}
          <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${step === 1 ? "border-black" : "border-gray-100"}`}>
            <div
              className="px-6 py-4 flex items-center justify-between cursor-pointer"
              onClick={() => setStep(1)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs nav-dm font-medium
                  ${step > 1 ? "bg-yellow-400 text-black" : step === 1 ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>
                  {step > 1 ? <FiCheck className="text-xs" /> : 1}
                </div>
                <p className="nav-dm font-medium text-sm">Shipping Details</p>
              </div>
              {step > 1 && (
                <span className="nav-dm text-xs text-yellow-500 underline">Edit</span>
              )}
            </div>

            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={shipping.fullName}
                      onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                      required
                      className="nav-dm w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                    />
                  </div>
                  {/* Phone */}
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                    <input
                      type="tel"
                      placeholder="Phone (e.g. 0712345678)"
                      value={shipping.phone}
                      onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                      required
                      className="nav-dm w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    required
                    className="nav-dm w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    required
                    className="nav-dm w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="County"
                    value={shipping.county}
                    onChange={(e) => setShipping({ ...shipping, county: e.target.value })}
                    required
                    className="nav-dm w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="nav-dm w-full py-3 bg-black text-white text-sm font-medium rounded-full hover:text-yellow-400 transition-colors mt-2"
                >
                  Continue to Payment →
                </button>
              </form>
            )}

            {/* Shipping summary when done */}
            {step > 1 && (
              <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                <p className="nav-dm text-sm text-gray-600">{shipping.fullName} · {shipping.phone}</p>
                <p className="nav-dm text-sm text-gray-400">{shipping.address}, {shipping.city}, {shipping.county}</p>
              </div>
            )}
          </div>

          {/* STEP 2 — Payment */}
          <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${step === 2 ? "border-black" : "border-gray-100"}`}>
            <div className="px-6 py-4 flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs nav-dm font-medium
                ${paymentStatus === "success" ? "bg-yellow-400 text-black" : step === 2 ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>
                {paymentStatus === "success" ? <FiCheck className="text-xs" /> : 2}
              </div>
              <p className="nav-dm font-medium text-sm">Payment</p>
            </div>

            {step === 2 && (
              <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5">

                {/* Mpesa branding */}
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xs">M</span>
                  </div>
                  <div>
                    <p className="nav-dm text-sm font-medium text-green-800">Pay via M-Pesa</p>
                    <p className="nav-dm text-xs text-green-600">You'll receive an STK push on your phone</p>
                  </div>
                </div>

                {/* Payment status states */}
                {paymentStatus === "pending" && (
                  <div className="flex flex-col items-center gap-3 py-6">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                      <FiLoader className="text-green-500 text-xl animate-spin" />
                    </div>
                    <p className="nav-dm text-sm font-medium">Check your phone</p>
                    <p className="nav-dm text-xs text-gray-400 text-center max-w-xs">
                      An M-Pesa prompt has been sent to <strong>{mpesaPhone}</strong>. Enter your PIN to complete payment.
                    </p>
                    {polling && <p className="nav-dm text-xs text-gray-300 animate-pulse">Waiting for confirmation...</p>}
                  </div>
                )}

                {paymentStatus === "success" && (
                  <div className="flex flex-col items-center gap-3 py-6">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
                      <FiCheck className="text-black text-xl" />
                    </div>
                    <p className="nav-bebas text-2xl text-black">Payment Successful!</p>
                    <p className="nav-dm text-xs text-gray-400 text-center">Your order has been placed. We'll be in touch shortly.</p>
                    <Link
                      to="/"
                      className="nav-dm mt-2 px-8 py-2.5 bg-black text-white text-sm rounded-full hover:text-yellow-400 transition-colors"
                    >
                      Back to Home
                    </Link>
                  </div>
                )}

                {paymentStatus === "failed" && (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                      <span className="text-red-500 text-lg">✕</span>
                    </div>
                    <p className="nav-dm text-sm font-medium text-red-600">Payment failed or timed out</p>
                    <button
                      onClick={() => setPaymentStatus(null)}
                      className="nav-dm text-xs underline text-gray-400 hover:text-black transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {/* Phone input — only show when not pending/success */}
                {!paymentStatus && (
                  <form onSubmit={handleMpesaPayment} className="space-y-4">
                    <div className="relative">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
                      <input
                        type="tel"
                        placeholder="M-Pesa number (e.g. 0712345678)"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        required
                        className="nav-dm w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <p className="nav-dm text-sm text-gray-500">Amount to pay</p>
                      <p className="nav-bebas text-2xl text-black">KSh {total.toLocaleString()}</p>
                    </div>

                    <button
                      type="submit"
                      disabled={paymentLoading}
                      className="nav-dm w-full py-3.5 bg-green-500 text-white text-sm font-medium rounded-full
                        hover:bg-green-600 transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2"
                    >
                      {paymentLoading ? (
                        <><FiLoader className="animate-spin" /> Sending prompt...</>
                      ) : (
                        <>Pay KSh {total.toLocaleString()} via M-Pesa</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right — Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">

            <p className="nav-dm text-xs tracking-[0.2em] uppercase text-gray-400 mb-5">Order Summary</p>

            <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="nav-dm text-xs font-medium text-black truncate">{item.name}</p>
                    <p className="nav-dm text-xs text-gray-400 uppercase tracking-widest">{item.size} · ×{item.quantity}</p>
                  </div>
                  <p className="nav-dm text-xs font-medium shrink-0">KSh {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-100 mb-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <p className="nav-dm text-sm text-gray-500">Subtotal</p>
                <p className="nav-dm text-sm">KSh {subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="nav-dm text-sm text-gray-500">Shipping</p>
                <p className="nav-dm text-sm">
                  {shipping_fee === 0
                    ? <span className="text-green-500">Free</span>
                    : `KSh ${shipping_fee.toLocaleString()}`
                  }
                </p>
              </div>
              {shipping_fee > 0 && (
                <p className="nav-dm text-xs text-gray-400">Free delivery on orders over KSh 5,000</p>
              )}
            </div>

            <div className="h-px bg-gray-100 mb-4" />

            <div className="flex justify-between items-center">
              <p className="nav-dm text-sm font-medium">Total</p>
              <p className="nav-bebas text-3xl text-black leading-none">KSh {total.toLocaleString()}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default CheckoutPage