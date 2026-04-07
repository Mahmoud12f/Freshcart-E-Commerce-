import { getUserToken } from "@/app/myUtil";
import { jwtDecode } from "jwt-decode";
import { Package, Calendar, MapPin, ShoppingBag, ChevronDown, Clock3 } from "lucide-react";
import Link from "next/link";

export default async function MyOrders() {
    // 1. جلب التوكن والتأكد من نوعه
    const token = await getUserToken() as string;

    // 2. فحص الأمان: لو مفيش توكن (المستخدم مش مسجل دخول)
    if (!token) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <Package size={60} className="text-gray-200" />
                <h2 className="text-2xl font-bold text-gray-800">Please login to view your orders</h2>
                <Link href="/login" className="bg-main-color text-white px-6 py-2 rounded-lg">Login Now</Link>
            </div>
        );
    }

    // 3. فك التوكن وجلب الـ userId
    const decoded: any = jwtDecode(token);
    const userId = decoded.id;

    // 4. جلب الطلبات من الـ API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`, {
        cache: 'no-store'
    });
    
    const orders = await res.json();

    return (
        <div className=" min-h-screen py-10">
            <div className="container mx-auto px-4">
                
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-6 flex gap-2">
                    <Link href="/" className="hover:text-main-color">Home</Link>
                    <span>/</span>
                    <span className="text-gray-800 font-medium">My Orders</span>
                </nav>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#198754] p-3 rounded-xl text-white shadow-lg shadow-green-100">
                            <ShoppingBag size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                            <p className="text-gray-500 text-sm font-medium">
                                Track and manage your <span className="text-main-color">{orders?.length || 0}</span> orders
                            </p>
                        </div>
                    </div>
                    <Link href="/" className="text-main-color font-semibold flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-gray-100 hover:shadow-sm transition-all">
                        <span className="w-2 h-2 bg-main-color rounded-full animate-pulse"></span>
                        Continue Shopping
                    </Link>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {orders && orders.length > 0 ? (
                        orders.map((order: any) => (
                            <div key={order._id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative group">
                                
                                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                                    
                                    {/* Left: Images Stack */}
                                    <div className="relative flex items-center justify-center min-w-[120px]">
                                        <div className="relative group-hover:scale-105 transition-transform">
                                            <img 
                                                src={order.cartItems[0]?.product.imageCover} 
                                                className="w-24 h-24 rounded-2xl object-contain p-2 border border-gray-50 bg-gray-50/50"
                                                alt="product"
                                            />
                                            {order.cartItems.length > 1 && (
                                                <span className="absolute -top-3 -right-3 bg-slate-900 text-white text-xs font-bold px-2.5 py-1 rounded-full border-2 border-white shadow-sm">
                                                    +{order.cartItems.length - 1}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Middle: Order Info */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                <Clock3 size={12} /> {order.isPaid ? 'Paid' : 'Processing'}
                                            </span>
                                            <span className="text-gray-300">|</span>
                                            <span className="text-xs font-bold text-gray-400">ID: {order.id}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-800">Order from {order.shippingAddress.city}</h3>

                                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={16} className="text-gray-400" /> 
                                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                                {order.cartItems.reduce((acc: number, item: any) => acc + item.count, 0)} items
                                            </span>
                                            <span className="flex items-center gap-1.5 capitalize">
                                                <MapPin size={16} className="text-gray-400" />
                                                {order.shippingAddress.city}
                                            </span>
                                        </div>

                                        <div className="pt-2 flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-main-color">
                                                {order.totalOrderPrice} 
                                            </span>
                                            <span className="text-gray-400 font-bold text-xs uppercase">EGP</span>
                                        </div>
                                    </div>

                                    {/* Right: Actions */}
                                    <div className="flex flex-col gap-3 min-w-[140px]">
                                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-700 hover:border-main-color hover:text-main-color transition-all">
                                            Details <ChevronDown size={18} />
                                        </button>
                                    </div>

                                    {/* Floating Icon */}
                                    <div className="absolute top-6 right-6 text-gray-100 group-hover:text-green-50 transition-colors">
                                        <Package size={40} />
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-24  ">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Package size={40} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found yet</h3>
                            <p className="text-gray-400 mb-8">Looks like you haven't made your first order yet.</p>
                            <Link href="/" className="bg-main-color text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all">
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}