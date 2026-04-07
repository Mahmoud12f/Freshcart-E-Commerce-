import {CardContent } from "@/components/ui/card";
import { Headset, RotateCcw, ShieldHalf, Truck } from "lucide-react";

export default function ServiceCard() {
  return (
    <div className="bg-emerald-50 py-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="w-full border-none">
          <CardContent className="flex gap-3 items-center">
            <span className="flex justify-center items-center bg-emerald-100 p-3 rounded-2xl">
              <Truck size={30} className="text-emerald-500" />
            </span>
            <div>
              <h3 className="text-black font-bold">Free Shipping</h3>
              <p className="text-xs">On orders over 500 EGP</p>
            </div>
          </CardContent>
        </div>

        <div className="w-full  border-none">
          <CardContent className="flex gap-3 items-center">
            <span className="flex justify-center items-center bg-emerald-100 p-3 rounded-2xl">
              <RotateCcw className=" text-emerald-500 w-6 h-6 stroke-[2.5px]" />
            </span>
            <div>
              <h3 className="text-black font-bold">Easy Returns</h3>
              <p className="text-xs">14-day return policy</p>
            </div>
          </CardContent>
        </div>

        <div className="w-full border-none">
          <CardContent className="flex gap-3 items-center">
            <span className="flex justify-center items-center bg-emerald-100 p-3 rounded-2xl">
              <ShieldHalf size={30} className="text-emerald-500" />
            </span>
            <div>
              <h3 className="text-black font-bold">Secure Payment</h3>
              <p className="text-xs">100% secure transactions</p>
            </div>
          </CardContent>
        </div>

        <div className="w-full  border-none">
          <CardContent className="flex gap-3 items-center">
            <span className="flex justify-center items-center bg-emerald-100 p-3 rounded-2xl">
              <Headset size={30} className="text-emerald-500" />
            </span>
            <div>
              <h3 className="text-black font-bold">24/7 Support</h3>
              <p className="text-xs">Dedicated support team</p>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}