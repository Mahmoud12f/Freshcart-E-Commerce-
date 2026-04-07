import ProductCart from "@/components/ProductCart/ProductCart";
import { getAllProducts } from "./home.services";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import { lazy, Suspense } from "react";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import PromoCards from "@/components/PromoCards/PromoCards";
import NewsletterSection from "@/components/NewsletterSection/NewsletterSection";
const AllCategory = lazy(function () {
  return import("@/components/AllCategory/AllCategory");
});
export default async function page() {
  const productsList = await getAllProducts();

  return (
    <>
      <HomeSlider />
      <ServiceCard />
      <Suspense fallback={<h1 className="text-4xl flex ">Loading.....</h1>}>
        <AllCategory />
      </Suspense>
      <PromoCards />

      <div className="container mx-auto my-6 max-w-[90%] ">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-main-color rounded-full"></div>{" "}
          {/* الخط الأخضر الجانبي */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Featured <span className="text-main-color">Products</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5  gap-5 my-6">
          {productsList.map((e) => (
            <ProductCart key={e._id} prod={e} />
          ))}
        </div>
      </div>
      <NewsletterSection/>
    </>
  );
}
