"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard,
} from "lucide-react";
import logo from "@images/logo.svg";
import ServiceCard from "../ServiceCard/ServiceCard";


export default function Footer() {
  return (
    <>
      {<ServiceCard />}
      <footer className="bg-[#0f1b2d] text-gray-400 pt-14">
        <div className="mx-auto px-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-12">
            {/* Left */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white inline-flex items-center px-4 py-2 rounded-md">
                <Image src={logo} alt="FreshCart" width={140} height={40} />
              </div>

              <p className="text-sm leading-relaxed text-gray-400 max-w-md">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-green-500" />
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-green-500" />
                  <span>support@freshcart.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-green-500" />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-3 pt-2">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                  <Link
                    key={idx}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1c2a3f] hover:bg-green-500 hover:text-white transition-all duration-300"
                  >
                    <Icon size={18} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <h4 className="text-white font-semibold mb-3">Shop</h4>
              <Link href="#" className="hover:text-green-500">
                All Products
              </Link>
              <Link href="#" className="hover:text-green-500">
                Categories
              </Link>
              <Link href="#" className="hover:text-green-500">
                Brands
              </Link>
              <Link href="#" className="hover:text-green-500">
                Electronics
              </Link>
              <Link href="#" className="hover:text-green-500">
                Men's Fashion
              </Link>
              <Link href="#" className="hover:text-green-500">
                Women's Fashion
              </Link>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-white font-semibold mb-3">Account</h4>
              <Link href="#" className="hover:text-green-500">
                My Account
              </Link>
              <Link href="#" className="hover:text-green-500">
                Order History
              </Link>
              <Link href="#" className="hover:text-green-500">
                Shopping Cart
              </Link>
              <Link href="#" className="hover:text-green-500">
                Sign In
              </Link>
              <Link href="#" className="hover:text-green-500">
                Create Account
              </Link>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-white font-semibold mb-3">Support</h4>
              <Link href="#" className="hover:text-green-500">
                Contact Us
              </Link>
              <Link href="#" className="hover:text-green-500">
                Help Center
              </Link>
              <Link href="#" className="hover:text-green-500">
                Shipping Info
              </Link>
              <Link href="#" className="hover:text-green-500">
                Returns & Refunds
              </Link>
              <Link href="#" className="hover:text-green-500">
                Track Order
              </Link>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <Link href="#" className="hover:text-green-500">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-green-500">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-green-500">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#1c2a3f] py-5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© 2026 FreshCart. All rights reserved.</p>

            <div className="flex items-center gap-6 mt-3 md:mt-0">
              <div className="flex items-center gap-2">
                <CreditCard size={16} /> Visa
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={16} /> Mastercard
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={16} /> PayPal
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}