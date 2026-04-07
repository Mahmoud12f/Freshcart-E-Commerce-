import ProductCart from "@/components/ProductCart/ProductCart";
import Link from "next/link";
import Image from "next/image";
import { ListFilter, Tag, X, ArrowLeft } from "lucide-react";
import { getAllProducts } from "@/app/home.services";

export default async function FilteredProductsPage({
  params,
}: {
  params: Promise<{ "categories-Id": string; Filters: string }>; // تم تغيير subId إلى Filters لتطابق اسم المجلد
}) {
  // 1. استلام الـ IDs من الرابط
  const { "categories-Id": categoryId, Filters: subId } = await params;

  // 2. جلب جميع المنتجات
  const allProducts = await getAllProducts();

  // 3. الفلترة الصحيحة (البحث داخل مصفوفة subcategory)
  const filteredProducts = allProducts.filter((product) =>
    product.subcategory?.some((sub: any) => sub._id === subId)
  );

  // 4. جلب بيانات الـ Subcategory للعرض في الهيدر من أول منتج موجود
  const subCategoryInfo = filteredProducts.length > 0 
    ? filteredProducts[0].subcategory.find((s: any) => s._id === subId)
    : null;

  return (
    <main className=" m-0 bg-gray-50 pb-5">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#17A54B] to-[#47DC7D] py-12 px-6 md:px-12 mb-10 text-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/categories/${categoryId}`} className="hover:text-white transition-colors">Subcategories</Link>
            <span>/</span>
            <span className="font-medium">{subCategoryInfo?.name || "Products"}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg relative w-16 h-16 flex items-center justify-center">
               <Tag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {subCategoryInfo?.name || "Filtered Products"}
              </h1>
              <p className="opacity-80">Explore the best deals in this category</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-20">
        
        {/* Active Filters Section */}
        <div className="flex flex-wrap items-center justify-between gap-4  mb-5    ">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-700">
              <ListFilter className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Active Filters:</span>
            </div>
            {/* Filter Badge */}
            <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-200">
              <Tag className="w-4 h-4" />
              <span>{subCategoryInfo?.name || "Loading..."}</span>
              <Link href={`/categories/${categoryId}`}>
                <X className="w-4 h-4 ml-1 cursor-pointer hover:text-red-500" />
              </Link>
            </div>

              
          <div>
            <Link href={`/categories/${categoryId}`} className="text-gray-400 hover:text-red-500 text-sm font-medium underline underline-offset-4">
            Clear all 
          </Link>
          </div>
          </div>
        
        </div>

        <p className="mb-6 text-gray-500 font-medium">
          Found <span className="text-gray-800 font-bold">{filteredProducts.length}</span> products matching this subcategory
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCart key={product._id} prod={product} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-2">
              <div className="bg-gray-50 p-6 rounded-full mb-4">
                 <Tag className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No products found here</h3>
              <p className="text-gray-500">Try choosing another subcategory.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}