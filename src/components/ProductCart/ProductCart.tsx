import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AllProductsData } from "@/app/home.interface";
import { Eye, Heart, Plus, RefreshCw, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import AppButton from "../shared/AppButton/AppButton";
import Link from "next/link";
import AddToCart from "../AddToCart/AddToCart";

export default function ProductCart({ prod }: { prod: AllProductsData }) {
  const {
    category,
    imageCover,
    id,
    price,
    quantity,
    ratingsAverage,
    title,
    priceAfterDiscount,
  } = prod;

  return (
    <Card className="relative hover:-translate-y-1 hover:shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] transition-all mx-auto w-full max-w-sm pt-0 ">
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 ">
        <Link
          href={`/`}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100"
        >
          <Heart className="w-5 h-5  hover:text-red-500" />
        </Link>
        <Link
          href={`/`}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100"
        >
          <RefreshCw className="w-5 h-5 hover:text-main-color" />
        </Link>
        <Link
          href={`productDetails/${id}`}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100"
        >
          <Eye className="w-5 h-5 hover:text-main-color" />
        </Link>
      </div>
      {/* Discount Badge */}
      {priceAfterDiscount && (
        <div className="absolute top-3 left-3 z-20 bg-[#ff3544] text-white text-sm font-bold px-3 py-1 rounded-md shadow-md ">
          -{Math.round(((price - priceAfterDiscount) / price) * 100)}%
        </div>
      )}
      {/* الصورة */}
      <div className="relative h-52">
        <Image
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 150px"
          src={imageCover}
          alt={title}
          className="w-full h-48 object-contain"
        />
      </div>

      <CardHeader className="space-y-1 ">
        {/* اسم الـ Category فوق العنوان */}
        <div className="mb-1">
          <Badge
            variant="secondary"
            className="font-medium p-0 text-xs bg-transparent"
          >
            {category.name}
          </Badge>
        </div>

        {/* العنوان */}
        <Link href={`productDetails/${id}`}>
          <CardTitle className=" font-semibold text-gray-700">
            {title.split(" ", 6).join(" ")}
          </CardTitle>
        </Link>

        <CardDescription>
          <div className="flex items-center">
            {Array.from({ length: Math.floor(ratingsAverage) }).map((e, i) => (
              <Star key={i} color="yellow" fill="yellow"></Star>
            ))}
            {Array.from({ length: 5 - Math.floor(ratingsAverage) }).map(
              (e, i) => (
                <Star key={i} color="yellow"></Star>
              ),
            )}
            <span className="ms-2">({ratingsAverage})</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="flex flex-wrap gap-3 items-center">
                {priceAfterDiscount ? (
                  <>
                    <span className="text-main-color font-semibold text-[20px]">
                      {priceAfterDiscount} EGP
                    </span>
                    <span className="line-through font-semibold">
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
            <div>
              <AddToCart id={id} />
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}
