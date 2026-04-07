import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppButton from "@/components/shared/AppButton/AppButton";
import { getUserCart } from "@/components/AddToCart/AddToCart.action";
import { ProductItem } from "./InterfaceCart";
import HandleDeleteProduct from "@/components/AddToCart/HandleDeleteProduct";
import HandleProductQuantity from "@/components/AddToCart/HandleProductQuantity";
import Link from "next/link";

export default async function CartPage() {
  // جلب البيانات مع وضع قيم افتراضية في حالة رجوع null
  const cartData = await getUserCart();
  
  // إذا لم تكن هناك بيانات (خطأ في السيرفر أو السلة ممسوحة تماماً)
  if (!cartData || !cartData.products || cartData.products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <ShoppingCart className="w-20 h-20 text-gray-200" />
        <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
        <Link href="/" className="text-main-color font-semibold hover:underline">
          Start shopping now
        </Link>
      </div>
    );
  }

  const { numOfCartItems, totalCartPrice, products } = cartData;

  function handleShippingFree(count: number) {
    return count >= 500;
  }

  return (
    <div className="bg-gray-50 pt-5 min-h-screen">
      <div className="container mx-auto p-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <ShoppingCart className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Shopping Cart</h1>
        </div>
        <p className="text-gray-500 mb-8 mt-2">
          You have{" "}
          <span className="text-green-600 font-bold">
            {numOfCartItems} items
          </span>{" "}
          in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {products.map((e: ProductItem) => (
              <Card key={e.product._id} className="overflow-hidden border-none shadow-sm">
                <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="group relative w-32 h-32 overflow-hidden rounded-xl border bg-white flex items-center justify-center">
                      <img
                        src={e.product.imageCover}
                        alt={e.product.title}
                        className="w-full h-full object-contain p-1 duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="mt-1">
                      <Badge variant="outline" className="bg-main-color text-white border-green-200 text-[10px] font-bold">
                        ✓ In Stock
                      </Badge>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <h3 className="font-semibold text-lg text-slate-800 leading-tight line-clamp-2">
                      {e.product.title}
                    </h3>
                    <div className="text-green-600 text-[20px] font-semibold">
                      {e.price} EGP <span className="text-gray-400 font-normal text-sm">per unit</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <HandleProductQuantity count={e.count} productId={e.product._id} />
                      <div className="flex gap-3 items-center">
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Total</p>
                          <p className="font-bold text-lg">{e.price * e.count} EGP</p>
                        </div>
                        <HandleDeleteProduct productId={e.product._id} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="overflow-hidden border border-green-100 rounded-2xl shadow bg-white">
              <div className="bg-main-color p-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-bold">Order Summary</span>
                </div>
                <p className="text-xs opacity-90">{numOfCartItems} items</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Shipping Info */}
                <div className={`${handleShippingFree(totalCartPrice) ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'} p-4 flex items-center gap-3 rounded-xl border`}>
                  <div className={`p-2 rounded-full shadow-sm ${handleShippingFree(totalCartPrice) ? 'text-green-600 bg-white' : 'text-orange-600 bg-white'}`}>
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${handleShippingFree(totalCartPrice) ? 'text-green-700' : 'text-orange-700'}`}>
                      {handleShippingFree(totalCartPrice) ? 'Free Shipping!' : 'Shipping: 50 EGP'}
                    </p>
                    <p className="text-[11px] opacity-80">
                      {handleShippingFree(totalCartPrice) ? 'You qualify for free delivery' : 'Add items worth 500 EGP for free shipping'}
                    </p>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">{totalCartPrice} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-bold uppercase">
                      {handleShippingFree(totalCartPrice) ? <span className="text-green-600">Free</span> : "50 EGP"}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100 my-4" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-lg">Total</span>
                    <p className="text-xl font-extrabold text-main-color">
                      {handleShippingFree(totalCartPrice) ? totalCartPrice : totalCartPrice + 50} <span className="text-sm font-normal">EGP</span>
                    </p>
                  </div>
                </div>

                <Link href={'/cart/payment'} className="flex justify-center items-center bg-main-color py-4 rounded-2xl text-white font-semibold gap-3 hover:bg-green-700 transition-colors">
                  <ShieldCheck className="w-5 h-5" /> Secure Checkout
                </Link>

                <div className="text-center">
                   <Link href={'/'} className="text-main-color font-semibold hover:underline text-sm">
                    Continue Shopping
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}