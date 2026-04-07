"use client";

import AppButton from "@/components/shared/AppButton/AppButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  CreditCard,
  HomeIcon,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { ShippingAddressType, UserShippingAddress } from "./Payment.interface";
import { getUserCart } from "@/components/AddToCart/AddToCart.action";
import { handleCashOrder, handleOnlineOrder } from "./payment.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CartCreatedContext } from "@/Context/CartContext/CartContext";

export default function PaymentForm({ cartId }: { cartId: string }) {
  const { cartCount, setCartCount } = useContext(CartCreatedContext);
  const [selectedMethod, setSelectedMethod] = useState("cash");

  const router = useRouter();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });

  // --- 1. لازم تضيف الدالة دي هنا ---
  const onSubmit = async (data: UserShippingAddress) => {
    if (selectedMethod === "cash") {
      const shippingAddress: ShippingAddressType = { shippingAddress: data };
      toast.promise(handleCashOrder(shippingAddress, cartId), {
        loading: "Creating Cash Order Please wait",
        success: function () {
          router.push("/allorders");
          setCartCount(0);
          return "Order Created";
        },
      });
      // console.log(cartId)
    } else {
       const shippingAddress: ShippingAddressType = { shippingAddress: data };
      const url = await handleOnlineOrder(shippingAddress, cartId)
      setCartCount(0);
      window.open(url , '_self')
    }
  };

  return (
    // --- 2. اتأكد إن الاسم هنا هو نفس اسم الدالة اللي فوق ---
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
      {/* Shipping Address Section */}
      <div className="bg-white rounded-2xl shadow border-2 overflow-hidden">
        <div className="bg-main-color p-5 text-white">
          <div className="flex items-center gap-3 font-semibold text-2xl">
            <HomeIcon />
            <h3>Shipping Address</h3>
          </div>
          <p>Where should we deliver your order?</p>
        </div>

        <div className="p-5">
          <div className="mb-4 p-3 ps-5 bg-blue-100 rounded-2xl">
            <p className="text-blue-800">Delivery Information</p>
            <p className="text-blue-500">Please ensure your address is accurate for smooth delivery</p>
          </div>
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }} // نصيحة: ضيف validation
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mb-5">
                <FieldLabel htmlFor={field.name}>City*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your city"
                  className="p-5 focus-visible:ring-main-color focus-visible:ring-1"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ... باقي الـ Controllers (Details, Phone) ... */}
          <Controller
            name="details"
            control={control}
            rules={{ required: "Address details are required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mb-5">
                <FieldLabel htmlFor={field.name}>Street Address*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your street address"
                  className="p-5 focus-visible:ring-main-color focus-visible:ring-1"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone is required" }}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mb-5">
                <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Enter your phone number"
                  className="p-5 focus-visible:ring-main-color focus-visible:ring-1"
                  type="tel"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-main-color p-5 text-white">
          <div className="flex items-center gap-3 font-bold text-xl">
            <Wallet className="w-6 h-6" />
            <h3>Payment Method</h3>
          </div>
          <p className="text-sm opacity-90 mt-1">
            Choose how you'd like to pay
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* زرار الكاش */}
          <button
            type="button"
            onClick={() => setSelectedMethod("cash")}
            className={`w-full text-left flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedMethod === "cash"
                ? "border-main-color bg-green-50 shadow-sm"
                : "border-gray-100 hover:border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl transition-colors ${selectedMethod === "cash" ? "bg-main-color text-white" : "bg-gray-100 text-gray-400"}`}
              >
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Cash on Delivery</h4>
                <p className="text-xs text-gray-500">
                  Pay when your order arrives
                </p>
              </div>
            </div>
            {selectedMethod === "cash" && (
              <CheckCircle2 className="text-main-color w-6 h-6" />
            )}
          </button>

          {/* زرار أونلاين */}
          <button
            type="button"
            onClick={() => setSelectedMethod("online")}
            className={`w-full text-left flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedMethod === "online"
                ? "border-main-color bg-green-50 shadow-sm"
                : "border-gray-100 hover:border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl transition-colors ${selectedMethod === "online" ? "bg-main-color text-white" : "bg-gray-100 text-gray-400"}`}
              >
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Pay Online</h4>
                <p className="text-xs text-gray-500">
                  Secure payment via Stripe
                </p>
              </div>
            </div>
            {selectedMethod === "online" && (
              <CheckCircle2 className="text-main-color w-6 h-6" />
            )}
          </button>
          <div className="mt-4 p-3 ps-5 text-[15px] bg-blue-100 rounded-2xl">
            <p className="text-green-800">Secure & Encrypted</p>
            <p className="text-green-600">Your payment info is protected with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </form>
  );
}
