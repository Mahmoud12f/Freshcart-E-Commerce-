import AppButton from "@/components/shared/AppButton/AppButton";
import LoginForm from "./LoginForm";
import image from "@images/2e5810ff3e-e750761ebcd4ae5907db.png";
import { ShoppingCart, Truck, ShieldCheck, Headphones } from "lucide-react";

import { FcGoogle } from "react-icons/fc"; // npm install react-icons
import { FaFacebook } from "react-icons/fa";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-8xl p-4 w-full  rounded-2xl   flex gap-10 flex-col md:flex-row">
        {/* القسم الأيسر: الصورة والمميزات */}
        <div className="md:w-1/2 p-10  flex flex-col justify-center items-center">
          <div className=" shadow-lg w-full h-95 rounded-2xl overflow-hidden mb-8">
            {/* استبدل مسار الصورة بالمسار الصحيح عندك */}
            <img
              src={image.src}
              alt="FreshCart"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="text-gray-700 text-[18px] text-center mb-8">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
            <span className="flex items-center gap-1">
              <Truck size={18} className="text-main-color" /> Free Delivery
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={18} className="text-main-color" /> Secure
              Payment
            </span>
            <span className="flex items-center gap-1">
              <Headphones size={18} className="text-main-color" /> 24/7 Support
            </span>
          </div>
        </div>

        {/* القسم الأيمن: الفورم */}
        <div className="md:w-1/2 rounded-2xl shadow-lg p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-main-color mb-2">
              FreshCart
            </h1>
            <h2 className="text-xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-500 text-sm">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full  mx-auto mt-6">
            {/* Google Button */}
            <AppButton
              variant="outline"
              className="w-full font-bold text-[18px] flex items-center justify-center gap-3 hover:border-main-color py-6 hover:bg-blue-50 transition-all"
            >
              <FcGoogle className="text-2xl" />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </AppButton>

            {/* Facebook Button */}
            <AppButton
              variant="outline"
              className="w-full font-bold text-[18px] flex items-center justify-center gap-3 hover:border-main-color py-6 hover:bg-blue-50 transition-all"
            >
              <FaFacebook className="text-[#1877F2] text-2xl" />
              <span className="text-gray-700 font-medium">
                Continue with Facebook
              </span>
            </AppButton>

            {/* Or separator (Optional) */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 uppercase">
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          <LoginForm />

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-3 text-[12px] text-gray-400 text-center">
            <span>🔒 SSL Secured</span>
            <span>👥 50K+ Users</span>
            <span>⭐ 4.9 Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}
