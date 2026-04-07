import LoginForm from './LoginForm';
import image from "@images/2e5810ff3e-e750761ebcd4ae5907db.png";
import { ShoppingCart, Truck, ShieldCheck, Headphones } from "lucide-react";

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
            Join thousands of happy customers who trust FreshCart for their daily grocery needs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
            <span className="flex items-center gap-1"><Truck size={18} className="text-main-color"/> Free Delivery</span>
            <span className="flex items-center gap-1"><ShieldCheck size={18} className="text-main-color"/> Secure Payment</span>
            <span className="flex items-center gap-1"><Headphones size={18} className="text-main-color"/> 24/7 Support</span>
          </div>
        </div>

        {/* القسم الأيمن: الفورم */}
        <div className="md:w-1/2 rounded-2xl shadow-lg p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-main-color mb-2">FreshCart</h1>
            <h2 className="text-xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-500 text-sm">Sign in to continue your fresh shopping experience</p>
          </div>
          
          <LoginForm />
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between text-[12px] text-gray-400 text-center">
             <span>🔒 SSL Secured</span>
             <span>👥 50K+ Users</span>
             <span>⭐ 4.9 Rating</span>
          </div>
        </div>

      </div>
    </div>
  );
}