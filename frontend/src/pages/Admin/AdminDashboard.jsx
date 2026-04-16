// import { useEffect, useState, useContext } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import { AuthContext } from "../../context/AuthContext"
// import API from "../../api/axios"
// import {
//   FiPackage, FiUsers, FiAlertTriangle, FiPlus,
//   FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight,
//   FiSearch, FiX, FiChevronLeft, FiChevronRight,
//   FiGrid, FiBarChart2, FiLogOut, FiEye, FiEyeOff
// } from "react-icons/fi"
// import toast from "react-hot-toast"
 
// const CATEGORIES = ["All", "Jerseys", "Boots", "Balls"]
 
// // ─── Stat Card ────────────────────────────────────────────────────────────────
// const StatCard = ({ icon: Icon, label, value, sub, accent }) => (
//   <div className="bg-white rounded-2xl border border-gray-100 p-5">
//     <div className="flex items-start justify-between mb-4">
//       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}>
//         <Icon className="text-lg" />
//       </div>
//     </div>
//     <p className="nav-bebas text-3xl text-black leading-none">{value}</p>
//     <p className="nav-dm text-xs text-gray-400 mt-1 uppercase tracking-widest">{label}</p>
//     {sub && <p className="nav-dm text-xs text-gray-300 mt-0.5">{sub}</p>}
//   </div>
// )
 
// // ─── Product Form Modal ───────────────────────────────────────────────────────
// const ProductModal = ({ product, onClose, onSave }) => {
//   const [form, setForm] = useState({
//     name: product?.name || "",
//     description: product?.description || "",
//     price: product?.price || "",
//     category: product?.category || "Jerseys",
//     images: product?.images?.join(", ") || "",
//     featured: product?.featured || false,
//     isActive: product?.isActive ?? true,
//     sizes: product?.sizes?.map(s => `${s.size}:${s.stock}`).join(", ") || "",
//   })
//   const [saving, setSaving] = useState(false)
 
//   const handleSave = async () => {
//     if (!form.name || !form.price || !form.category) {
//       toast.error("Name, price and category are required")
//       return
//     }
//     setSaving(true)
//     try {
//       const payload = {
//         ...form,
//         price: Number(form.price),
//         images: form.images.split(",").map(s => s.trim()).filter(Boolean),
//         sizes: form.sizes.split(",").map(s => {
//           const [size, stock] = s.trim().split(":")
//           return { size: size?.trim(), stock: Number(stock) || 0 }
//         }).filter(s => s.size),
//       }
//       await onSave(payload)
//       onClose()
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to save product")
//     } finally {
//       setSaving(false)
//     }
//   }
 
//   const inputCls = "nav-dm w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-black transition-colors"
//   const labelCls = "nav-dm text-xs text-gray-400 uppercase tracking-widest mb-1 block"
 
//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b border-gray-100">
//           <h2 className="nav-bebas text-2xl">{product ? "Edit Product" : "New Product"}</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//             <FiX className="text-gray-400" />
//           </button>
//         </div>
 
//         <div className="p-6 space-y-4">
//           <div>
//             <label className={labelCls}>Name *</label>
//             <input className={inputCls} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Product name" />
//           </div>
 
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className={labelCls}>Price (KSh) *</label>
//               <input type="number" className={inputCls} value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="2500" />
//             </div>
//             <div>
//               <label className={labelCls}>Category *</label>
//               <select className={inputCls} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
//                 {["Jerseys", "Boots", "Balls"].map(c => <option key={c}>{c}</option>)}
//               </select>
//             </div>
//           </div>
 
//           <div>
//             <label className={labelCls}>Description</label>
//             <textarea className={inputCls} rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Product description..." />
//           </div>
 
//           <div>
//             <label className={labelCls}>Image URLs (comma separated)</label>
//             <textarea className={inputCls} rows={2} value={form.images} onChange={e => setForm({...form, images: e.target.value})} placeholder="https://..., https://..." />
//           </div>
 
//           <div>
//             <label className={labelCls}>Sizes & Stock (e.g. S:10, M:5, L:8)</label>
//             <input className={inputCls} value={form.sizes} onChange={e => setForm({...form, sizes: e.target.value})} placeholder="S:10, M:5, L:8, XL:3" />
//           </div>
 
//           <div className="flex items-center gap-6">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 accent-black" />
//               <span className="nav-dm text-sm text-gray-600">Featured</span>
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-4 h-4 accent-black" />
//               <span className="nav-dm text-sm text-gray-600">Active</span>
//             </label>
//           </div>
//         </div>
 
//         <div className="flex gap-3 p-6 border-t border-gray-100">
//           <button onClick={onClose} className="nav-dm flex-1 py-2.5 border border-gray-200 rounded-full text-sm text-gray-500 hover:border-gray-400 transition-colors">
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="nav-dm flex-1 py-2.5 bg-black text-white rounded-full text-sm hover:text-yellow-400 transition-colors disabled:opacity-50"
//           >
//             {saving ? "Saving..." : "Save Product"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
 
// // ─── Main Dashboard ───────────────────────────────────────────────────────────
// const AdminDashboard = () => {
//   const { user, logout } = useContext(AuthContext)
//   const navigate = useNavigate()
 
//   const [activeTab, setActiveTab] = useState("overview")
//   const [stats, setStats] = useState(null)
//   const [statsLoading, setStatsLoading] = useState(true)
 
//   const [products, setProducts] = useState([])
//   const [productsLoading, setProductsLoading] = useState(false)
//   const [total, setTotal] = useState(0)
//   const [page, setPage] = useState(1)
//   const [pages, setPages] = useState(1)
//   const [search, setSearch] = useState("")
//   const [categoryFilter, setCategoryFilter] = useState("All")
 
//   const [modalOpen, setModalOpen] = useState(false)
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [deleteId, setDeleteId] = useState(null)
 
//   // Auth guard
//   useEffect(() => {
//     if (user && user.role !== "admin") navigate("/")
//     if (!user) navigate("/login")
//   }, [user])
 
//   // Fetch stats
//   useEffect(() => {
//     if (activeTab !== "overview") return
//     const fetch = async () => {
//       setStatsLoading(true)
//       try {
//         const res = await API.get("/api/admin/stats")
//         setStats(res.data)
//       } catch (err) {
//         toast.error("Failed to load stats")
//       } finally {
//         setStatsLoading(false)
//       }
//     }
//     fetch()
//   }, [activeTab])
 
//   // Fetch products
//   useEffect(() => {
//     if (activeTab !== "products") return
//     const fetch = async () => {
//       setProductsLoading(true)
//       try {
//         const params = new URLSearchParams({ page, limit: 12 })
//         if (search) params.set("search", search)
//         if (categoryFilter !== "All") params.set("category", categoryFilter)
//         const res = await API.get(`/api/admin/products?${params}`)
//         setProducts(res.data.products)
//         setTotal(res.data.total)
//         setPages(res.data.pages)
//       } catch (err) {
//         toast.error("Failed to load products")
//       } finally {
//         setProductsLoading(false)
//       }
//     }
//     fetch()
//   }, [activeTab, page, search, categoryFilter])
 
//   const handleCreate = async (payload) => {
//     await API.post("/api/admin/products", payload)
//     toast.success("Product created")
//     setPage(1)
//     setActiveTab("products") // refresh
//   }
 
//   const handleUpdate = async (payload) => {
//     await API.put(`/api/admin/products/${editingProduct._id}`, payload)
//     toast.success("Product updated")
//     setProducts(prev => prev.map(p => p._id === editingProduct._id ? { ...p, ...payload } : p))
//   }
 
//   const handleToggle = async (id, current) => {
//     await API.patch(`/api/admin/products/${id}/toggle`)
//     setProducts(prev => prev.map(p => p._id === id ? { ...p, isActive: !current } : p))
//     toast.success(current ? "Product hidden" : "Product visible")
//   }
 
//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/api/admin/products/${id}`)
//       setProducts(prev => prev.filter(p => p._id !== id))
//       setTotal(prev => prev - 1)
//       toast.success("Product deleted")
//       setDeleteId(null)
//     } catch (err) {
//       toast.error("Failed to delete")
//     }
//   }
 
//   if (!user || user.role !== "admin") return null
 
//   const tabs = [
//     { id: "overview", label: "Overview", icon: FiBarChart2 },
//     { id: "products", label: "Products", icon: FiPackage },
//   ]
 
//   return (
//     <div className="min-h-screen bg-[#f7f6f3] flex">
 
//       {/* Sidebar */}
//       <aside className="w-56 bg-black flex flex-col shrink-0 fixed top-0 left-0 bottom-0 z-40">
//         <div className="px-5 py-5 border-b border-white/5">
//           <Link to="/" className="nav-bebas text-2xl text-white tracking-wide">GOF <span className="text-yellow-400">Admin</span></Link>
//         </div>
 
//         <nav className="flex-1 px-3 py-4 space-y-1">
//           {tabs.map(({ id, label, icon: Icon }) => (
//             <button
//               key={id}
//               onClick={() => setActiveTab(id)}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm nav-dm transition-all
//                 ${activeTab === id ? "bg-yellow-400 text-black font-medium" : "text-white/40 hover:text-white hover:bg-white/5"}`}
//             >
//               <Icon className="text-base shrink-0" />
//               {label}
//             </button>
//           ))}
//         </nav>
 
//         <div className="px-3 py-4 border-t border-white/5 space-y-2">
//           <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm nav-dm text-white/30 hover:text-white hover:bg-white/5 transition-all">
//             <FiGrid className="text-base" /> View Site
//           </Link>
//           <button
//             onClick={() => { logout(); navigate("/") }}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm nav-dm text-white/30 hover:text-red-400 hover:bg-white/5 transition-all"
//           >
//             <FiLogOut className="text-base" /> Sign Out
//           </button>
//         </div>
//       </aside>
 
//       {/* Main content */}
//       <main className="ml-56 flex-1 min-h-screen">
 
//         {/* Top bar */}
//         <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
//           <div>
//             <p className="nav-bebas text-2xl text-black capitalize">{activeTab}</p>
//             <p className="nav-dm text-xs text-gray-400">Welcome back, {user.name}</p>
//           </div>
//           {activeTab === "products" && (
//             <button
//               onClick={() => { setEditingProduct(null); setModalOpen(true) }}
//               className="nav-dm flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm hover:text-yellow-400 transition-colors"
//             >
//               <FiPlus className="text-sm" /> Add Product
//             </button>
//           )}
//         </header>
 
//         <div className="px-8 py-8">
 
//           {/* ── OVERVIEW TAB ── */}
//           {activeTab === "overview" && (
//             <div className="space-y-8">
//               {statsLoading ? (
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                   {Array.from({length: 4}).map((_, i) => (
//                     <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-28 animate-pulse" />
//                   ))}
//                 </div>
//               ) : stats && (
//                 <>
//                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                     <StatCard icon={FiPackage} label="Total Products" value={stats.products.total} sub={`${stats.products.active} active`} accent="bg-yellow-50 text-yellow-600" />
//                     <StatCard icon={FiAlertTriangle} label="Out of Stock" value={stats.products.outOfStock} sub="Need restocking" accent="bg-red-50 text-red-500" />
//                     <StatCard icon={FiUsers} label="Total Users" value={stats.users.total} sub={`${stats.users.admins} admin(s)`} accent="bg-blue-50 text-blue-500" />
//                     <StatCard icon={FiPackage} label="Categories" value={stats.products.byCategory.length} sub="Active categories" accent="bg-green-50 text-green-600" />
//                   </div>
 
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {/* Recent products */}
//                     <div className="bg-white rounded-2xl border border-gray-100 p-6">
//                       <p className="nav-dm text-xs text-gray-400 uppercase tracking-widest mb-4">Recent Products</p>
//                       <div className="space-y-3">
//                         {stats.recentProducts.map(p => (
//                           <div key={p._id} className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
//                               {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="nav-dm text-sm font-medium truncate">{p.name}</p>
//                               <p className="nav-dm text-xs text-gray-400">{p.category}</p>
//                             </div>
//                             <div className="text-right">
//                               <p className="nav-bebas text-base text-yellow-500">{p.price?.toLocaleString()}</p>
//                               <span className={`text-xs nav-dm px-2 py-0.5 rounded-full ${p.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
//                                 {p.isActive ? "Active" : "Hidden"}
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
 
//                     {/* Low stock */}
//                     <div className="bg-white rounded-2xl border border-gray-100 p-6">
//                       <p className="nav-dm text-xs text-gray-400 uppercase tracking-widest mb-4">Low Stock Alert</p>
//                       {stats.lowStockProducts.length === 0 ? (
//                         <p className="nav-dm text-sm text-gray-300">All products are well stocked</p>
//                       ) : (
//                         <div className="space-y-3">
//                           {stats.lowStockProducts.map(p => (
//                             <div key={p._id} className="flex items-center gap-3">
//                               <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
//                                 {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <p className="nav-dm text-sm font-medium truncate">{p.name}</p>
//                                 <div className="flex flex-wrap gap-1 mt-0.5">
//                                   {p.sizes?.filter(s => s.stock < 5).map(s => (
//                                     <span key={s.size} className="text-xs nav-dm bg-red-50 text-red-500 px-1.5 py-0.5 rounded">
//                                       {s.size}: {s.stock} left
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
 
//                   {/* Category breakdown */}
//                   <div className="bg-white rounded-2xl border border-gray-100 p-6">
//                     <p className="nav-dm text-xs text-gray-400 uppercase tracking-widest mb-4">Products by Category</p>
//                     <div className="flex flex-wrap gap-3">
//                       {stats.products.byCategory.map(cat => (
//                         <div key={cat._id} className="flex items-center gap-2 bg-[#f7f6f3] rounded-xl px-4 py-3">
//                           <p className="nav-bebas text-xl text-black">{cat.count}</p>
//                           <p className="nav-dm text-sm text-gray-500">{cat._id}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
 
//           {/* ── PRODUCTS TAB ── */}
//           {activeTab === "products" && (
//             <div className="space-y-5">
//               {/* Filters */}
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="relative flex-1 max-w-xs">
//                   <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={search}
//                     onChange={e => { setSearch(e.target.value); setPage(1) }}
//                     className="nav-dm w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-black transition-colors bg-white"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   {CATEGORIES.map(cat => (
//                     <button
//                       key={cat}
//                       onClick={() => { setCategoryFilter(cat); setPage(1) }}
//                       className={`nav-dm px-4 py-2 text-xs rounded-full border transition-all
//                         ${categoryFilter === cat ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"}`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
 
//               {/* Count */}
//               <p className="nav-dm text-xs text-gray-400">{total} product{total !== 1 ? "s" : ""}</p>
 
//               {/* Table */}
//               <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
//                 {productsLoading ? (
//                   <div className="p-8 flex items-center justify-center">
//                     <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
//                   </div>
//                 ) : products.length === 0 ? (
//                   <div className="p-12 text-center">
//                     <p className="nav-bebas text-3xl text-gray-200">No Products Found</p>
//                   </div>
//                 ) : (
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead>
//                         <tr className="border-b border-gray-100">
//                           <th className="nav-dm text-xs text-gray-400 uppercase tracking-widest text-left px-6 py-3">Product</th>
//                           <th className="nav-dm text-xs text-gray-400 uppercase tracking-widest text-left px-4 py-3">Category</th>
//                           <th className="nav-dm text-xs text-gray-400 uppercase tracking-widest text-left px-4 py-3">Price</th>
//                           <th className="nav-dm text-xs text-gray-400 uppercase tracking-widest text-left px-4 py-3">Status</th>
//                           <th className="nav-dm text-xs text-gray-400 uppercase tracking-widest text-right px-6 py-3">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-50">
//                         {products.map(product => (
//                           <tr key={product._id} className="hover:bg-gray-50 transition-colors">
//                             <td className="px-6 py-4">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
//                                   {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />}
//                                 </div>
//                                 <div>
//                                   <p className="nav-dm text-sm font-medium text-black">{product.name}</p>
//                                   {product.featured && <span className="text-xs nav-dm text-yellow-500">Featured</span>}
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-4">
//                               <span className="nav-dm text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{product.category}</span>
//                             </td>
//                             <td className="px-4 py-4">
//                               <p className="nav-bebas text-base text-yellow-500">KSh {product.price?.toLocaleString()}</p>
//                             </td>
//                             <td className="px-4 py-4">
//                               <span className={`nav-dm text-xs px-2.5 py-1 rounded-full ${product.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
//                                 {product.isActive ? "Active" : "Hidden"}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4">
//                               <div className="flex items-center justify-end gap-2">
//                                 <button
//                                   onClick={() => handleToggle(product._id, product.isActive)}
//                                   className="p-1.5 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
//                                   title={product.isActive ? "Hide" : "Show"}
//                                 >
//                                   {product.isActive ? <FiEye className="text-sm" /> : <FiEyeOff className="text-sm" />}
//                                 </button>
//                                 <button
//                                   onClick={() => { setEditingProduct(product); setModalOpen(true) }}
//                                   className="p-1.5 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
//                                 >
//                                   <FiEdit2 className="text-sm" />
//                                 </button>
//                                 <button
//                                   onClick={() => setDeleteId(product._id)}
//                                   className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
//                                 >
//                                   <FiTrash2 className="text-sm" />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
 
//               {/* Pagination */}
//               {pages > 1 && (
//                 <div className="flex items-center justify-between">
//                   <p className="nav-dm text-xs text-gray-400">Page {page} of {pages}</p>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setPage(p => Math.max(1, p - 1))}
//                       disabled={page === 1}
//                       className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 hover:border-black transition-colors"
//                     >
//                       <FiChevronLeft className="text-sm" />
//                     </button>
//                     <button
//                       onClick={() => setPage(p => Math.min(pages, p + 1))}
//                       disabled={page === pages}
//                       className="p-2 border border-gray-200 rounded-lg disabled:opacity-40 hover:border-black transition-colors"
//                     >
//                       <FiChevronRight className="text-sm" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
 
//         </div>
//       </main>
 
//       {/* Product modal */}
//       {modalOpen && (
//         <ProductModal
//           product={editingProduct}
//           onClose={() => { setModalOpen(false); setEditingProduct(null) }}
//           onSave={editingProduct ? handleUpdate : handleCreate}
//         />
//       )}
 
//       {/* Delete confirm */}
//       {deleteId && (
//         <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
//             <p className="nav-bebas text-2xl mb-2">Delete Product?</p>
//             <p className="nav-dm text-sm text-gray-500 mb-6">This action cannot be undone.</p>
//             <div className="flex gap-3">
//               <button onClick={() => setDeleteId(null)} className="nav-dm flex-1 py-2.5 border border-gray-200 rounded-full text-sm text-gray-500 hover:border-gray-400 transition-colors">
//                 Cancel
//               </button>
//               <button onClick={() => handleDelete(deleteId)} className="nav-dm flex-1 py-2.5 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors">
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
 
//     </div>
//   )
// }
 
// export default AdminDashboard