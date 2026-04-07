import React from 'react';
import { Mail, ArrowRight, Smartphone, Apple, Play, Leaf, Truck, Tag, Star } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NewsletterSection() {
  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <Card className="overflow-hidden border-none  shadow-2xl shadow-[#a4eede] bg-[#f0f9f4] rounded-[40px] p-2 md:p-8">
        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center p-6 md:p-10">
          
          {/* Left Side: Newsletter (Takes 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Icon & Text */}
            <div className="flex items-start gap-4">
              <div className="bg-[#00BC94] p-3 rounded-2xl shadow-lg shadow-green-100">
                <Mail className="text-white w-8 h-8" />
              </div>
              <div>
                <h4 className="text-[#00BC94] font-bold text-sm tracking-widest uppercase">Newsletter</h4>
                <p className="text-gray-400 text-xs mt-1">50,000+ subscribers</p>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Get the Freshest Updates <span className="text-[#00BC94]">Delivered Free</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm font-medium text-slate-700">
                <Leaf className="w-4 h-4 text-[#00BC94]" /> Fresh Picks Weekly
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm font-medium text-slate-700">
                <Truck className="w-4 h-4 text-[#00BC94]" /> Free Delivery Codes
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm font-medium text-slate-700">
                <Tag className="w-4 h-4 text-[#00BC94]" /> Members-Only Deals
              </div>
            </div>

            {/* Input Form */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="relative flex-1">
                <Input 
                  placeholder="you@example.com" 
                  className="h-14 rounded-2xl border-none bg-white px-6 text-lg focus-visible:ring-[#00BC94] shadow-sm"
                />
              </div>
              <Button className="h-14 px-8 rounded-2xl bg-[#00BC94] hover:bg-[#05a17f] text-white font-bold text-lg gap-2 shadow-lg shadow-green-100 transition-all active:scale-95">
                Subscribe <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              ✨ Unsubscribe anytime. No spam, ever.
            </p>
          </div>

          {/* Right Side: Mobile App (Takes 1 column) */}
          <div className="bg-[#1a222e] rounded-[32px] p-8 space-y-6 relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(0, 178, 118)] opacity-10 blur-3xl rounded-full -mr-16 -mt-16" />
            
            <div className="flex items-center gap-2 bg-white/5 w-fit px-3 py-1 rounded-full border border-white/10">
              <Smartphone className="w-3 h-3 text-[#00BC94]" />
              <span className="text-[10px] text-white font-bold uppercase tracking-widest">Mobile App</span>
            </div>

            <h3 className="text-2xl font-bold text-white">Shop Faster on Our App</h3>
            <p className="text-gray-400 text-sm">Get app-exclusive deals & 15% off your first order.</p>

            <div className="space-y-3">
              {/* App Store */}
              <button className="w-full flex items-center gap-4 bg-[#2a3441] hover:bg-[#343f4e] p-3 rounded-2xl border border-white/5 transition-all text-left">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase leading-none">Download on</p>
                  <p className="text-white font-bold text-lg leading-tight">App Store</p>
                </div>
              </button>

              {/* Google Play */}
              <button className="w-full flex items-center gap-4 bg-[#2a3441] hover:bg-[#343f4e] p-3 rounded-2xl border border-white/5 transition-all text-left">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase leading-none">Get it on</p>
                  <p className="text-white font-bold text-lg leading-tight">Google Play</p>
                </div>
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-500" />)}
              </div>
              <p className="text-[10px] text-gray-400 font-medium">4.9 • 100K+ downloads</p>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

