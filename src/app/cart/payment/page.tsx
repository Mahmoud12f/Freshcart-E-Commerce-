import {
  Plus,
  Minus,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Trash,
  ShoppingBag,
  Home,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { getUserCart } from "@/components/AddToCart/AddToCart.action";

import HandleDeleteProduct from "@/components/AddToCart/HandleDeleteProduct";
import HandleProductQuantity from "@/components/AddToCart/HandleProductQuantity";
import Link from "next/link";
import { Arrow } from "radix-ui/internal";
import PaymentForm from "./PaymentForm";
import AppButton from "./../../../components/shared/AppButton/AppButton";

export default async function CartPage() {
  
  const cartData = await getUserCart();

 
  if (!cartData) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold">Your cart is currently unavailable</h2>
        <p>Please try again later or make sure you are logged in.</p>
      </div>
    );
  }

 
  const { numOfCartItems, totalCartPrice, products, cartId } = cartData;

  function handleShippingFree(count: number) {
    return count >= 500;
  }



  return (
    <div className="bg-gray-50 pt-5 min-h-screen">
      <div className="container mx-auto p-3">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <FileText className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
              Complete Your Order
            </h1>
          </div>
          <p className="text-gray-500 mb-8 mt-2">
            Review your items and complete your purchase
          </p>
        </div>

        {/* الـ Grid الأساسي - تأكد من وجود items-start عشان الـ Sticky يشتغل */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2  space-y-4">
            <PaymentForm cartId={cartId} />
          </div>

          {/* Right Side: Order Summary (Sticky Part) */}
          <div className="lg:col-span-1 sticky top-23">
            <div className="overflow-hidden border border-green-100 rounded-2xl shadow bg-white">
              <div className="bg-main-color p-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-bold">Order Summary</span>
                </div>
                <p className="text-xs opacity-90">
                  {numOfCartItems} items in your cart
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Shipping Info */}
                <div className=" space-y-2 h-50 overflow-auto">
                  {products.map((e: any) => (
                    <Card
                      key={e.product._id}
                      className=" bg-gray-100 p-2 border-none shadow-sm"
                    >
                      <CardContent className="p-0 flex items-center gap-3">
                        {/* Product Image */}
                        <div className="flex  items-center shrink-0">
                          <div className=" relative w-15 h-15 overflow-hidden rounded-2xl border bg-white flex ">
                            <img
                              src={e.product.imageCover}
                              alt={e.product.title}
                              className="w-full h-full object-contain p-1 duration-300 group-hover:scale-110"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex justify-between space-y-2 w-full">
                          <div>
                            <h3 className="font-semibold  text-slate-800 leading-tight line-clamp-2">
                              {e.product.title}
                            </h3>

                            <div className="text-gray-900 flex gap-1 text-[12px] font-semibold">
                              <span className="text-gray-900 font-normal text-sm">{e.count}</span>
                              <span>x</span>
                              <span className="text-gray-900 font-normal text-sm">
                                {e.price} EGP
                              </span>
                            </div>
                          </div>

                          <div className="flex ">
                            <div className="text-right">
                            
                              <p className="font-bold text-lg">
                                {e.price * e.count} 
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-900">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-800">
                      {totalCartPrice} EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>Shipping</span>
                    {handleShippingFree(totalCartPrice) ? (
                      <span className="text-green-600 font-bold uppercase">
                        Free
                      </span>
                    ) : (
                      <span className="text-black font-bold uppercase">
                        50 EGP
                      </span>
                    )}
                  </div>
                  <div className="h-px bg-gray-100 my-4" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-lg text-slate-900">
                      Total
                    </span>
                    <p className="text-xl font-extrabold text-main-color">
                      {totalCartPrice}{" "}
                      <span className="text-sm font-normal">EGP</span>
                    </p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex justify-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-green-600" /> Secure
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-blue-600" /> Fast Delivery
                  </div>
                </div>

                <div className="text-center">
                  <AppButton
                    className=" text-white w-full py-6 hover:bg-green-800 bg-main-color font-semibold text-[20px]"
                    type="submit"
                    form="checkout-form"
                  >
                    Place Order
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
