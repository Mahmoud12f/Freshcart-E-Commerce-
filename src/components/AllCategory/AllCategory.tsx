// src/components/AllCategory/AllCategory.tsx
import { getAllCategory } from "@/app/categories/category.services";
import Image from "next/image";

interface CategoryData {
  img: string;
  title: string;
}

export default async function AllCategory() {
  const categoryList =await getAllCategory()
    
    const categoryData = categoryList.map(e => ({img: e.image,title: e.name}))
  return (
    <div className="container mx-auto my-14 px-4">
      {/* رأس القسم: العنوان والخط الأخضر وزر View All */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-main-color rounded-full"></div> {/* الخط الأخضر الجانبي */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Shop By <span className="text-main-color">Category</span>
          </h2>
        </div>
        
        <button className="text-main-color font-semibold  flex items-center gap-1 transition-all">
          View All Categories 
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* شبكة الكاتيجوري (Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categoryData?.map((cat, index) => (
          <div 
            key={index} 
            className="group cursor-pointer flex flex-col items-center bg-white border border-gray-100 p-5 rounded-xl  hover:shadow-md  transition-all duration-300"
          >
            {/* الصورة الدائرية */}
            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border-2 border-transparent  transition-all">
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 150px"
                className="object-cover  transition-transform duration-300"
              />
            </div>

            {/* اسم الكاتيجوري */}
            <h3 className="text-gray-700 font-semibold text-center  transition-colors">
              {cat.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}