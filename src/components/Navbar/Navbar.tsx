"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Menu,
  Headset,
  X,
  LogOut,
  Settings,
  Package,
  LayoutDashboard,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "@/assets/images/logo.svg";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CartCreatedContext } from "@/Context/CartContext/CartContext";
import { getUserCart } from "../AddToCart/AddToCart.action";
const userMenuItems = [
  { label: "My Profile", href: "/profile", icon: User },
  { label: "My Orders", href: "/allorders", icon: Package },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/login");
    // consol.log("logout")
  }

  const { cartCount, setCartCount } = React.useContext(CartCreatedContext);

 // استبدل الجزء القديم بهذا الكود الآمن
React.useEffect(() => {
  if (session?.user) {
    getUserCart()
      .then((data) => {
        // فحص آمن: هل الداتا رجعت بنجاح وهل تحتوي على الرقم؟
        if (data && typeof data.numOfCartItems !== 'undefined') {
          setCartCount(data.numOfCartItems);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch cart count:", err);
      });
  }
}, [session, setCartCount]);
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* 1. Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={logo}
              alt="FreshCart Logo"
              width={160}
              height={40}
              className="w-32 md:w-40"
              priority
            />
          </Link>

          {/* 2. Search Bar - Desktop */}
          <div className="hidden lg:flex flex-grow max-w-2xl relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full border border-gray-200 rounded-full py-2.5 px-4 pr-12 focus:outline-none focus:border-[#0aad0a] focus:ring-1 focus:ring-[#0aad0a] transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0aad0a] text-white p-2 rounded-full hover:bg-opacity-90 transition">
              <Search size={18} />
            </button>
          </div>

          {/* 3. Right Section */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* Desktop Navigation Links */}
            <NavigationMenu className="hidden xl:flex " viewport={false}>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={`${navigationMenuTriggerStyle()} !bg-transparent hover:text-[#0aad0a] font-medium`}
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/shop"
                      className={`${navigationMenuTriggerStyle()} !bg-transparent hover:text-[#0aad0a] font-medium`}
                    >
                      Shop
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!bg-transparent hover:text-[#0aad0a] font-medium">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[150px] p-2 list-none m-0">
                      <li><CategoryLink href="/categories" title="All Categories" /></li>
                      <CategoryLink
                        href="/womens-fashion"
                        title="Women's Fashion"
                      />
                      <CategoryLink
                        href="/mens-fashion"
                        title="Men's Fashion"
                      />
                      <CategoryLink
                        href="/beauty-health"
                        title="Beauty & Health"
                      />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                  <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/brands"
                      className={`${navigationMenuTriggerStyle()} !bg-transparent hover:text-[#0aad0a] font-medium`}
                    >
                      Brands
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="hidden lg:flex">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/support"
                      className="flex items-center gap-3 group ml-4"
                    >
                      <div className="w-10 h-10 bg-[#f0f9f0] rounded-full flex items-center justify-center text-[#0aad0a]">
                        <Headset size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-400 font-medium leading-none">
                          Support
                        </span>
                        <span className="text-[13px] font-bold text-slate-700">
                          24/7 Help
                        </span>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Icons Section */}
            <div className="flex items-center gap-3 md:gap-4 border-l pl-3 md:pl-5">
              <Link
                href="/wishlist"
                className="relative hover:bg-gray-200 p-2 rounded-full group"
              >
                <Heart className="text-gray-700  group-hover:text-[#0aad0a] transition" />
              </Link>

              <Link
                href="/cart"
                className="relative hover:bg-gray-200 rounded-full group p-2 flex items-center justify-center"
              >
                {/* أيقونة السلة */}
                <ShoppingCart className="text-gray-700 group-hover:text-[#0aad0a] transition-colors duration-300 w-6 h-6" />

                {/* Badge الرقم */}
                <span className="absolute -top-1 -right-1 bg-[#0aad0a] text-white rounded-full text-[10px] font-bold w-6 h-6 flex justify-center items-center border-2 border-white shadow-sm ">
                  {cartCount}+
                </span>
              </Link>

              {/* --- User Account Section (The Complete Fix) --- */}
              {session ? (
                /* إذا كان المستخدم مسجل دخول: اظهر القائمة المنسدلة */
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none border-none bg-transparent p-0 cursor-pointer">
                      <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#0aad0a] transition-all overflow-hidden bg-gray-50">
                        {session.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt="User"
                            width={36}
                            height={36}
                            className="object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-[280px] p-4 bg-white shadow-xl rounded-xl border border-gray-100 mt-2"
                  >
                    {/* User Header */}
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-2">
                      <div className="w-12 h-12 bg-green-50 rounded-full border border-green-100 flex items-center justify-center overflow-hidden">
                        {session.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt="Profile"
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        ) : (
                          <User className="w-7 h-7 text-[#0aad0a]" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="font-bold text-gray-900 truncate text-[15px]">
                          {session.user?.name}
                        </h4>
                        <p className="text-[12px] text-gray-500 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-1">
                      {userMenuItems.map((item) => (
                        <DropdownMenuItem key={item.label} asChild>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors group cursor-pointer outline-none"
                          >
                            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-[#0aad0a]" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer outline-none"
                      >
                        <LogOut className="w-5 h-5" />
                        LogOut
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                /* إذا كان غير مسجل: اظهر زر تسجيل الدخول مباشرة */
                <Link
                  href="/register"
                  className="hidden md:flex items-center gap-2 bg-[#0aad0a] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#089608] transition-all shadow-sm no-underline"
                >
                  <User size={16} />
                  Sign In
                </Link>
              )}

              {/* أيقونة تسجيل الدخول للموبايل فقط */}
              {!session && (
                <Link
                  href="/register"
                  className="md:hidden text-gray-700 hover:text-[#0aad0a]"
                >
                  <User size={24} />
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Content */}
        {isOpen && (
          <div className="xl:hidden mt-4 border-t pt-4 flex flex-col gap-4 pb-4 animate-in fade-in slide-in-from-top-2">
            <Link
              href="/"
              className="font-medium px-2 py-1 hover:text-[#0aad0a]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="font-medium px-2 py-1 hover:text-[#0aad0a]"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className="font-medium px-2 py-1 hover:text-[#0aad0a]"
            >
              Categories
            </Link>
            <Link
              href="/Brands"
              className="font-medium px-2 py-1 hover:text-[#0aad0a]"
            >
              Brands
            </Link>
            <Link
              href="/support"
              className="font-medium px-2 py-1 hover:text-[#0aad0a]"
            >
              Support
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function CategoryLink({ href, title }: { href: string; title: string }) {
  return (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-md p-2 text-sm text-gray-600 hover:bg-slate-50 hover:text-[#0aad0a] transition-colors"
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
