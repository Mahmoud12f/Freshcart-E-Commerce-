// src/app/brands/[brand-Id]/page.tsx

import ProductCart from "@/components/ProductCart/ProductCart";
import { getProductsByBrand } from "../brands.services";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/app/home.services";
import { ListFilter, Tag, X } from "lucide-react";

export default async function BrandProductsPage({
  params,
}: {
  params: Promise<{ "brand-Id": string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams["brand-Id"]; 

  // 1. جلب بيانات البراند نفسه (الاسم والصورة)
  const brandData = await getProductsByBrand(id);

  // 2. جلب كل المنتجات
  const allProducts = await getAllProducts();

  // 3. الشرط: تصفية المنتجات التي تنتمي لهذا البراند فقط
  // ملاحظة: تأكد هل الـ id في المنتج مخزن داخل product.brand._id أم product.brand
 const filteredProducts = allProducts.filter(
  (product) => product.brand?._id === id
);
  return (
    <main className="min-h-screen">
      <div className="w-full bg-gradient-to-r from-[#17A54B] to-[#47DC7D] py-12 px-6 md:px-12 mb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <Link href={"/"} className="hover:text-white cursor-pointer transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={"/brands"} className="hover:text-white cursor-pointer transition-colors">
              Brands
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{brandData.name}</span>
          </nav>

          {/* Title & Icon */}
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
              <div className="relative bg-gray-200 w-10 h-8 overflow-hidden flex items-center justify-center transition-all">
                <Image
                  src={brandData.image}
                  alt={brandData.name}
                  fill
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {brandData.name}
              </h1>
              <p className="text-white/90 text-sm md:text-base font-medium">
                Shop {brandData.name} products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-20">
         <div className="flex items-center gap-3 mb-5 ">
          {/* أيقونة الفلتر والنص */}
          <div className="flex items-center gap-2 text-gray-700">
            <ListFilter className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Active Filters:</span>
          </div>

          {/* الـ Badge الخاص بالبراند */}
          <Link href={'/shop'} className="flex items-center gap-1.5 bg-[#F3E8FF] text-[#6B21A8] px-3 py-1.5 rounded-full text-sm font-medium">
            <Tag className="w-4 h-4" /> {/* أيقونة التاج */}
            <span>{brandData.name}</span>
            
                <X className="w-4 h-4" /> {/* أيقونة الإغلاق */}
            
          </Link>

          
         <div>
           <Link 
            href="/brands" 
            className="text-gray-500 hover:text-gray-800 text-sm font-medium underline underline-offset-2 ml-auto"
          >
            Clear all
          </Link>
         </div>
        </div>
        <p className="mb-5 text-gray-700">
          Showing {filteredProducts.length} products
        </p>
        
        {/* عرض المنتجات المفلترة فقط */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCart key={product._id} prod={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No products found for this brand.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}