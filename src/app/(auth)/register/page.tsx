import AppButton from "@/components/shared/AppButton/AppButton";
import RegisterForm from "./RegisterForm";
import { CheckCircle2, Truck, ShieldCheck } from "lucide-react"; // أيقونات للمميزات
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function RegisterPage() {
  return (
    <div className="min-h-screen mt-5 flex items-center justify-center  ">
      <div className="container max-w-7xl pe-5 ps-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white rounded-2xl">
        {/* الجزء الأيسر: محتوى ترحيبي ومميزات */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to <span className="text-main-color">FreshCart</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
          </div>

          {/* قائمة المميزات */}
          <div className="space-y-6">
            <FeatureItem
              icon={<CheckCircle2 className="text-main-color" size={28} />}
              title="Premium Quality"
              desc="Premium quality products sourced from trusted suppliers."
            />
            <FeatureItem
              icon={<Truck className="text-main-color" size={28} />}
              title="Fast Delivery"
              desc="Same-day delivery available in most areas."
            />
            <FeatureItem
              icon={<ShieldCheck className="text-main-color" size={28} />}
              title="Secure Shopping"
              desc="Your data and payments are completely secure."
            />
          </div>

          {/* جزء التقييم (Testimonial) */}
          <div className="p-6 rounded-xl border border-gray-100 italic text-gray-600">
            Sarah Johnson
            <div className="flex items-center gap-2 mb-2 text-yellow-400">
              {"★".repeat(5)}
            </div>
            "FreshCart has transformed my shopping experience. The quality of
            the products is outstanding, and the delivery is always on time.
            Highly recommend!"
          </div>
        </div>

        {/* الجزء الأيمن: الفورم */}
        <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Your Account
            </h2>
            <p className="text-gray-500 mt-2">
              Start your fresh journey with us today
            </p>
          </div>

          <div className="">
            {/* Google Button */}
           <div className="flex w-full justify-center  gap-4    mt-6">
             <AppButton
              variant="outline"
              className=" font-bold text-[18px] flex items-center justify-center gap-3 hover:border-main-color py-6 hover:bg-blue-50 transition-all"
            >
              <FcGoogle className="text-2xl" />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </AppButton>

            {/* Facebook Button */}
            <AppButton
              variant="outline"
              className=" font-bold text-[18px] flex items-center justify-center gap-3 hover:border-main-color py-6 hover:bg-blue-50 transition-all"
            >
              <FaFacebook className="text-[#1877F2] text-2xl" />
              <span className="text-gray-700 font-medium">
                Continue with Facebook
              </span>
            </AppButton>
           </div>

            {/* Or separator (Optional) */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 uppercase">
                  Or 
                </span>
              </div>
            </div>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

// Component فرعي للمميزات عشان الكود يبقى منظم
function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="bg-green-50 p-2 rounded-lg">{icon}</div>
      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}
