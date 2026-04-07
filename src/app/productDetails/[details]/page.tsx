import { getSpeificProduct } from "@/app/home.services";
import AppButton from "@/components/shared/AppButton/AppButton";
import { Star } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ details: string }>;
}) {
  // انتظر الـ params أولاً قبل الاستخدام
  const { details } = await params;

  const productDetails = await getSpeificProduct(details);
  
  const {
    imageCover,
    images,
    title,
    category,
    brand,
    price,
    priceAfterDiscount,
    description,
    ratingsAverage,
    quantity,
  } = productDetails;

  return (
    <div>
      <div className="grid grid-cols-12 gap-8 p-14 ">
        {/* صور المنتج */}
        <div className="col-span-3 p-3 border border-gray-300 rounded-2xl">
          <div className="overflow-hidden rounded-xl">
            <img src={imageCover} alt={title} className="w-full" />
          </div>
          <div className="flex gap-2 pt-3">
            {images.map((img: string, index: number) => (
              <div key={index} className="border rounded-md overflow-hidden">
                <img src={img} alt={`${title}-${index}`} />
              </div>
            ))}
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="col-span-9 p-5 border border-gray-300 rounded-2xl">
          <div className="flex gap-6">
            <span className="text-[12px] text-main-color bg-green-100 p-1 px-3 rounded-2xl">
              {category.name}
            </span>
            <span className="text-[12px] p-1 px-3 rounded-2xl bg-gray-100">
              {brand.name}
            </span>
          </div>
          
          <h3 className="text-3xl font-bold pt-3">{title}</h3>
          
          <div className="flex items-center pt-2">
            {/* عرض النجوم بناءً على التقييم */}
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < Math.floor(ratingsAverage) ? "yellow" : "none"}
                color="yellow"
              />
            ))}
            <span className="ms-2 text-gray-500 font-medium">{ratingsAverage} (reviews)</span>
          </div>

          <div className="pt-2.5">
            <h2 className="flex flex-wrap gap-3 items-center">
              {priceAfterDiscount ? (
                <>
                  <span className="font-bold text-[23px]">
                    {priceAfterDiscount} EGP
                  </span>
                  <span className="line-through text-gray-500">
                    {price} EGP
                  </span>
                </>
              ) : (
                <span className="text-black font-semibold text-[20px]">
                  {price} EGP
                </span>
              )}
            </h2>
          </div>

          <div className="w-fit mt-3">
            {quantity > 0 ? (
              <span className="gap-3 flex items-center bg-green-100 px-3 py-1 rounded-2xl text-main-color">
                <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
                In Stock
              </span>
            ) : (
              <span className="gap-3 flex items-center bg-red-100 px-3 py-1 rounded-2xl text-red-500">
                <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span>
                Out of Stock
              </span>
            )}
          </div>

          <div className="border-b border-gray-200 my-6"></div>
          
          <p className="text-gray-700 leading-relaxed">{description}</p>

          <div className="p-3 rounded bg-gray-100 flex justify-between items-center mt-6 mb-4">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-2xl font-semibold text-main-color">
              {priceAfterDiscount || price} EGP
            </span>
          </div>

          <div className="flex gap-4 w-full pt-6">
            <AppButton className="bg-main-color flex-1 py-7 text-2xl text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              Add to cart
            </AppButton>
            <AppButton className="bg-gray-900 border text-2xl text-white flex-1 py-7 font-semibold rounded-xl hover:bg-black transition-colors">
              Buy Now
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}