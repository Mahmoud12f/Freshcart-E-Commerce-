import { Phone, Mail, Truck, Gift, User, LogOut } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full hidden lg:block  py-3 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-[13px] text-gray-600">
        
        {/* الجزء الشمال: العروض */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-[#17A54B]" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>
          <div className="flex items-center gap-1">
            <Gift className="w-4 h-4 text-[#17A54B]" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        {/* الجزء اليمين: التواصل والحساب */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 border-r pr-4">
            <a href="tel:+18001234567" className="flex items-center gap-1 hover:text-[#17A54B]">
              <Phone className="w-4 h-4" /> +1 (800) 123-4567
            </a>
            <a href="mailto:support@freshcart.com" className="flex items-center gap-1 hover:text-[#17A54B]">
              <Mail className="w-4 h-4" /> support@freshcart.com
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>Tana Morris</span>
            </div>
            <button className="flex items-center gap-1 hover:text-red-500">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}