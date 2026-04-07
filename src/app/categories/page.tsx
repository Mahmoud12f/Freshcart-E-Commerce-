import { Box, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllCategory } from "./category.services";

interface CategoryData {
  img: string;
  title: string;
}

export default async function page() {
  const categoryList =await getAllCategory()
    const categoryData = categoryList.map(e => ({img: e.image,title: e.name , _id: e._id}))
  return (
    <div>
       <div className="w-full bg-gradient-to-r from-[#17A54B] to-[#43D979] py-12 px-6 md:px-12 mb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <Link href={'/'} className="hover:text-white cursor-pointer transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Categories</span>
          </nav>

          {/* Title & Icon */}
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
              <Layers className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl  font-bold text-white tracking-tight">
                All Categories
              </h1>
              <p className="text-white/90 text-sm md:text-base font-medium">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>
      

      <div className="container mx-auto my-14 px-4">
      {/* رأس القسم: العنوان والخط الأخضر وزر View All */}
    

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {categoryData?.map((cat, index) => (
          <Link href={`/categories/${cat._id}`}
            key={index} 
            className="group hover:shadow-2xl duration-300 hover:-translate-y-2 cursor-pointer flex flex-col items-center bg-white border border-gray-100 p-5 rounded-xl    transition-all "
          >
            {/* الصورة الدائرية */}
            <div className="relative  w-full h-44 mb-4 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center border-2 border-transparent  transition-all">
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                sizes=""
                className="object-cover group-hover:scale-110  transition-transform duration-300"
              />
            </div>

            {/* اسم الكاتيجوري */}
            <h3 className="text-gray-700 group-hover:text-main-color font-semibold text-center  transition-colors">
              {cat.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
    </div>
  )
}
