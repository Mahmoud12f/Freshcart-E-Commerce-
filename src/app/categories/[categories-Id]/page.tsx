import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, FolderClosedIcon } from "lucide-react";
// استيراد الدوال بالأسماء الجديدة والمصححة
import { getCategoryById, getSubCategoriesOfCategory } from "../category.services";

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ "categories-Id": string }>; 
}) {
  // 1. استلام الـ ID
  const resolvedParams = await params;
  const categoryId = resolvedParams["categories-Id"]; 

  // 2. جلب البيانات (بالدوال الجديدة)
  const categoryData = await getCategoryById(categoryId);
  const subCategories = await getSubCategoriesOfCategory(categoryId);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header الأخضر */}
      <div className="w-full bg-gradient-to-r from-[#17A54B] to-[#47DC7D] py-12 px-6 md:px-12 mb-10 shadow-sm text-white">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <span>/</span>
            <span className="font-medium">{categoryData?.name || "Loading..."}</span>
          </nav>

          {/* معلومات القسم */}
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg relative w-20 h-20 overflow-hidden">
              {categoryData?.image && (
                <Image
                  src={categoryData.image}
                  alt={categoryData.name || "category"}
                  fill
                  className="object-contain p-2"
                />
              )}
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight">
                {categoryData?.name || "Category Details"}
              </h1>
              <p className="opacity-90">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mb-20">
        {/* زر الرجوع */}
        <Link href={'/categories'} className="flex mb-4 items-center gap-2 text-gray-600 hover:text-[#17A54B] transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          <p className="font-medium">Back to Categories</p>
        </Link>

        {/* عدد الأقسام الفرعية */}
        <h2 className="mb-8 text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-lg">
             {subCategories?.length || 0}
          </span>
          Subcategories in {categoryData?.name}
        </h2>

        {/* شبكة الأقسام الفرعية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subCategories && subCategories.length > 0 ? (
            subCategories.map((sub: any) => (
              <Link 
                // الرابط يوجه إلى المجلد [Filters]
                href={`/categories/${categoryId}/${sub._id}`} 
                key={sub._id} 
                className="bg-white h-44 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer hover:border-green-300"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                  <FolderClosedIcon className="w-6 h-6 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-green-600 truncate">
                  {sub.name}
                </h3>
                <div className="text-green-600 text-[15px] mt-3 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                  <p className="font-medium">Browse Products</p>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
               <p className="text-gray-400">No subcategories found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}