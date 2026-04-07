import ProductCart from "@/components/ProductCart/ProductCart";
import { getAllProducts } from "../home.services";
import { Box } from "lucide-react";

export default async function Page() {
  const productsList = await getAllProducts();

  return (
    <main className="min-h-screen bg-gray-50/30">
      {/* 1. Header Section - مطابق لصورة All Products */}
      <div className="w-full bg-gradient-to-r from-[#17A54B] to-[#43D979] py-12 px-6 md:px-12 mb-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="text-white font-medium">All Products</span>
          </nav>

          {/* Title & Icon */}
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
              <Box className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl  font-bold text-white tracking-tight">
                All Products
              </h1>
              <p className="text-white/90 text-sm md:text-base font-medium">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </div>

    
      <div className="container mx-auto px-6  mb-20">
        <p className="mb-5 text-gray-700">Showing 40 products</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {productsList.map((product) => (
            <ProductCart key={product._id} prod={product} />
            
          ))}
        </div>
      </div>
    </main>
  );
}