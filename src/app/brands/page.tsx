import { Box, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllBrands } from "./brands.services";


interface BrandsData {
  image: string;
  title: string;
  _id: string
}

export default async function page() {
  const brandsList =await getAllBrands()
    const brandsData = brandsList.map(e => ({image: e.image,title: e.name ,_id: e._id}))
  return (
    <div className="bg-gray-50">
       <div className="w-full bg-gradient-to-r from-[#8128FF] to-[#BF79FF] py-12 px-6 md:px-12 mb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <Link href={'/'} className="hover:text-white cursor-pointer transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Brands</span>
          </nav>

          {/* Title & Icon */}
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
              <Layers className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl  font-bold text-white tracking-tight">
                Top Brands
              </h1>
              <p className="text-white/90 text-sm md:text-base font-medium">
               Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>
      

      <div className="container mx-auto my-14 px-4">
    
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 ">
        {brandsData?.map((cat, index) => (
          <Link href={`/brands/${cat._id}`}
            key={index} 
            className="group h-64 hover:shadow-2xl duration-300 hover:-translate-y-2 cursor-pointer flex flex-col items-center bg-white border-2 border-gray-200 p-5 rounded-xl    transition-all "
          >
            
            
            <div className="bg-gray-50 p-5 w-full h-40 flex justify-center items-center">
              <div className="relative  bg-gray-200  w-40 h-20   overflow-hidden  flex items-center justify-center  transition-all">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className=" group-hover:scale-110  transition-transform duration-300"
              />
            </div>
            </div>

            {/* اسم الكاتيجوري */}
            <h3 className="text-gray-700 mt-3 group-hover:text-blue-600 font-semibold text-center  transition-colors">
              {cat.title}
            </h3>
            <p className="text-blue-600 font-semibold text-[12px] hidden group-hover:block">View Products</p>
          </Link>
        ))}
      </div>
    </div>
    </div>
  )
}
